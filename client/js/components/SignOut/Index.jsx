var React = require('react');
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var ApiService = require('../../services/ApiService');

var Component = React.createClass({
  componentDidMount: function () {
    ApiService.signOut(function (data) {
      if (data.success == true) {
        return window.location.assign('/');
      }
    });
  },


	render: function(){
		return (
    	<div className="container-fluid" style={Style.container}>
				<div className="row">
					<div className="col-md-6 col-xs-12 col-centered">
            <h1>Signing out...</h1>
					</div>
				</div>
			</div>
		);
	},
});

module.exports = Component;
