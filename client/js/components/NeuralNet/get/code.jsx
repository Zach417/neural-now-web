var React = require('react');
var Style = require('../Style.jsx');
var NeuralNetCode = require('../../NeuralNetCode/Index.jsx');

module.exports = function (state) {
  var loaded = state.loadedDetails;
  var body;

  if (loaded) {
    body = (
      <div>
        <p>
          {"In some cases, a web API is reasonable for deployment "}
          {"of a deep learning model. If your project allows for some "}
          {"latency, feel free to use the code below to deploy this "}
          {"model in your project. If you're building a self-driving "}
          {"car, perhaps you shouldn't use this 😅"}
        </p>
        <NeuralNetCode neuralNetwork={state.neuralNetwork} />
      </div>
    )
  } else {
    body = (
      <p>
        {"Loading API code sample module..."}
      </p>
    )
  }

  return (
    <div className="col-lg-10 col-xs-12 col-centered">
      <h3>{"API usage"}</h3>
      {body}
    </div>
  )
}
