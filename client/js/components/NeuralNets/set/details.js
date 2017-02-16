var NeuralNetworkStore = require('../../../stores/NeuralNetworkStore');

module.exports = function (component) {
  var state = component.state;
  state.loaded = false;
  component.setState(state);

  var success = function (models) {
    var state = component.state;
    state.loaded = true;
    state.models = models;
    component.setState(state);
  }.bind(this);

  NeuralNetworkStore.get({
    refresh: true,
    params: "s=name&s=description&s=inputType&s=authors",
    success: success,
  });
}
