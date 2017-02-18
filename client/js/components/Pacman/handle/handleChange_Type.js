module.exports = function (value, component) {
  var state = component.state;
  state.type = value;
  state.brain.learning = (value === "training");
  component.setState(state);
}
