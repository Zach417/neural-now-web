module.exports = function (component) {
  var state = component.state;
  state.games = ["pacman"];
  state.loaded = true;
  component.setState(state);
}
