var React = require('react');
var Style = require('./Style.jsx');
var Button = require('../Button/Index.jsx');
var Form = require('../Form/Index.jsx')
var ApiService = require('../../services/ApiService');

var Component = React.createClass({
  getInitialState: function() {
    this._state = {
      email: '',
      firstName: '',
      lastName: '',
      firstPassword: '',
      secondPassword: ''
    }
    return this._state;
  },

  render: function() {
    if (this.state.submitting === true) {
      return (
        <div>{"Submitting..."}</div>
      )
    }

    if (this.state.submitted === true && this.state.success === true) {
      return (
        <div>
          {this.getSuccessMessage()}
          {this.getErrorMessage()}
        </div>
      )
    }

    return (
    	<div className="container-fluid" style={Style.container}>
				<div className="row">
					<div className="col-md-6 col-xs-12 col-centered">
            <div style={Style.register}>
              <div style={Style.header}>
                Sign up
              </div>
              <div style={Style.loginForm}>
                <Form.Label isRequired={true} label={"First Name"} />
                <Form.Input
                  type={"text"}
                  placeholder={"Moshe"}
                  value={this.state.firstName}
                  onChange={this.handleChange_FirstName} />

                <Form.Label isRequired={true} label={"Last Name"} />
                <Form.Input
                  type={"text"}
                  placeholder={"Rabbenu"}
                  value={this.state.lastName}
                  onChange={this.handleChange_LastName} />

                <Form.Label isRequired={true} label={"Your Email"} />
                <Form.Input
                  type={"email"}
                  placeholder={"letmypeoplego@prophetsonly.com"}
                  value={this.state.email}
                  onChange={this.handleChange_Email} />

                <Form.Label isRequired={true} label={"Password"} />
                <Form.Input
                  type={"password"}
                  value={this.state.firstPassword}
                  onChange={this.handleChange_FirstPassword} />

                <Form.Label isRequired={true} label={"Confirm Password"} />
                <Form.Input
                  type={"password"}
                  value={this.state.secondPassword}
                  onChange={this.handleChange_SecondPassword} />

                <div style={{marginTop: "10px"}}/>
                <Button.Primary label={"Sign Up"} onClick={this.handleClick_Submit}/>
                {this.getErrorMessage()}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },

  getSuccessMessage: function() {
    if (this.state.success === true) {
      return (
        <div style={{
          paddingTop: "5px"
        }}>
          {this.state.message}
        </div>
      )
    }
  },

  getErrorMessage: function() {
    if (this.state.success === false) {
      return (
        <div style={{
          color: "#da383c",
          paddingTop: "5px"
        }}>
          {this.state.message}
        </div>
      )
    }
  },

  handleChange_Email: function(value) {
    this._state.email = value;
    this.setState(this._state);
  },

  handleChange_FirstName: function(value) {
    this._state.firstName = value;
    this.setState(this._state);
  },

  handleChange_LastName: function(value) {
    this._state.lastName = value;
    this.setState(this._state);
  },

  handleChange_FirstPassword: function(value) {
    this._state.firstPassword = value;
    this.setState(this._state);
  },

  handleChange_SecondPassword: function(value) {
    this._state.secondPassword = value;
    this.setState(this._state);
  },

  handleClick_Submit: function() {
    if (!this.state.email || !this.state.firstName || !this.state.lastName || !this.state.secondPassword) {
      this._state.success = false;
      this._state.message = "One or more required fields were left blank.";
      return this.setState(this._state);
    }

    if (this.state.firstPassword !== this.state.secondPassword) {
      this._state.success = false;
      this._state.message = "The passwords you entered do not match.";
      return this.setState(this._state);
    }

    this._state.submitting = true;
    this._state.submitted = false;
    this.setState(this._state);

    ApiService.requestUserSetup({
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      password: this.state.secondPassword
    }, function(data) {
      this._state.submitting = false;
      this._state.submitted = true;
      this._state.success = data.success;
      this._state.message = data.message;
      return this.setState(this._state);
    }.bind(this));
  }
});

module.exports = Component;
