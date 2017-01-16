var React = require('react');
var Link = require('react-router').Link;
var Style = require('./Style.jsx');

var Component = React.createClass({
  componentDidMount: function () {
    Prism.highlightAll();
  },
  
  render: function () {
    return (
      <div>
        <p>
          {"This is how you can use this neural network"}
        </p>
        <pre>
  				<code
            className="language-javascript"
            dangerouslySetInnerHTML={this.getMarkup()}>
  				</code>
        </pre>
      </div>
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
    for (var i = 0; i < this.props.neuralNetwork.input.size; i++) {
      if (i === this.props.neuralNetwork.input.size - 1) {
        input += "0"
      } else {
        input += "0,"
      }
    }
    input += "]]; // set input values here"
    return input;
  },

  getNeuralNetworkName: function () {
    return this.props.neuralNetwork.name;
  },
});

module.exports = Component;
