//Require React
var React = require('react');
var Router = require('react-router');

//Bring in Contents in Search Folder 
var Query = require('./Search/Query');
var Results = require('./Search/Results');

var Saved = require('./Saved');
//Bring in your Helpers
var helpers = require('../utils/helpers');

var Search = React.createClass({
  getInitialState: function() {
    return {
      queryTerm: "",
      startYear: "",
      endYear: "",
      results: {},
      saved: []
    }
  },
  componentDidMount: function() {
    helpers.getSaved()
      .then(function(articleData) {
        console.log(articleData.data);
        if (articleData.data) {
          this.setState({
            saved: articleData.data
          });
        }
        console.log(this.state.saved);
      }.bind(this))
  },
  handleDelete: function(item) {
    helpers.deleteSaved(item.title, item.date, item.url)
      .then(function(data) {
        helpers.getSaved()
          .then(function(articleData) {
            this.setState({
              saved: articleData.data
            });
          }.bind(this))
      }.bind(this))
  },
  handleSave: function(item) {
    helpers.postSaved(item.headline.main, item.pub_date, item.web_url)
      .then(function(data) {
        helpers.getSaved()
          .then(function(articleData) {
            this.setState({
              saved: articleData.data
          });
        }.bind(this))
      }.bind(this))
  },
  componentDidUpdate: function(prevProps, prevState) {
    // Checks if the query is not empty
    if (this.state.queryTerm != "") {

      helpers.runQuery(this.state.queryTerm, this.state.startYear, this.state.endYear)
        .then(function(data) {
          if (data != this.state.results) {
            this.setState({
              results: data,
              queryTerm: "",
              startYear: "",
              endYear: ""
          });
        }
      }.bind(this));
    }
  },
  setQuery: function(newQuery, newStart, newEnd) {
    this.setState({
      queryTerm: newQuery,
      startYear: newStart,
      endYear: newEnd
    });
  },
  render: function() {
    return (
      <div className="main-container">
        <div className="row">
          <Query updateSearch={this.setQuery} />
          <Results results={this.state.results} onClick={this.handleSave}/>
          <Saved articles={this.state.saved} onClick={this.handleDelete}/>
        </div>
      </div>
    );
  }
});

module.exports = Search;
