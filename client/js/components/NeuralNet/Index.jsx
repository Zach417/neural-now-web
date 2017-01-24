var React = require('react');
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;
var Griddle = require('griddle-react');
var Style = require('./Style.jsx');
var Form = require('../Form/Index.jsx');
var Button = require('../Button/Index.jsx');
var NeuralNetCanvas = require('../NeuralNetCanvas/Index.jsx');
var NeuralNetCode = require('../NeuralNetCode/Index.jsx');
var NeuralNetTest = require('../NeuralNetTest/Index.jsx');
var NeuralNetworkStore = require('../../stores/NeuralNetworkStore');

var Component = React.createClass({
	getInitialState: function () {
		return {
			neuralNetwork: {
        name: "Loading...",
        layers: [],
      }
		}
	},

	componentWillMount: function () {
		NeuralNetworkStore.getOne(this.props.params.id, function (neuralNetwork) {
			var state = this.state;
			state.neuralNetwork = neuralNetwork;
			this.setState(state);
		}.bind(this));
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
              {this.state.neuralNetwork.name}
            </h1>
						<p>{this.state.neuralNetwork.description}</p>
					</div>
					{this.getControls()}
        	<div className="col-lg-10 col-xs-12 col-centered">
        		<NeuralNetCanvas name={this.state.neuralNetwork.name} />
						<div style={{marginBottom: "25px"}} />
        	</div>
          <div className="col-lg-10 col-xs-12 col-centered">
		        <p>
		          {"This is how you can use this neural network in your project"}
		        </p>
            <NeuralNetCode name={this.state.neuralNetwork.name} />
						<div style={{marginBottom: "25px"}} />
          </div>
					<div className="col-lg-10 col-xs-12 col-centered">
		        <p>
		          {"You can test out this neural network by inserting "}
							{"the appropriate input below and clicking \"Run\""}
		        </p>
						<NeuralNetTest name={this.state.neuralNetwork.name} />
					</div>
				</div>
			</div>
		);
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

	handleClick_Edit: function () {
		browserHistory.push("/neuralnetwork/" + this.props.params.id + "/edit");
	},

	handleClick_Back: function () {
		browserHistory.push("/neuralnetwork");
	},
});

module.exports = Component;
