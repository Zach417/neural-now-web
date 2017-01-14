var React = require('react');
var Link = require('react-router').Link;
var Style = require('./Style.jsx');

var Component = React.createClass({
	render: function(){
		return (
    	<div className="container-fluid" style={Style.container}>
				<div className="row">
					<div className="col-lg-10 col-xs-12 col-centered">
            <h1>Docs</h1>
					</div>
					<div className="col-lg-10 col-xs-12 col-centered">
						<p>
							This is the documentation area of the service.
						</p>
					</div>
				</div>
			</div>
		);
	},
});

module.exports = Component;
