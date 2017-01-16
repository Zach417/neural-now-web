var React = require('react');
var Style = require('./Style.jsx');

var Footer = React.createClass({
	render: function(){
	  var today = new Date(Date.now());
	  return (
    	<div className="container-fluid" style={Style.container}>
				<div className="row">
					<div className="col-lg-10 col-xs-12 col-centered" style={Style.border}>
						{"© Copyright " + new Date().getFullYear()}
						{" Neural Now | zach@neuralnow.com | "}
						{"417.849.3612 | Springfield, MO"}
						<br /><br />
						{"Neural Now founded, built, and maintained by Zach Allen"}
        	</div>
        </div>
	    </div>
	  );
	}
});

module.exports = Footer;
