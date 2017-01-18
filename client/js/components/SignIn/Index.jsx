var React = require('react');
var Link = require('react-router').Link;
var Style = require('./Style.jsx');
var Form = require('../Form/Index.jsx');
var Button = require('../Button/Index.jsx');
var ApiService = require('../../services/ApiService');

var Component = React.createClass({
  getInitialState: function() {
    return {
      email: '',
      password: '',
    };
  },

	render: function(){
    if (this.state.submitting === true) {
      return (
	    	<div className="container-fluid" style={Style.container}>
					<div className="row">
						<div className="col-md-6 col-xs-12 col-centered">
		          {"Submitting..."}
				    </div>
					</div>
        </div>
      )
    }

    if (this.state.submitted === true && this.state.success == true) {
      return (
	    	<div className="container-fluid" style={Style.container}>
					<div className="row">
						<div className="col-md-6 col-xs-12 col-centered">
		          {this.getSuccessMessage()}
		          {this.getErrorMessage()}
        		</div>
        	</div>
        </div>
      )
    }

		return (
    	<div className="container-fluid" style={Style.container}>
				<div className="row">
					<div className="col-md-6 col-xs-12 col-centered">
            <h1>Sign in</h1>
            <Form.Label
							label={"Username"}
							required={true} />
            <Form.Input
							value={this.state.email}
							onChange={this.handleChange_Email} />
            <Form.Label label={"Password"} required={true} />
            <Form.Input
              type={"password"}
							value={this.state.password}
							onChange={this.handleChange_Password} />
					</div>
				</div>
				<div className="row" style={{marginBottom:"15px"}} />
				<div className="row">
					<div className="col-md-6 col-xs-12 col-centered">
						<Button.Primary
							label={"Sign in"}
							onClick={this.handleClick_Submit} />
	            {this.getErrorMessage()}
					</div>
				</div>
			</div>
		);
	},

  getSuccessMessage: function() {
    if (this.state.success == true) {
      return (
        <div style={{paddingTop: "5px"}}>
          {this.state.message}
        </div>
      )
    }
  },

  getErrorMessage: function() {
    if (this.state.success == false) {
      return (
        <div style={{color: "#da383c",paddingTop: "5px"}}>
          {this.state.message}
        </div>
      )
    }
  },

  handleChange_Email: function (value) {
		var state = this.state;
    state.email = value;
    this.setState(state);
  },

  handleChange_Password: function (value) {
		var state = this.state;
    state.password = value;
    this.setState(state);
  },

  handleClick_Submit: function() {
    if (!this.state.email || !this.state.password) {
			var state = this.state;
      state.success = false;
      state.message = "One or more required fields were left blank.";
      return this.setState(state);
    }

		var state = this.state;
    state.submitting = true;
    state.submitted = false;
    this.setState(state);

    ApiService.signIn({
      email: this.state.email,
      password: this.state.password
    }, function(data) {
			var state = this.state;
      state.submitting = false;
      state.submitted = true;
      state.success = data.success;
      state.message = data.message;

      if (data.success == true) {
        return window.location.assign('/');
      }

      return this.setState(state);
    }.bind(this));
  }
});

module.exports = Component;
