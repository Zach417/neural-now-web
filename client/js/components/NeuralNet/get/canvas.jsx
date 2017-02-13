var React = require('react');
var Style = require('../Style.jsx');
var NeuralNetCanvas = require('../../NeuralNetCanvas/Index.jsx');

module.exports = function (state) {
  var loaded = state.loadedLayers;
  var layers = state.neuralNetwork.layers.length > 0;
  if (loaded && layers) {
    return (
      <div className="col-lg-10 col-xs-12 col-centered">
        <NeuralNetCanvas neuralNetwork={this.state.neuralNetwork} />
      </div>
    )
  }
}
