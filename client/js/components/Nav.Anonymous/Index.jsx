var React = require('react');
var Link = require('react-router').Link;
var Style = require('./Style.jsx');

var Component = React.createClass({
  componentDidMount: function () {
    Prism.highlightAll();
  },

  render: function(){
    return (
    	<div className="container-fluid" style={Style.container}>
	    	<div className="row">
					<div className="col-xs-12">
            <Link to="/docs" style={Style.item}>Docs</Link>
          </div>
					<div className="col-xs-12">
            <Link to="/neuralnetwork" style={Style.item}>Neural Nets</Link>
          </div>
					<div className="col-xs-12">
            <Link to="/about" style={Style.item}>About</Link>
          </div>
					<div className="col-xs-12">
            <Link to="/signin" style={Style.item}>Sign in</Link>
          </div>
	      </div>
			</div>
    );
  },
});

module.exports = Component;
