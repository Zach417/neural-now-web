var React = require('react');
var Link = require('react-router').Link;
var Style = require('./Style.jsx');
var Form = require('../Form/Index.jsx');
var Button = require('../Button/Index.jsx');
var NeuralNetCanvas = require('../NeuralNetCanvas/Index.jsx');

var Component = React.createClass({
	getInitialState: function () {
		return {
			neuralNetwork: {
				input: {
					size: 3
				},
				hidden: [{
					size: 5
				},{
					size: 5
				}],
				output: {
					size: 3
				}
			}
		}
	},

	render: function (){
		return (
    	<div className="container-fluid" style={Style.container}>
				<div className="row">
					<div className="col-lg-10 col-xs-12 col-centered">
            <h1>Neural Networks</h1>
					</div>
					<div className="col-lg-10 col-xs-12 col-centered">
						<p>
							This is a playground area for neural networks that can be
							deployed on the Neural Now service.
						</p>
					</div>
					<div className="col-lg-10 col-xs-12 col-centered">
						<NeuralNetCanvas neuralNetwork={this.state.neuralNetwork} />
					</div>
					<div className="col-lg-10 col-xs-12 col-centered">
						<h3>Parameters</h3>
						<div className="col-md-6 col-xs-12">
							<Form.Label label={"Input Layer Size"} />
							<Form.Input
								value={this.state.neuralNetwork.input.size}
								attribute="input"
								onChange={this.handleChange_Input} />
						</div>
						<div className="col-md-6 col-xs-12">
							<Form.Label label={"Output Layer Size"} />
							<Form.Input
								value={this.state.neuralNetwork.output.size}
								attribute="output"
								onChange={this.handleChange_Input} />
						</div>
						<div className="col-xs-12">
							<Form.Label label={"Add/Remove Layers"} />
							<Button.Primary label="Add" onClick={this.handleClick_AddHidden} />
							<span> </span>
							<Button.Danger label="Remove" onClick={this.handleClick_RemoveHidden} />
						</div>
						{this.getHiddenLayerInputs()}
					</div>
				</div>
			</div>
		);
	},

	getHiddenLayerInputs: function () {
		var layers = [];
		for (var i = 0; i < this.state.neuralNetwork.hidden.length; i++) {
			layers.push(
				<div key={i} className="col-md-6 col-xs-12">
					<Form.Label label={"Hidden Layer " + (i + 1) + " Size"} />
					<Form.Input
						value={this.state.neuralNetwork.hidden[i].size}
						attribute={i.toString()}
						onChange={this.handleChange_Hidden_Input} />
				</div>
			);
		}
		return layers;
	},

	handleChange_Input: function (attribute, value) {
		if (Number(value) > 200) {
			value = "200";
		}

		var state = this.state;
		if (isNaN(Number(value))) {
			state.neuralNetwork[attribute].size = 0;
		} else {
			state.neuralNetwork[attribute].size = Number(value);
		}
		this.setState(state);
	},

	handleChange_Hidden_Input: function (attribute, value) {
		var i = Number(attribute);
		var state = this.state;
		if (isNaN(Number(value)) && state.neuralNetwork.hidden) {
			state.neuralNetwork.hidden[i].size = 0;
		} else {
			state.neuralNetwork.hidden[i].size = Number(value);
		}
		this.setState(state);
	},

	handleClick_AddHidden: function () {
		var state = this.state;
		state.neuralNetwork.hidden.push({size: 3});
		this.setState(state);
	},

	handleClick_RemoveHidden: function () {
		var state = this.state;
		state.neuralNetwork.hidden.splice(state.neuralNetwork.hidden.length - 1, 1);
		this.setState(state);
	}
});

module.exports = Component;
