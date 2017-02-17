module.exports = function (value, component) {
  var state = component.state;
  state.model = value;
  component.setState(state);
}
