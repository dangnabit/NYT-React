var React = require("react");

var router = require("react-router");

var Route = router.Route;

var Router = router.Router;

var hashHistory = router.hashHistory;

var IndexRoute = router.IndexRoute;

var Main = require("../components/Main.js");
var Child1 = require("../components/Child1.js");

module.exports = (

  <Router history={hashHistory}>
    <Route path="/" component={Main}>

      <Route path="" component={}>
      </Route>
    </Route>
  </Router>

);
