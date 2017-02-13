var NeuralNetworkStore = require('../../../stores/NeuralNetworkStore');

module.exports = function (component) {
  var success = function (neuralNetwork) {
    var state = component.state;
    state.loadedDetails = true;
    Object.keys(neuralNetwork).forEach(function(key, index) {
      state.neuralNetwork[key] = neuralNetwork[key];
    });
    component.setState(state);
  }.bind(this);

  NeuralNetworkStore.getOne({
    id: component.state.neuralNetwork.name,
    allAttributes: false,
    success: success,
  });
}
