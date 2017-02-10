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
      NeuralNowUtils.Image.resizeToVector({
        size: net.inputSize,
        fromSize: [canvas.width, canvas.height],
        data: pixels,
        normalize: net.inputNormalized,
        callback: function (vol) {
          this.props.onChange(vol);
        }.bind(this),
      });
    }.bind(this);
    img.src = value;
	},
});

module.exports = Component;
