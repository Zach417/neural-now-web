var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var browserHistory = require('react-router').browserHistory;
var IndexRoute = require('react-router').IndexRoute;

var App = React.createClass({
  render: function() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
});

var Routes = (
  <Route path="/" component={App}>
  </Route>
);

ReactDOM.render(
  <Router
    history={browserHistory}
    onUpdate={handleUpdateRouter}
    routes={Routes}/>,
  document.getElementById("container")
);
