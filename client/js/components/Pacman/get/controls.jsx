var React = require('react');
var Style = require('../Style.jsx');
var Form = require('../../Form/Index.jsx');
var Button = require('../../Button/Index.jsx');

module.exports = function (state, onEvent) {
  function handleClick_Apply (value) {
    onEvent("handleClick_Apply", value);
  }

  function handleClick_Run (value) {
    onEvent("handleClick_Run", value);
  }

  function handleClick_Pause (value) {
    onEvent("handleClick_Pause", value);
  }

  return (
    <div className="col-lg-6 col-xs-12">
      <Button.Primary label="Apply" onClick={handleClick_Apply} />
      <span style={{marginLeft:"15px"}} />
      <Button.Primary label="Run" onClick={handleClick_Run} />
      <span style={{marginLeft:"15px"}} />
      <Button.Primary label="Pause" onClick={handleClick_Pause} />
    </div>
  )
}
