var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var browserHistory = require('react-router').browserHistory;
var IndexRoute = require('react-router').IndexRoute;

var Footer = require('./components/Footer/Index.jsx');
var Header = require('./components/Header/Index.jsx');
var Home = require('./components/Home/Index.jsx');
var About = require('./components/About.Anonymous/Index.jsx');
var Nav = require('./components/Nav/Index.jsx');
var SignOut = require('./components/SignOut/Index.jsx');
var Docs = require('./components/Docs/Index.jsx');
var NeuralNet = require('./components/NeuralNet/Index.jsx');
var NeuralNetNew = require('./components/NeuralNet/New.jsx');
var NeuralNetEdit = require('./components/NeuralNet/Edit.jsx');
var NeuralNets = require('./components/NeuralNets/Index.jsx');

function scrollToTop () {
    window.scrollTo(0, 0);
}

var App = React.createClass({
	render: function () {
		return (
			<div style={{height:"100%"}}>
        <Header />
				{this.props.children}
				<Footer />
			</div>
		)
	}
});

var Routes = (
	 <Route path="/" component={App}>
    	<IndexRoute component={Home} />
      <Route path="sign-out" component={SignOut} />
      <Route path="docs" component={Docs} />
      <Route path="about" component={About} />
      <Route path="nav" component={Nav} />
  		<Route path="neuralnetwork">
        <IndexRoute component={NeuralNets} />
  			<Route path="new" component={NeuralNetEdit} />
  			<Route path=":id">
          <IndexRoute component={NeuralNet} />
    			<Route path="edit" component={NeuralNetEdit} />
  		  </Route>
  		</Route>
    </Route>
);

ReactDOM.render(
 	<Router
    onUpdate={scrollToTop}
    history={browserHistory}
    routes={Routes} />,
	document.getElementById("container")
);
