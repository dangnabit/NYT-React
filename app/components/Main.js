//Require React
var React = require('react');
var Router = require('react-router')

var Main = React.createClass({
  render: function(){

    return(
      <div className="main-container">
        <div className="container">
          <nav className="navbar navbar-default" role="navigation">
            <div className="container-fluid">
              <div className="navbar-header">
                <a className="navbar-brand" href="#">New York Times Article Finder</a>
              </div>
            </div>
          </nav>
          <div className="jumbotron">
            <h2 className="text-center"><strong>New York Times Article Finder</strong></h2>
          </div>
          {this.props.children}
        </div>
        <div className="push" style={{height: '40px'}}></div>
        <div className="footer navbar navbar-default navbar-fixed-bottom align-middle text-default text-center text-muted">
          <p>&copy; Copyright 2017 Dan Gabel</p>
        </div>
      </div>
    )
  }
});

module.exports = Main;
