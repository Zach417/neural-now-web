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
							<Link to="/signin" style={Style.item}>Sign in</Link>
							<Link to="/about" style={Style.item}>About</Link>
							<Link to="/neuralnetwork" style={Style.item}>Neural Nets</Link>
							<Link to="/docs" style={Style.item}>Docs</Link>
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
