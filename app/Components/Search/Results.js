//Require React
var React = require('react');
var Router = require('react-router');
//Require Helper functions
var helpers = require('../../utils/helpers');
//Create a Class
var Results = React.createClass({

  getInitialState: function(){
    return {
      title: "",
      url: "",
      pubdate: "",
    }
  },

  handleClick: function(item, event){
    this.props.onClick(item);
  },

  render: function(){

    if (!this.props.results.hasOwnProperty('docs')){
      return(
        <div className="col-md-6">
        <div className="panel panel-default">
          <li className="list-group-item">
            <h3>
              <span>Once you Search this is where your articles will be displayed!</span>
            </h3>
          </li>
        </div>
        </div>
      )
    } else {

      var articles = this.props.results.docs.map(function(article, index){
        return(
            <div key={index}>
              <li className="list-group-item" >
              <h3>
                  <span>{article.headline.main}</span>
                <span className="btn-group pull-right" >
                  <button className="btn btn-primary "><a href={article.web_url} style={{color: 'white'}} target="_blank">View Article</a></button>
                  <button className="btn btn-success" onClick={this.handleClick.bind(this, article)}>Save</button>
                </span>
              </h3>
              <p>Date Published: {article.pub_date.substring(0,10)}</p>
              </li>
            </div>
        )
      }.bind(this))
    }

    return(
      <div className="col-md-6">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h1 className="panel-title"><strong><i className=""></i>  Results</strong></h1>
          </div>
          <div className="panel-body">
            <ul className="list-group">
              {articles}
            </ul>
          </div>
          <br/>
        </div>
        </div>
    )
  }
});

module.exports = Results;