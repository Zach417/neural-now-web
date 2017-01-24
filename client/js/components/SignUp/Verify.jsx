var React = require('react');
var Style = require('./Style.jsx');
var Button = require('../Button/Index.jsx');
var ApiService = require('../../services/ApiService');

function getParameterByName(name) {
  name = name.replace(/[\[]/,/[\[]/, "\\[").replace(/[\]]/,/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
  results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g,/\+/g, " "));
}

var Component = React.createClass({
  getInitialState: function () {
    this._state = {
      submitting: true,
    }
    return this._state;
  },

  componentDidMount: function () {
    if (!getParameterByName('token')) {
      return this.setState({
        success: false,
        message: "A token was not supplied.",
      });
    }

    ApiService.setupUser({
      id: this.props.params.id,
      token: getParameterByName('token'),
    }, function (data) {
      this._state.submitting = false;
      this._state.submitted = true;
      this._state.success = data.success;
      this._state.message = data.message;
      return this.setState(this._state);
    }.bind(this));
  },

  render: function () {
    if (this.state.submitting === true) {
      return (
        <div>
          {"Verifying..."}
        </div>
      )
    }

    if (this.state.submitted === true && this.state.success === true) {
      return (
        <div>
          <div>
            {this.getSuccessMessage()}
          </div>
          <div style={{paddingTop:"5px"}}>
            Click <a href="/sign-in">here</a> to login.
          </div>
        </div>
      )
    }

    return (
      <div>
        {this.getSuccessMessage()}
        {this.getErrorMessage()}
      </div>
    )
  },

  getSuccessMessage: function () {
    if (this.state.success === true) {
      return (
        <div style={{paddingTop:"5px"}}>
          {this.state.message}
        </div>
      )
    }
  },

  getErrorMessage: function () {
    if (this.state.success === false) {
      return (
        <div style={{color:"#da383c", paddingTop:"5px"}}>
          {this.state.message}
        </div>
      )
    }
  },
});

module.exports = Component;
