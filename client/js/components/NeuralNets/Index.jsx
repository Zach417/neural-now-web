var React = require('react');
var Link = require('react-router').Link;
var Style = require('./Style.jsx');

var Component = React.createClass({
	render: function(){
		return (
    	<div className="container-fluid" style={Style.container}>
				<div className="row">
					<div className="col-lg-10 col-xs-12 col-centered">
            <h1>Neural Networks</h1>
					</div>
					<div className="col-lg-10 col-xs-12 col-centered">
						<p>
							This is a playground area for neural networks that can be
							deployed on the Neural Now service.
						</p>
					</div>
				</div>
			</div>
		);
	},
});

module.exports = Component;
