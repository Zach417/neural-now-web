var React = require('react');
var Link = require('react-router').Link;
var Style = require('./Style.jsx');
var NeuralNow = require('neural-now');
var Menu = require('./Menu.jsx');
var Console = require('./Console.jsx');
var Error = require('./Error.jsx');
var Vector = require('./Vector.jsx');
var Text = require('./Text.jsx');
var Button = require('../Button/Index.jsx');
var NeuralNetworkStore = require('../../stores/NeuralNetworkStore');

var Component = React.createClass({
  getInitialState: function () {
    return {
      area: 'vector',
      neuralNetwork: {
        name: "neural-network",
        layers: [],
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

      if (neuralNetwork.inputType) {
        state.area = neuralNetwork.inputType;
      } else {
        state.area = "vector";
      }

      state.input = this.getNeuralNetworkInputString();
      this.setState(state);
    }.bind(this));
  },

  componentWillReceiveProps: function (nextProps) {
    NeuralNetworkStore.getOne(nextProps.name, function (neuralNetwork) {
      var state = this.state;
      state.neuralNetwork = neuralNetwork;

      if (neuralNetwork.inputType) {
        state.area = neuralNetwork.inputType;
      } else {
        state.area = "vector";
      }

      state.input = this.getNeuralNetworkInputString();
      this.setState(state);
    }.bind(this));
  },

  render: function () {
    return (
      <div>
        <Console result={this.state.result} />
        <Error message={this.state.error} />
        <div>
          <Menu
            selected={this.state.area}
            inputType={this.state.neuralNetwork.inputType}
            onChange={this.handleChange_Menu} />
          <div style={{padding:"10px",border:"1px solid #222",borderTop:"hidden",backgroundColor:"#eee",marginBottom:"10px"}}>
            {this.getSubComponent()}
            <div style={{paddingTop:"5px"}} />
            <Button.Primary
              label="Run"
              onClick={this.handleClick} />
          </div>
        </div>
      </div>
    );
  },

  getSubComponent: function () {
    switch (this.state.area) {
      case "vector":
        return (<Vector input={this.state.input} onChange={this.handleChange_SubComponent} />);
      case "text":
        return (<Text input={this.state.input} onChange={this.handleChange_SubComponent} />);
      default:
        return (<Vector input={this.state.input} onChange={this.handleChange_SubComponent} />);
    }
  },

  getNeuralNetworkInputString: function () {
    var input = "[[";
    if (this.state.neuralNetwork.layers.length === 0) {
      return input + "]]";
    }
    for (var i = 0; i < this.state.neuralNetwork.layers[0].out_depth; i++) {
      if (i === this.state.neuralNetwork.layers[0].out_depth - 1) {
        input += "0"
      } else {
        input += "0,"
      }
    }
    input += "]]"
    return input;
  },

  handleClick: function () {
    try {
      var input = JSON.parse(this.state.input);
      var name = this.state.neuralNetwork.name;
      NeuralNow.get(name, function (neuralNet) {
        var state = this.state;
        state.result = neuralNet.forward(input).w;
        state.error = '';
        this.setState(state)
      }.bind(this));
    } catch (e) {
      var state = this.state;
      state.error = e.toString();
      this.setState(state);
    }
  },

  handleChange_Menu: function (item) {
    var state = this.state;
    state.area = item;
    this.setState(state);
  },

  handleChange_SubComponent: function (input) {
    var state = this.state;
    state.input = input;
    this.setState(state);
  },
});

module.exports = Component;
