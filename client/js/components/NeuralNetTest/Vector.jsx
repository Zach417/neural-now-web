var React = require('react');
var Link = require('react-router').Link;
var Style = require('./Style.jsx');
var Form = require('../Form/Index.jsx');

var Component = React.createClass({
  render: function () {
    return (
      <Form.TextArea
        value={this.props.input}
        onChange={this.handleChange_TextArea} />
    );
  },

  handleChange_TextArea: function (value) {
    this.props.onChange(value);
  },
});

module.exports = Component;
