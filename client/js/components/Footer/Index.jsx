var React = require('react');
var Style = require('./Style.jsx');

var Footer = React.createClass({
	render: function(){
	  var today = new Date(Date.now());
	  return (
    	<div className="container">
				<div className="row">
					<div className="col-lg-8 col-xs-12 col-centered">
        	</div>
        </div>
	    </div>
	  );
	}
});

module.exports = Footer;
