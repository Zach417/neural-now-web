var React = require('react');
var Link = require('react-router').Link;
var Style = require('./Style.jsx');

var Footer = React.createClass({
	render: function(){
	  var today = new Date(Date.now());
	  return (
    	<div className="container-fluid" style={Style.container}>
				<div className="row">
					<div className="col-xs-12" style={{paddingTop:"15px"}} />
					<div className="col-lg-10 col-xs-12 col-centered" style={Style.border}>
						{"© Copyright " + new Date().getFullYear()}
						{" Neural Now | za93@live.missouristate.edu | "}
						{"417.849.3612 | Springfield, MO"}
        	</div>
					<div className="col-lg-10 col-xs-12 col-centered">
						{"Neural Now founded, built, and maintained by Zach Allen"}
					</div>
					<div className="col-lg-10 col-xs-12 col-centered">
						{"Click "}
						<Link to="/about">{"here "}</Link>
						{"to learn more about Neural Now."}
					</div>
					<div className="col-xs-12" style={{paddingBottom:"15px"}} />
        </div>
	    </div>
	  );
	}
});

module.exports = Footer;
