//Require React
var React = require('react');

//Require your router for routes
var router = require("react-router");
var Route = router.Route;

var Router = router.Router;

var IndexRoute = router.IndexRoute;

var hashHistory = router.hashHistory;

//Bring in all your components 
var Main = require('../components/Main');
var Search = require('../components/Search');

module.exports = (
  <Router history={hashHistory}>
  	<Route path='/' component={Main}>
      <IndexRoute component={Search} />
  	</Route>
  </Router>
);
