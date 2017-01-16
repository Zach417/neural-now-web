var React = require('react');
var Link = require('react-router').Link;
var Style = require('./Style.jsx');
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
    }
  },

  componentWillMount: function () {
    NeuralNetworkStore.getOne(this.props.name, function (neuralNetwork) {
      var state = this.state;
      state.neuralNetwork = neuralNetwork;
      this.setState(state);
    }.bind(this));
  },

  componentDidMount: function () {
    Prism.highlightAll();
  },

  render: function () {
    return (
      <pre>
				<code
          className="language-javascript"
          dangerouslySetInnerHTML={this.getMarkup()}>
				</code>
      </pre>
    );
  },

  getMarkup: function () {
    var name = this.getNeuralNetworkName();
    var input = this.getNeuralNetworkInputString();
    var code =
      "var NeuralNow = require('neural-now');\n"
      + "NeuralNow.get('" + name + "', function(neuralNet) {\n"
      + "    " + input + "\n"
      + "    var output = neuralNet.forward(input);\n"
      + "});";

    return {
      __html: Prism.highlight(code,Prism.languages.javascript)
    };
  },

  getNeuralNetworkInputString: function () {
    var input = "var input = [[";
    for (var i = 0; i < this.state.neuralNetwork.input.size; i++) {
      if (i === this.state.neuralNetwork.input.size - 1) {
        input += "0"
      } else {
        input += "0,"
      }
    }
    input += "]]; // set input values here"
    return input;
  },

  getNeuralNetworkName: function () {
    return this.state.neuralNetwork.name;
  },
});

module.exports = Component;
