var React = require('react');
var Link = require('react-router').Link;
var Style = require('./Style.jsx');
var NeuralNetworkStore = require('../../stores/NeuralNetworkStore');

var Component = React.createClass({
  getInitialState: function () {
    return {
      neuralNetwork: {
        name: "neural-network",
        layers: [],
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

  componentWillReceiveProps: function (nextProps) {
    NeuralNetworkStore.getOne(nextProps.name, function (neuralNetwork) {
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
    var code = "";
    if (this.state.neuralNetwork.codeExample) {
      code = this.state.neuralNetwork.codeExample;
    } else {
      var name = this.getNeuralNetworkName();
      var input = this.getNeuralNetworkInputString();
      code =
        "var NeuralNow = require('neural-now');\n"
        + "NeuralNow.get('" + name + "', function(neuralNet) {\n"
        + "    " + input + "\n"
        + "    var output = neuralNet.forward(input);\n"
        + "});";
    }

    return {
      __html: Prism.highlight(code, Prism.languages.javascript)
    };
  },

  getNeuralNetworkInputString: function () {
    var input = "var input = [[";
    var net = this.state.neuralNetwork;
    if (net.layers.length === 0) {
      return input + "]]; // set input values here";
    }


    for (var i = 0; i < net.layers[0].out_depth; i++) {
      if (i === net.layers[0].out_depth - 1) {
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
