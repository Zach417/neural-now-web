var React = require('react');
var Style = require('../Style.jsx');
var NeuralNetTest = require('../../NeuralNetTest/Index.jsx');

module.exports = function (state) {
  var loaded = state.loadedLayers && state.loadedDetails;
  var body;

  if (loaded) {
    body = (
      <div>
        <p>
          {"You can test out this neural network by inserting "}
          {"the appropriate input below and clicking \"Run\""}
        </p>
        <NeuralNetTest neuralNetwork={state.neuralNetwork} />
      </div>
    )
  } else {
    body = (
      <p>
        {"Loading testing module..."}
      </p>
    )
  }

  return (
    <div className="col-lg-10 col-xs-12 col-centered">
      <h3>Playground</h3>
      {body}
    </div>
  )
}
