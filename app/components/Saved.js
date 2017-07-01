//Require react
var React = require('react');
var Router = require('react-router');

//Bring in your Helpers
var helpers = require('../utils/helpers');

var Saved = React.createClass({
  getInitialState: function(){
    return {
    }
  },
  componentDidMount: function(){
    if (!this.props.articles){
      helpers.getSaved()
        .then(function(articleData){
          this.setState({
            savedArticles: articleData.data
          });
        }.bind(this))
    }
  },
  handleClick: function(item, event){
    // console.log(item);
    this.props.onClick(item);
  },
  render: function(){
    if (this.props.articles.length < 1) {
      return(
        <div className="col-md-6">
        <div className="panel panel-default">
          <li className="list-group-item">
            <h3>
              <span><em>You dont have any Saved articles yet!</em></span>
            </h3>
          </li>
        </div>
        </div>
      )
    } else if (this.props.articles ) {
      var articles = this.props.articles.map(function(article, index){
        return(
            <div key={index}>
              <li className="list-group-item" >
                <h3>
                  <span><em>{article.title}</em></span>
                  <span className="btn-group pull-right" >
                  <button className="btn btn-primary "><a href={article.url} style={{color: 'white'}} target="_blank">View Article</a></button>
                  <button className="btn btn-danger" onClick={this.handleClick.bind(this, article)}>Delete</button>
                </span>
                </h3>
                <p>Date Published: {article.date.substring(0,10)}</p>
              </li>
            </div>
        )
      }.bind(this))
    }
    return(
      <div className="col-md-6">
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h1 className="panel-title"><strong><i className="fa fa-download" aria-hidden="true"></i> Saved Articles</strong></h1>
          </div>
          <div className="panel-body">
            <ul className="list-group">
              {articles}
            </ul>
          </div>
        </div>
      </div>

    )
  }
});

module.exports = Saved;
