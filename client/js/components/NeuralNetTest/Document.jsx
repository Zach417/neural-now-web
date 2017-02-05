var React = require('react');
var $ = require('jquery');
var Style = require('./Style.jsx');

var Component = React.createClass({
	getInitialState: function () {
		return {
			id: '',
			uploading: false,
			uploaded: false,
			progress: '',
		}
	},

	componentWillMount: function () {
		this.setState({
			id: Math.floor(Math.random() * 1000000000),
		});
	},

  componentDidMount: function () {
		var inputId = "document-form-file"+ "-" + this.state.id;
    $("#document-form" + "-" + this.state.id).on('submit', function (e) {
			e.preventDefault();
			var file = document.getElementById(inputId).files[0];
      var reader = new FileReader();
      reader.onload = function(e) {
				this.uploaded();
				this.props.onUpload(e.target.result);
      }.bind(this);
			reader.onprogress = function (e) {
				var state = this.state;
				state.progress = (parseInt(e.loaded / e.total * 100)).toString() + "%";
				this.setState(state);
			}.bind(this);
			this.uploading();
      reader.readAsDataURL(file);
    }.bind(this));

    $("#document-form-file"+ "-" + this.state.id).on("change", function() {
			$("#document-form"+ "-" + this.state.id).submit();
    }.bind(this));
  },

  render: function () {
	  return (
	    <form
	      id={"document-form" + "-" + this.state.id}
	      encType="multipart/form-data">
				{this.getStatus()}
	      <input
	        id={"document-form-file"+ "-" + this.state.id}
	        name="file"
	        type="file" />
	      <input
	        id={"document-form-submit"+ "-" + this.state.id}
	        style={{display:"none"}}
	        type="submit"
	        name="upload"
	        value="Upload" />
	    </form>
	  )
  },

	getStatus: function () {
		if (this.state.uploading) {
			return (
				<label>
					{"Uploading... "}
					{"(" + this.state.progress + ")"}
				</label>
			)
		} else if (this.state.uploaded) {
			return (
				<label>
					{"Document uploaded!"}
				</label>
			)
		} else {
			return (
				<label>
					{"Upload an image to classify"}
				</label>
			)
		}
	},

	uploading: function () {
		var state = this.state;
		state.uploading = true;
		state.uploaded = false;
		this.setState(state);
	},

	uploaded: function () {
		var state = this.state;
		state.uploading = false;
		state.uploaded = true;
		this.setState(state);
	},
});

module.exports = Component;
