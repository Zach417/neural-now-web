var React = require('react');
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;
var Griddle = require('griddle-react');
var cnn = require('neural-now-cnn');
var Style = require('./Style.jsx');
var DocumentUploader = require('./Document.jsx');
var Form = require('../Form/Index.jsx');
var Button = require('../Button/Index.jsx');
var NeuralNetCanvas = require('../NeuralNetCanvas/Index.jsx');
var NeuralNetCode = require('../NeuralNetCode/Index.jsx');
var NeuralNetTest = require('../NeuralNetTest/Index.jsx');
var NeuralNetworkStore = require('../../stores/NeuralNetworkStore');

var Component = React.createClass({
	getInitialState: function () {
		return {
			layersString: '[]',
			neuralNetwork: {
        name: "new-neural-net",
        layers: [],
      }
		}
	},

	componentWillMount: function () {
    if (this.props.params && this.props.params.id) {
  		NeuralNetworkStore.getOne(this.props.params.id, false, function (neuralNetwork) {
  			var state = this.state;
        state.layersString = JSON.stringify(neuralNetwork.layers);
  			state.neuralNetwork = neuralNetwork;
  			this.setState(state);
  		}.bind(this));
    }
	},

  componentDidMount: function() {
    NeuralNetworkStore.addChangeListener(this.componentWillMount);
  },

  componentWillUnmount: function() {
    NeuralNetworkStore.removeChangeListener(this.componentWillMount);
  },

	render: function (){
		return (
    	<div className="container-fluid" style={Style.container}>
				<div className="row">
					<div className="col-lg-10 col-xs-12 col-centered">
            <h1>
              {"Neural Network - "}
              {this.state.neuralNetwork.name}
            </h1>
					</div>
    			<div className="col-lg-10 col-xs-12 col-centered">
    				<Button.Primary label="Save" onClick={this.handleClick_Save} />
    				<span style={{marginLeft:"15px"}} />
      			<Button.Secondary label="Cancel" onClick={this.handleClick_Cancel} />
    				<span style={{marginLeft:"15px"}} />
      			<Button.Danger label="Delete" onClick={this.handleClick_Delete} />
    				<div style={{marginBottom:"15px"}} />
    			</div>
        	<div className="col-lg-10 col-xs-12 col-centered">
        		<NeuralNetCanvas neuralNetwork={this.state.neuralNetwork} />
        	</div>
				</div>
				<div className="row">
					<div className="col-lg-10 col-xs-12 col-centered">
						<h3>Details</h3>
						<div className="col-xs-12">
							<Form.Label label={"Name"} />
							<Form.Input
								value={this.state.neuralNetwork.name}
								attribute="name"
								onChange={this.handleChange_Attribute} />
						</div>
						<div className="col-xs-12">
							<Form.Label label={"Neural Net Description"} />
							<Form.TextArea
								value={this.state.neuralNetwork.description}
								attribute="description"
								onChange={this.handleChange_Attribute} />
						</div>
						<div className="col-xs-12">
							<Form.Label label={"Input Type"} />
							<Form.Select
								allowNulls={true}
								options={["vector","text","image","audio"]}
								value={this.state.neuralNetwork.inputType}
								attribute="inputType"
								onChange={this.handleChange_Attribute} />
						</div>
						<div className="col-xs-12">
							<Form.Label label={"Output Description"} />
							<Form.TextArea
								value={this.state.neuralNetwork.outputDescription}
								attribute="outputDescription"
								onChange={this.handleChange_Attribute} />
						</div>
						<div className="col-xs-12">
							<Form.Label label={"Code Example"} />
							<Form.TextArea
								value={this.state.neuralNetwork.codeExample}
								attribute="codeExample"
								onChange={this.handleChange_Attribute} />
						</div>
						<div className="col-xs-12">
	    				<DocumentUploader onUpload={this.handleUpload_DocumentUploader} />
						</div>
					</div>
				</div>
			</div>
		);
	},

	getControls: function () {
		return (
			<div className="col-lg-10 col-xs-12 col-centered">
				<Button.Primary label="Edit" onClick={this.handleClick_Edit} />
				<div style={{marginBottom:"15px"}} />
			</div>
		)
	},

	handleChange_LayersString: function (value) {
    var isJson = true;
    try {
        JSON.parse(value);
    } catch (e) {
        isJson = false;
    }

    if (isJson === true) {
      var state = this.state;
      state.layersString = value;
      state.neuralNetwork.layers = JSON.parse(value);
      this.setState(state);
    } else {
      var state = this.state;
      state.layersString = value;
      this.setState(state);
    }
	},

	handleChange_Attribute: function (attribute, value) {
		var state = this.state;
		state.neuralNetwork[attribute] = value;
		this.setState(state);
	},

  handleClick_Save: function () {
		if (this.props.params && this.props.params.id) {
			NeuralNetworkStore.update(this.state.neuralNetwork, function (data) {
		    browserHistory.push("/neuralnetwork/" + this.state.neuralNetwork.name);
			}.bind(this));
		} else {
			NeuralNetworkStore.insert(this.state.neuralNetwork, function (data) {
		    browserHistory.push("/neuralnetwork");
			}.bind(this));
		}
  },

	handleClick_Cancel: function () {
    if (this.props.params && this.props.params.id) {
			browserHistory.push("/neuralnetwork/" + this.state.neuralNetwork.name);
		} else {
			browserHistory.push("/neuralnetwork");
		}
	},

	handleClick_Delete: function () {
		if (this.props.params && this.props.params.id) {
			NeuralNetworkStore.delete(this.state.neuralNetwork, function (data) {
				browserHistory.push("/neuralnetwork/");
			}.bind(this));
		}
	},

	handleUpload_DocumentUploader: function (value) {
    var isJson = true;
    try {
        JSON.parse(value);
    } catch (e) {
        isJson = false;
    }

    if (isJson === true) {
      var state = this.state;
      state.layersString = value;
      state.neuralNetwork.layers = JSON.parse(value).layers;
      this.setState(state);
    } else {
      var state = this.state;
      state.layersString = value;
      this.setState(state);
    }
	},
});

module.exports = Component;
