var React = require('react');
var Style = require('./Style.jsx');

var Component = React.createClass({
	getInitialState: function () {
		return {
			loadedDetails: false,
			loadedLayers: false,
			neuralNetwork: { layers: [] }
		}
	},

	componentWillMount: function () {
		var state = this.state;
		state.neuralNetwork.name = this.props.params.id;
		this.setState(state);
		this.setDetails(this);
		this.setLayers(this);
	},

	render: function () {
		return (
    	<div className="container-fluid" style={Style.container}>
				<div className="row">
					{this.getHeader(this.state)}
					{this.getControls(this.state)}
					{this.getDescription(this.state)}
					<div style={{marginBottom:"25px"}} />
					{this.getFiles(this.state)}
					<div style={{marginBottom:"25px"}} />
					{this.getCode(this.state)}
					<div style={{marginBottom:"25px"}} />
					{this.getTest(this.state)}
				</div>
			</div>
		);
	},

	// Functions that set state
	setDetails: require('./set/details.js'),
	setLayers: require('./set/layers.js'),

	// Functions that get sub-components
	getHeader: require('./get/header.jsx'),
	getControls: require('./get/controls.jsx'),
	getDescription: require('./get/description.jsx'),
	getFiles: require('./get/files.jsx'),
	getCanvas: require('./get/canvas.jsx'),
	getCode: require('./get/code.jsx'),
	getTest: require('./get/test.jsx'),
});

module.exports = Component;
