var React = require('react');
var Link = require('react-router').Link;
var NeuralNowUtils = require('neural-now-utils');
var Style = require('./Style.jsx');
var Form = require('../Form/Index.jsx');

var Component = React.createClass({
  getInitialState: function () {
    return {
      text: '',
    }
  },

  render: function () {
    return (
      <div>
        <div style={{paddingBottom: "10px", width: "250px"}}>
          <Form.Select
            allowNulls={false}
            options={["Unigrams", "Bigrams"]}
            value={"Bigrams"}
            onChange={this.handleChange_Select} />
        </div>
        <Form.TextArea
          value={this.state.text}
          onChange={this.handleChange_TextArea} />
      </div>
    );
  },

  handleChange_Select: function (value) {

  },

  handleChange_TextArea: function (value) {
    var state = this.state;
    state.text = value;
    this.setState(state);

    var vector = NeuralNowUtils.Text.toBigramVector(value);
    this.props.onChange(JSON.stringify([vector]));
  },
});

module.exports = Component;
