var React = require('react');
var Link = require('react-router').Link;
var $ = require('jquery');
var Style = require('./Style.jsx');

var HomePage = React.createClass({
	getInitialState: function () {
		return {

		}
	},

  render: function(){
    return (
    	<div>
				<h1>Neural Now</h1>
      </div>
    );
  },
});

module.exports = HomePage;
