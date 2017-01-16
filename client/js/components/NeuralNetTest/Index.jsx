var React = require('react');
var Link = require('react-router').Link;
var Style = require('./Style.jsx');
var NeuralNow = require('neural-now');
var Form = require('../Form/Index.jsx');
var Button = require('../Button/Index.jsx');
var NeuralNetworkStore = require('../../stores/NeuralNetworkStore');

var Component = React.createClass({
  getInitialState: function () {
    return {
      neuralNetwork: {
        name: "neural-network",
        input: {size: 0},
        hidden: [],
        output: {size: 0},
        weights: [],
      },
      input: '',
      result: '',
      error: '',
    }
  },

  componentWillMount: function () {
    NeuralNetworkStore.getOne(this.props.name, function (neuralNetwork) {
      var state = this.state;
      state.neuralNetwork = neuralNetwork;
      state.input = this.getNeuralNetworkInputString();
      this.setState(state);
    }.bind(this));
  },

  render: function () {
    return (
      <div>
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
          label="Run"
          onClick={this.handleClick} />
      </div>
    );
  },

  getNeuralNetworkInputString: function () {
    var input = "[[";
    for (var i = 0; i < this.state.neuralNetwork.input.size; i++) {
      if (i === this.state.neuralNetwork.input.size - 1) {
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
    var name = this.state.neuralNetwork.name;
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
