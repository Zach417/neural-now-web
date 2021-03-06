var React = require('react');
var Link = require('react-router').Link;
var Style = require('./Style.jsx');

var Header = React.createClass({
	render: function(){
		return (
    	<div className="container-fluid" style={Style.container}>
				<div className="row">
					<div className="col-lg-10 col-xs-12 col-centered">
						<Link to="/" style={Style.title}>Neural Now</Link>
						<div className="hidden-xs">
							<Link to="/sign-up" style={Style.item}>Sign up</Link>
							<Link to="/sign-in" style={Style.item}>Sign in</Link>
							<Link to="/games" style={Style.item}>Games</Link>
							<Link to="/neuralnetwork" style={Style.item}>Models</Link>
						</div>
						<div className="hidden-lg hidden-md hidden-sm">
							<Link to="/nav" style={Style.item}>☰</Link>
						</div>
					</div>
				</div>
			</div>
		);
	},
});

module.exports = Header;
