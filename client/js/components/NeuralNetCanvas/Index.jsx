var React = require('react');
var $ = require('jquery');

var Component = React.createClass({
  getInitialState: function() {
    return {
      circleRadius: 40,
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

  render: function() {
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
    var count = 2 + this.props.neuralNetwork.hidden.length;
    var totalSpace = this.state.canvas.width - padding;
    var spacing = (totalSpace / (count - 1)) - (this.state.circleRadius * 2);
    return this.state.canvas.padding.x + (((this.state.circleRadius * 2) + spacing) * i);
  },

  getWeights: function () {
    var lines = [];
    var nn = this.props.neuralNetwork;
    var layerCount = 2 + this.props.neuralNetwork.hidden.length;

    if (nn.hidden.length > 0) {
      // between input and hidden 0
      for (var i = 0; i < nn.input.size; i++) {
        var x1 = this.getLayerX(0);
        var y1 = this.getLayerY(i + 1, nn.input.size + 2);
        for (var j = 0; j < nn.hidden[0].size; j++) {
          var x2 = this.getLayerX(1);
          var y2 = this.getLayerY(j, nn.hidden[0].size);
          var key = "inner-hidden0-" + i + "-" + j;
          lines.push(<line key={key} x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeWidth="3" />)
        }
      }

      // between any hidden layers
      for (var i = 1; i < nn.hidden.length; i++) {
        for (var j = 0; j < nn.hidden[i - 1].size; j++) {
          var x1 = this.getLayerX(i);
          var y1 = this.getLayerY(j, nn.hidden[i - 1].size);
          for (var k = 0; k < nn.hidden[i].size; k++) {
            var x2 = this.getLayerX(i + 1);
            var y2 = this.getLayerY(k, nn.hidden[i].size);
            var key = "hidden" + (i - 1) + "-hidden" + i + "-" + j + "-" + k;
            lines.push(<line key={key} x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeWidth="3" />)
          }
        }
      }

      //between last hidden and output
      for (var i = 0; i < nn.hidden[nn.hidden.length - 1].size; i++) {
        var x1 = this.getLayerX(layerCount - 2);
        var y1 = this.getLayerY(i, nn.hidden[nn.hidden.length - 1].size);
        for (var j = 0; j < nn.output.size; j++) {
          var x2 = this.getLayerX(layerCount - 1);
          var y2 = this.getLayerY(j + 1, nn.output.size + 2);
          var key = "hidden" + (nn.hidden.length - 1) + "-outer-" + i + "-" + j;
          lines.push(<line key={key} x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeWidth="3" />)
        }
      }
    } else {
      // between input and output
      for (var i = 0; i < nn.input.size; i++) {
        var x1 = this.getLayerX(0);
        var y1 = this.getLayerY(i + 1, nn.input.size + 2);
        for (var j = 0; j < nn.output.size; j++) {
          var x2 = this.getLayerX(1);
          var y2 = this.getLayerY(j + 1, nn.output.size + 2);
          var key = "inner-output-" + i + "-" + j;
          lines.push(<line key={key} x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeWidth="3" />)
        }
      }
    }
    return (<g>{lines}</g>);
  },

  getInputLayer: function () {
    var circles = [];
    for (var i = 0; i < this.props.neuralNetwork.input.size; i++) {
      var x = this.getLayerX(0);
      var y = this.getLayerY(i + 1, this.props.neuralNetwork.input.size + 2);
      circles.push(<circle key={i} cx={x} cy={y} r={this.state.circleRadius} stroke="red" strokeWidth="3" fill="white" />);
    }
    return (<g>{circles}</g>);
  },

  getHiddenLayer: function () {
    var hidden = [];
    for (var i = 0; i < this.props.neuralNetwork.hidden.length; i++) {
      var circles = [];
      for (var j = 0; j < this.props.neuralNetwork.hidden[i].size; j++) {
        var x = this.getLayerX(i + 1);
        var y = this.getLayerY(j, this.props.neuralNetwork.hidden[i].size);
        circles.push(<circle key={j} cx={x} cy={y} r={this.state.circleRadius} stroke="rgb(3, 90, 132)" strokeWidth="3" fill="white" />);
      }
      hidden.push(<g key={i}>{circles}</g>);
    }
    return (<g>{hidden}</g>);
  },

  getOutputLayer: function () {
    var layerCount = 2 + this.props.neuralNetwork.hidden.length;
    var circles = [];
    for (var i = 0; i < this.props.neuralNetwork.output.size; i++) {
      var x = this.getLayerX(layerCount - 1);
      var y = this.getLayerY(i + 1, this.props.neuralNetwork.output.size + 2);
      circles.push(<circle key={i} cx={x} cy={y} r={this.state.circleRadius} stroke="green" strokeWidth="3" fill="white" />);
    }
    return (<g>{circles}</g>);
  },
});

module.exports = Component;
