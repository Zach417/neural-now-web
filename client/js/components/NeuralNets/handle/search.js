var score = require('string-score');

module.exports = function (search, component) {
  var state = component.state;
  var models = state.models;

  for (var i = 0; i < models.length; i++) {
    models[i].rank = score(models[i].name, search, 0.75);
  }

  state.models = models;
  state.search = search;
  component.setState(state);
}
