var NeuralNetworkStore = require('../../../stores/NeuralNetworkStore');

module.exports = function (component) {
  var success = function (neuralNetwork) {
    var state = component.state;
    state.loadedLayers = true;
    state.neuralNetwork.layers = neuralNetwork.layers;
    this.setState(state);
  }.bind(this);

  NeuralNetworkStore.getOne({
    id: component.state.neuralNetwork.name,
    params: "s=layers",
    success: success,
  });
}
