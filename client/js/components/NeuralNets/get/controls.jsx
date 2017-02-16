var React = require('react');
var browserHistory = require('react-router').browserHistory;
var Style = require('../Style.jsx');
var Form = require('../../Form/Index.jsx');
var Button = require('../../Button/Index.jsx');

function handleClick_New (e) {
  browserHistory.push("/neuralnetwork/new");
}

module.exports = function (state, onChange) {
  // <Button.Primary label={"New Model"} onClick={handleClick_New} />
  if (state.loaded) {
    return (
      <div className="col-lg-10 col-xs-12 col-centered">
        <Form.Input
          type={"input"}
          value={state.search}
          placeholder={"Search for stuff! ex: spam classification"}
          onChange={onChange} />
      </div>
    )
  }

  return (
    <div className="col-lg-10 col-xs-12 col-centered">
      <Form.Input
        type={"input"}
        value={state.search}
        placeholder={"Search for stuff! (once it loads this component)"}
        isDisabled={true}
        onChange={onChange} />
    </div>
  )
}
