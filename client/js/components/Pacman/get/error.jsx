var React = require('react');
var Style = require('../Style.jsx');
var Form = require('../../Form/Index.jsx');
var Button = require('../../Button/Index.jsx');

module.exports = function (state, onEvent) {
  if (state.error) {
    return (
      <div className="col-lg-6 col-xs-12">
        <div style={{color:"red"}}>{state.error}</div>
      </div>
    )
  }

  return (
    <div className="col-lg-6 col-xs-12" />
  )
}
