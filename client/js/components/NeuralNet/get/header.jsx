var React = require('react');
var Style = require('../Style.jsx');

module.exports = function (state) {
  return (
    <div className="col-lg-10 col-xs-12 col-centered">
      <h1>
        {state.neuralNetwork.name}
      </h1>
      <p>
        {state.neuralNetwork.description}
      </p>
    </div>
  )
}
