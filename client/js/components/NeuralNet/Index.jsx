var React = require('react');
var browserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var Button = require('../Button/Index.jsx');
var NeuralNetCanvas = require('../NeuralNetCanvas/Index.jsx');
var NeuralNetCode = require('../NeuralNetCode/Index.jsx');
var NeuralNetTest = require('../NeuralNetTest/Index.jsx');
var NeuralNetworkStore = require('../../stores/NeuralNetworkStore');

var Component = React.createClass({
	getInitialState: function () {
		return {
			loadedDetails: false,
			loadedLayers: false,
			neuralNetwork: {
        name: "Loading...",
        layers: [],
      }
		}
	},

	componentWillMount: function () {
		var state = this.state;
		state.neuralNetwork.name = this.props.params.id;
		this.setState(state);
		this.setNeuralNetworkDetails();
		this.setNeuralNetworkLayers();
	},

	render: function () {
		return (
    	<div className="container-fluid" style={Style.container}>
				<div className="row">
					{this.getHeader()}
					{this.getControls()}
					{this.getCanvas()}
					{this.getCode()}
					{this.getTest()}
				</div>
			</div>
		);
	},

	setNeuralNetworkDetails: function () {
		var success = function (neuralNetwork) {
			var state = this.state;
			state.loadedDetails = true;
			Object.keys(neuralNetwork).forEach(function(key, index) {
				state.neuralNetwork[key] = neuralNetwork[key];
			});
			this.setState(state);
		}.bind(this);

		NeuralNetworkStore.getOne({
			id: this.state.neuralNetwork.name,
			allAttributes: false,
			success: success,
		});
	},

	setNeuralNetworkLayers: function () {
		var success = function (neuralNetwork) {
			var state = this.state;
			state.loadedLayers = true;
			state.neuralNetwork.layers = neuralNetwork.layers;
			this.setState(state);
		}.bind(this);

		NeuralNetworkStore.getOne({
			id: this.state.neuralNetwork.name,
			params: "s=layers",
			success: success,
		});
	},

	getHeader: function () {
		return (
			<div className="col-lg-10 col-xs-12 col-centered">
				<h1>
					{this.state.neuralNetwork.name}
				</h1>
				<p>{this.state.neuralNetwork.description}</p>
			</div>
		)
	},

	getControls: function () {
		return (
			<div className="col-lg-10 col-xs-12 col-centered">
				<Button.Primary label="Edit" onClick={this.handleClick_Edit} />
				<span style={{marginLeft:"15px"}} />
				<Button.Secondary label="Back" onClick={this.handleClick_Back} />
				<div style={{marginBottom:"15px"}} />
			</div>
		)
	},

	getCanvas: function () {
		var loaded = this.state.loadedLayers;
		var layers = this.state.neuralNetwork.layers.length > 0;
		if (loaded && layers) {
			return (
				<div className="col-lg-10 col-xs-12 col-centered">
					<NeuralNetCanvas neuralNetwork={this.state.neuralNetwork} />
					<div style={{marginBottom: "25px"}} />
				</div>
			)
		}
	},

	getCode: function () {
		var loaded = this.state.loadedDetails;
		if (loaded) {
			return (
				<div className="col-lg-10 col-xs-12 col-centered">
					<p>
						{"This is how you can use this neural network in your project"}
					</p>
					<NeuralNetCode neuralNetwork={this.state.neuralNetwork} />
					<div style={{marginBottom: "25px"}} />
				</div>
			)
		}

		return (
			<div className="col-lg-10 col-xs-12 col-centered">
				<p>
					{"Loading code sample module..."}
				</p>
			</div>
		)
	},

	getTest: function () {
		var loaded = this.state.loadedLayers && this.state.loadedDetails;
		if (loaded) {
			return (
				<div className="col-lg-10 col-xs-12 col-centered">
					<p>
						{"You can test out this neural network by inserting "}
						{"the appropriate input below and clicking \"Run\""}
					</p>
					<NeuralNetTest neuralNetwork={this.state.neuralNetwork} />
				</div>
			)
		}

		return (
			<div className="col-lg-10 col-xs-12 col-centered">
				<p>
					{"Loading testing module..."}
				</p>
			</div>
		)
	},

	handleClick_Edit: function () {
		browserHistory.push("/neuralnetwork/" + this.state.neuralNetwork.name + "/edit");
	},

	handleClick_Back: function () {
		browserHistory.push("/neuralnetwork");
	},
});

module.exports = Component;
