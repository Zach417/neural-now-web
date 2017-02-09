var React = require('react');
var Link = require('react-router').Link;
var Style = require('./Style.jsx');
var NeuralNowUtils = require('neural-now-utils');
var Form = require('../Form/Index.jsx');
var DocumentUploader = require('./Document.jsx');

var Component = React.createClass({
  render: function () {
    return (
      <div>
        <DocumentUploader onUpload={this.handleUpload_DocumentUploader} />
      </div>
    );
  },

  handleChange_TextArea: function (value) {
    this.props.onChange(value);
  },

	handleUpload_DocumentUploader: function (value) {
    var img = document.createElement('img');
    img.onload = function () {
      var canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0,0);
      var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      var pixels = imageData.data;

      var net = this.props.neuralNetwork;
      if (!net.type || net.type == "convnetjs") {
        NeuralNowUtils.Image.resizeToVector({
          size: [net.layers[0].out_sx, net.layers[0].out_sy, net.layers[0].out_depth],
          fromSize: [canvas.width, canvas.height],
          data: pixels,
          callback: function (vol) {
            this.props.onChange(vol);
          }.bind(this),
        });
      } else {
        NeuralNowUtils.Image.resizeToVector({
          size: [256, 256, 3],
          fromSize: [canvas.width, canvas.height],
          data: pixels,
          callback: function (vol) {
            this.props.onChange(vol);
          }.bind(this),
        });
      }
    }.bind(this);
    img.src = value;
	},
});

module.exports = Component;
