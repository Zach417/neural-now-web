var React = require('react');
var Link = require('react-router').Link;
var Style = require('./Style.jsx');
var Form = require('../Form/Index.jsx');
var Button = require('../Button/Index.jsx');

var Component = React.createClass({
	render: function(){
		return (
    	<div className="container-fluid" style={Style.container}>
				<div className="row">
					<div className="col-md-6 col-xs-12 col-centered">
            <h1>Sign in</h1>
            <Form.Label label={"Username"} required={true} />
            <Form.Input />
            <Form.Label label={"Password"} required={true} />
            <Form.Input />
					</div>
				</div>
				<div className="row" style={{marginBottom:"15px"}} />
				<div className="row">
					<div className="col-md-6 col-xs-12 col-centered">
						<Button.Primary label={"Sign in"} />
					</div>
				</div>
			</div>
		);
	},
});

module.exports = Component;
