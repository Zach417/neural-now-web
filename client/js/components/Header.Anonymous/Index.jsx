var React = require('react');
var $ = require('jquery');
var Link = require('react-router').Link;
var Style = require('./Style.jsx');

var Header = React.createClass({
	render: function(){
		return (
			<div style={Style.navigation}>
				<div className="col-lg-8 col-xs-12">
					<Link to="/" style={Style.title}>Neural Now</Link>
				</div>
			</div>
		);
	},
});

module.exports = Header;
