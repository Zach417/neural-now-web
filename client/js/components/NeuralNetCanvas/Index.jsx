var React = require('react');
var $ = require('jquery');
var NeuralNetworkStore = require('../../stores/NeuralNetworkStore');

function copyNeuralNetwork (neuralNetwork) {
  var nn = {
    layers: [],
  };

  if (neuralNetwork.layers) {
    for (var i = 0; i < neuralNetwork.layers.length; i++) {
      var layer = neuralNetwork.layers[i];
      if (i === 0) {
        nn.layers.push(layer);
      } else if (layer.filters.length > 0) {
        nn.layers.push(layer);
      }
    }
  }

  nn.type = neuralNetwork.type;

  return nn;
}

function setMaxLayerSize (neuralNetwork) {
  var nn = copyNeuralNetwork(neuralNetwork);

  for (var i = 0; i < nn.layers.length; i++) {
    if (!nn.layers[i].out_depth) {
      continue;
    } else if (nn.layers[i].out_depth > 50) {
      nn.layers[i].out_depth = 50;
    }
  }

  return nn;
}

var Component = React.createClass({
  getInitialState: function() {
    return {
      loading: false,
      circleRadius: 40,
			neuralNetwork: {
        name: "neural-network",
        layers: [],
      },
      canvas: {
        width: 1000,
        height: 400,
        padding: {
          x: 150,
          y: 100,
        },
      },
    }
  },

  componentDidMount: function () {
    this.updateCanvasSize();
    window.addEventListener("resize", this.updateCanvasSize);
  },

  componentWillUnmount: function () {
    this.updateCanvasSize();
    window.removeEventListener("resize", this.updateCanvasSize);
  },

  componentWillMount: function () {
    var state = this.state;
    if (this.props.neuralNetwork) {
      state.neuralNetwork = setMaxLayerSize(this.props.neuralNetwork);
      this.setState(state);
    } else {
      state.loading = true;
      this.setState(state);
      NeuralNetworkStore.getOne(this.props.name, true, function (neuralNetwork) {
        var state = this.state;
        state.loading = false;
        state.neuralNetwork = setMaxLayerSize(neuralNetwork);
        this.setState(state);
      }.bind(this));
    }
  },

  componentWillReceiveProps: function (nextProps) {
    this.props = nextProps;
    this.componentWillMount();
  },

  render: function() {
    var netType = this.state.neuralNetwork.type;
    if (netType && netType != "convnetjs") {
      return (
        <div></div>
      );
    }

    if (this.state.loading === true || !this.state.neuralNetwork.layers || this.state.neuralNetwork.layers.length === 0) {
      return (
        <div id="neural-net-canvas" width="100%" height={this.state.canvas.height}>
          <svg width={this.state.canvas.width} height={this.state.canvas.height} onMouseMove={this.handleMouseMove}>
            <rect width={this.state.canvas.width} height={this.state.canvas.height} fill="#272822" />
            <text x="10" y="25" fill="white">Loading neural net weights...</text>
          </svg>
        </div>
      )
    }

    return (
      <div id="neural-net-canvas" width="100%" height={this.state.canvas.height}>
        <svg width={this.state.canvas.width} height={this.state.canvas.height} onMouseMove={this.handleMouseMove}>
          <rect width={this.state.canvas.width} height={this.state.canvas.height} fill="#272822" />
          {this.getWeights()}
          {this.getInputLayer()}
          {this.getHiddenLayer()}
          {this.getOutputLayer()}
        </svg>
      </div>
    );
  },

  updateCanvasSize: function () {
    var state = this.state;
    state.canvas.width = $("#neural-net-canvas").width();

    if (state.canvas.width > 800) {
      state.canvas.padding.x = 100;
      state.canvas.padding.y = 75;
      state.canvas.height = 400;
      state.circleRadius = 25;
    } else {
      state.canvas.padding.x = 50;
      state.canvas.padding.y = 40;
      state.canvas.height = 300;
      state.circleRadius = 20;
    }

    this.setState(state);
  },

  getLayerY: function (i, size) {
    if (size <= 1) { size = 2; }
    var padding = this.state.canvas.padding.y * 2;
    var totalSpace = this.state.canvas.height - padding;
    var spacing = (totalSpace / (size - 1)) - (this.state.circleRadius * 2);
    return this.state.canvas.padding.y + (((this.state.circleRadius * 2) + spacing) * i);
  },

  getLayerX: function (i) {
    var padding = this.state.canvas.padding.x * 2;
    var count = this.state.neuralNetwork.layers.length;
    var totalSpace = this.state.canvas.width - padding;
    var spacing = (totalSpace / (count - 1)) - (this.state.circleRadius * 2);
    return this.state.canvas.padding.x + (((this.state.circleRadius * 2) + spacing) * i);
  },

  getMaxMinWeight: function () {
    var net = this.state.neuralNetwork;
    var maxWeight = 1;
    var minWeight = -1;
    for (var i = 0; i < net.layers.length; i++) {
      var filters = net.layers[i].filters;
      for (var j = 0; j < filters.length; j++) {
        var weights = net.layers[i].filters[j].w;
        for (var k = 0; k < weights.length; k++) {
          var w = weights[k];
          if (w > maxWeight) {
            maxWeight = w;
          } else if (w < minWeight) {
            minWeight = w;
          }
        }
      }
    }
    return {max: maxWeight, min: minWeight};
  },

  getWeights: function () {
    var lines = [];
    var nn = this.state.neuralNetwork;
    var layerCount = this.state.neuralNetwork.layers.length;
    var maxStrokeWidth = 4;
    var maxWeight = this.getMaxMinWeight().max;
    var minWeight = this.getMaxMinWeight().min;

    if (nn.layers.length > 0) {
      // between input and hidden 0
      for (var i = 0; i < nn.layers[0].out_depth; i++) {
        var x1 = this.getLayerX(0);
        var y1 = this.getLayerY(i + 1, nn.layers[0].out_depth + 2);
        for (var j = 0; j < nn.layers[1].out_depth; j++) {
          var x2 = this.getLayerX(1);
          var y2 = this.getLayerY(j, nn.layers[1].out_depth);
          var weight = nn.layers[1].filters[j].w[i];
          var key = "inner-hidden0-" + i + "-" + j;
          var stroke = "green";
          var strokeWidth = maxStrokeWidth * (weight / maxWeight);
          if (weight < 0) {
            stroke = "red";
            strokeWidth = maxStrokeWidth * (weight / minWeight);
          }

          lines.push(<line key={key} x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth={strokeWidth} />)
        }
      }

      // between any hidden layers
      for (var i = 1; i < nn.layers.length - 2; i++) {
        for (var j = 0; j < nn.layers[i].out_depth; j++) {
          var x1 = this.getLayerX(i);
          var y1 = this.getLayerY(j, nn.layers[i].out_depth);
          for (var k = 0; k < nn.layers[i + 1].out_depth; k++) {
            var x2 = this.getLayerX(i + 1);
            var y2 = this.getLayerY(k, nn.layers[i + 1].out_depth);
            var weight = nn.layers[i].filters[j].w[k];
            var key = "hidden" + (i - 1) + "-hidden" + i + "-" + j + "-" + k;
            var stroke = "green";
            var strokeWidth = maxStrokeWidth * (weight / maxWeight);
            if (weight < 0) {
              stroke = "red";
              strokeWidth = maxStrokeWidth * (weight / minWeight);
            }
            lines.push(<line key={key} x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth={strokeWidth} />)
          }
        }
      }

      //between last hidden and output
      for (var i = 0; i < nn.layers[nn.layers.length - 2].out_depth; i++) {
        var x1 = this.getLayerX(layerCount - 2);
        var y1 = this.getLayerY(i, nn.layers[nn.layers.length - 2].out_depth);
        for (var j = 0; j < nn.layers[layerCount - 1].out_depth; j++) {
          var x2 = this.getLayerX(layerCount - 1);
          var y2 = this.getLayerY(j + 1, nn.layers[layerCount - 1].out_depth + 2);
          var weight = nn.layers[layerCount - 1].filters[j].w[i];
          var key = "hidden" + (nn.layers.length - 2) + "-outer-" + i + "-" + j;
          var stroke = "green";
          var strokeWidth = maxStrokeWidth * (weight / maxWeight);
          if (weight < 0) {
            stroke = "red";
            strokeWidth = maxStrokeWidth * (weight / minWeight);
          }
          lines.push(<line key={key} x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth="3" />)
        }
      }
    }
    return (<g>{lines}</g>);
  },

  getInputLayer: function () {
    var circles = [];
    var layers = this.state.neuralNetwork.layers;
    if (layers.length > 0) {
      for (var i = 0; i < layers[0].out_depth; i++) {
        var x = this.getLayerX(0);
        var y = this.getLayerY(i + 1, layers[0].out_depth + 2);
        circles.push(<circle key={i} cx={x} cy={y} r={this.state.circleRadius} stroke="red" strokeWidth="3" fill="white" />);
      }
    }
    return (<g>{circles}</g>);
  },

  getHiddenLayer: function () {
    var hidden = [];
    var layers = this.state.neuralNetwork.layers;
    if (layers.length > 0) {
      for (var i = 1; i < layers.length - 1; i++) {
        var circles = [];
        var layer = layers[i];
        for (var j = 0; j < layer.out_depth; j++) {
          var x = this.getLayerX(i);
          var y = this.getLayerY(j, layer.out_depth);
          circles.push(<circle key={j} cx={x} cy={y} r={this.state.circleRadius} stroke="rgb(3, 90, 132)" strokeWidth="3" fill="white" />);
        }
        hidden.push(<g key={i}>{circles}</g>);
      }
    }
    return (<g>{hidden}</g>);
  },

  getOutputLayer: function () {
    var circles = [];
    var layers = this.state.neuralNetwork.layers;
    if (layers.length > 0) {
      for (var i = 0; i < layers[layers.length - 1].out_depth; i++) {
        var x = this.getLayerX(layers.length - 1);
        var y = this.getLayerY(i + 1, layers[layers.length - 1].out_depth + 2);
        circles.push(<circle key={i} cx={x} cy={y} r={this.state.circleRadius} stroke="green" strokeWidth="3" fill="white" />);
      }
    }

    return (<g>{circles}</g>);
  },
});

module.exports = Component;
