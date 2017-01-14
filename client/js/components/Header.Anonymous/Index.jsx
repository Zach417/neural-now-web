var React = require('react');
var Link = require('react-router').Link;
var Style = require('./Style.jsx');

var Header = React.createClass({
	render: function(){
		return (
    	<div className="container-fluid" style={Style.container}>
				<div className="row">
					<div className="col-xs-12 col-centered">
						<Link to="/" style={Style.title}>Neural Now</Link>
						<Link to="/signin" style={Style.item}>Sign in</Link>
						<Link to="/neuralnetwork" style={Style.item}>Neural Nets</Link>
						<Link to="/docs" style={Style.item}>Docs</Link>
					</div>
				</div>
			</div>
		);
	},
});

module.exports = Header;
