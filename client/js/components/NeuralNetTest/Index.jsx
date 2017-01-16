var React = require('react');
var Link = require('react-router').Link;
var Style = require('./Style.jsx');
var NeuralNow = require('neural-now');
var Form = require('../Form/Index.jsx');
var Button = require('../Button/Index.jsx');

var Component = React.createClass({
  getInitialState: function () {
    return {
      input: '',
      result: '',
      error: '',
    }
  },

  componentWillMount: function () {
    var state = this.state;
    state.input = this.getNeuralNetworkInputString();
    this.setState(state);
  },

  render: function () {
    return (
      <div>
        <p>
          {"Want to test it out? Insert a 2D array below and click \"Test\""}
        </p>
        <pre>
  				<code
            className="language-bash"
            dangerouslySetInnerHTML={this.getMarkup()}>
  				</code>
        </pre>
        {this.getError()}
        <Form.TextArea
          value={this.state.input}
          onChange={this.handleChange_TextArea} />
        <Button.Primary
          label="Test"
          onClick={this.handleClick} />
      </div>
    );
  },

  getNeuralNetworkInputString: function () {
    var input = "[[";
    for (var i = 0; i < this.props.neuralNetwork.input.size; i++) {
      if (i === this.props.neuralNetwork.input.size - 1) {
        input += "0"
      } else {
        input += "0,"
      }
    }
    input += "]]"
    return input;
  },

  handleClick: function () {
    var input = JSON.parse(this.state.input);
    var name = this.props.neuralNetwork.name;
    NeuralNow.get(name, function (neuralNet) {
      var state = this.state;
      state.result = neuralNet.forward(input).tolist();
      this.setState(state)
    }.bind(this));
  },

  handleChange_TextArea: function (value) {
    var state = this.state;
    state.input = value;
    this.setState(state);
  },

  getError: function () {
    if (this.state.error) {

    }
  },

  getMarkup: function () {
    var code = ">>> " + this.state.result;
    return {
      __html: Prism.highlight(code,Prism.languages.bash)
    };
  },
});

module.exports = Component;
