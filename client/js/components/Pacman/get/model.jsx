var React = require('react');
var Style = require('../Style.jsx');
var Form = require('../../Form/Index.jsx');
var Button = require('../../Button/Index.jsx');

module.exports = function (state, onEvent) {
  return (
    <div className="col-lg-6 col-xs-12">
      <h3>Model Definition</h3>
      <Form.TextArea
        value={state.model}
        onChange={onEvent} />
    </div>
  )
}
