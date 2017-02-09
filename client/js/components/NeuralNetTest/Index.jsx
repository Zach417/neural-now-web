var React = require('react');
var Link = require('react-router').Link;
var Style = require('./Style.jsx');
var NeuralNow = require('neural-now');
var cnn = require('neural-now-cnn');
var Menu = require('./Menu.jsx');
var Console = require('./Console.jsx');
var Error = require('./Error.jsx');
var Vector = require('./Vector.jsx');
var Text = require('./Text.jsx');
var Image = require('./Image.jsx');
var Button = require('../Button/Index.jsx');
var NeuralNetworkStore = require('../../stores/NeuralNetworkStore');

var Component = React.createClass({
  getInitialState: function () {
    return {
      loading: true,
      executing: false,
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
    var state = this.state;
    if (this.props.neuralNetwork) {
      state.neuralNetwork = this.props.neuralNetwork;

      if (state.neuralNetwork.inputType) {
        state.area = state.neuralNetwork.inputType;
      } else {
        state.area = "vector";
      }

      state.loading = false;
      state.input = this.getNeuralNetworkInputString(state);
      this.setState(state);
    } else {
      var state = this.state;
      state.loading = true;
      this.setState(state);
      NeuralNetworkStore.getOne(this.props.name, true, function (neuralNetwork) {
        state = this.state;
        state.loading = false;
        state.neuralNetwork = neuralNetwork;

        if (neuralNetwork.inputType) {
          state.area = neuralNetwork.inputType;
        } else {
          state.area = "vector";
        }

        state.input = this.getNeuralNetworkInputString(state);
        this.setState(state);
      }.bind(this));
    }
  },

  componentWillReceiveProps: function (nextProps) {
    this.props = nextProps;
    this.componentWillMount();
  },

  componentDidMount: function () {
    Prism.highlightAll();
  },

  componentDidUpdate: function (prevProps, prevState) {
    Prism.highlightAll();
  },

  render: function () {
    if (this.state.loading === true) {
      return (
        <div>
          <Console result={"Loading neural net weights..."} />
        </div>
      )
    }

    var consoleOutput = this.state.result;
    if (this.state.executing) {
      consoleOutput = "executing...";
    }

    return (
      <div>
        <Console result={consoleOutput} />
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
      case "image":
        return (<Image input={this.state.input} neuralNetwork={this.state.neuralNetwork} onChange={this.handleChange_SubComponent} />);
      default:
        return (<Vector input={this.state.input} onChange={this.handleChange_SubComponent} />);
    }
  },

  getNeuralNetworkInputString: function (state) {
    var net = state.neuralNetwork || this.state.neuralNetwork;
    var input = "[[";
    if (!net.layers || net.layers.length === 0) {
      return input + "]]";
    }
    for (var i = 0; i < net.layers[0].out_depth; i++) {
      if (i === net.layers[0].out_depth - 1) {
        input += "0"
      } else {
        input += "0,"
      }
    }
    input += "]]"
    return input;
  },

  yHatToOutputString: function (output) {
    var net = this.state.neuralNetwork;
    var result = [];
    if (output.length > 0 && net.outputClasses.length > 0) {
      for (var i = 0; i < output.length; i++) {
        result.push({
          class: net.outputClasses[i],
          prediction: Number(Number(output[i]).toFixed(2)),
        });
      }
      // descending
      result.sort(function (a, b) {
        return b.prediction - a.prediction;
      });
      return JSON.stringify(result);
    } else {
      return JSON.stringify(output);
    }
  },

  handleClick: function () {
    try {
      var input;
      if (typeof this.state.input === 'string') {
        input = JSON.parse(this.state.input);
      } else {
        input = this.state.input;
      }
      var name = this.state.neuralNetwork.name;
      var state = this.state;
      state.executing = true;
      this.setState(state);

      var netType = this.state.neuralNetwork.type;
      if (!netType || netType == "convnetjs") {
        var neuralNet = new cnn.net();
        neuralNet.fromJSON(this.state.neuralNetwork);
        var vol = new cnn.vol(neuralNet.layers[0].out_sx, neuralNet.layers[0].out_sy, neuralNet.layers[0].out_depth, 0);
        vol.w = input;
        var yHat = neuralNet.forward(vol).w;
        state.result = this.yHatToOutputString(yHat);
        state.error = '';
        state.executing = false;
        this.setState(state)
      } else if (netType == "caffe") {
        NeuralNow.compute(this.state.neuralNetwork.name, input, function (output) {
          state.result = this.yHatToOutputString(output);
          state.error = '';
          state.executing = false;
          this.setState(state)
        }.bind(this));
      }
    } catch (e) {
      var state = this.state;
      state.error = e.toString();
      state.executing = false;
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
