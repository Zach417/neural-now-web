var React = require('react');

var Style = require('./Style.jsx');

var Footer = React.createClass({
	render: function(){
        var today = new Date(Date.now());
        return (
            <div style={Style.footer}>
                <div style={Style.border} className="col-lg-8 col-xs-12">
                </div>
            </div>
        );
    }
});

module.exports = Footer;
