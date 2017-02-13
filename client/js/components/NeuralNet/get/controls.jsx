var React = require('react');
var browserHistory = require('react-router').browserHistory;
var Style = require('../Style.jsx');
var Button = require('../../Button/Index.jsx');

module.exports = function (state) {
  function handleClick_Edit () {
    browserHistory.push("/neuralnetwork/" + state.neuralNetwork.name + "/edit");
  }

  function handleClick_Back () {
    browserHistory.push("/neuralnetwork");
  }

  return (
    <div className="col-lg-10 col-xs-12 col-centered">
      <Button.Primary label="Edit" onClick={handleClick_Edit} />
      <span style={{marginLeft:"15px"}} />
      <Button.Secondary label="Back" onClick={handleClick_Back} />
      <div style={{marginBottom:"15px"}} />
    </div>
  )
}
