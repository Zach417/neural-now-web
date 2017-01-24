var React = require('react');
var Link = require('react-router').Link;
var Style = require('./Style.jsx');

var Component = React.createClass({

  render: function () {
    if (this.props.message) {
      return (
        <div style={{color:"red"}}>
          {this.props.message}
        </div>
      );
    }

    return (
      <div>
      </div>
    );
  },
});

module.exports = Component;
