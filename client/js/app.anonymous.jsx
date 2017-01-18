var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var browserHistory = require('react-router').browserHistory;
var IndexRoute = require('react-router').IndexRoute;

var Footer = require('./components/Footer/Index.jsx');
var Header = require('./components/Header.Anonymous/Index.jsx');
var Home = require('./components/Home.Anonymous/Index.jsx');
var About = require('./components/About.Anonymous/Index.jsx');
var Nav = require('./components/Nav.Anonymous/Index.jsx');
var SignIn = require('./components/SignIn/Index.jsx');
var SignUp = require('./components/SignUp/Index.jsx');
var SignUpVerify = require ('./components/SignUp/Verify.jsx');
var Docs = require('./components/Docs/Index.jsx');
var NeuralNet = require('./components/NeuralNet/Index.jsx');
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
      <Route path="sign-in" component={SignIn} />
      <Route path="sign-up">
          <IndexRoute component={SignUp} />
          <Route path=":id" component={SignUpVerify} />
      </Route>
      <Route path="docs" component={Docs} />
      <Route path="about" component={About} />
      <Route path="nav" component={Nav} />
  		<Route path="neuralnetwork">
        <IndexRoute component={NeuralNets} />
  			<Route path=":id" component={NeuralNet} />
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
