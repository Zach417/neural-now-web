var React = require('react');
var Link = require('react-router').Link;
var Style = require('./Style.jsx');
var Jumbotron = require('./Jumbotron.jsx');
var NeuralNetCanvas = require('../NeuralNetCanvas/Index.jsx');
var NeuralNetCode = require('../NeuralNetCode/Index.jsx');
var NeuralNetTest = require('../NeuralNetTest/Index.jsx');
var NeuralNetworkStore = require('../../stores/NeuralNetworkStore');

var Component = React.createClass({
	getInitialState: function () {
		return {
			neuralNetwork: {
        name: "math-sine",
        layers: [],
      }
		}
	},

	componentWillMount: function () {
		this.setNeuralNetworkDetails();
		this.setNeuralNetworkLayers();
	},

  componentDidMount: function () {
    Prism.highlightAll();
  },

  render: function(){
    return (
    	<div className="container-fluid" style={Style.container}>
	    	<div className="row">
          <div className="col-lg-10 col-xs-12 col-centered">
            <h1>{"Deploy someone else's neural network"}</h1>
            <h3>
              {"Search for models that meet your needs and "}
              {"use them for free!"}
            </h3>
          </div>
        	<div className="col-lg-10 col-xs-12 col-centered">
        		<NeuralNetCanvas neuralNetwork={this.state.neuralNetwork} />
        	</div>
          <div className="col-xs-12" style={{paddingBottom:"15px"}} />
        </div>
        <div className="row" style={{backgroundColor: "#1487BF", color: "white"}}>
          <div className="col-xs-12" style={{paddingTop:"15px"}} />
        	<div className="col-lg-10 col-xs-12 col-centered">
            <h3>{"Get up and running quickly with npm.js"}</h3>
            <p>
              {"NeuralNow.get() is all you need to deploy any "}
              {"of the our most powerful neural networks. "}
            </p>
          </div>
          <div className="col-lg-10 col-xs-12 col-centered">
            <NeuralNetCode neuralNetwork={this.state.neuralNetwork} />
          </div>
          <div className="col-xs-12" style={{paddingBottom:"15px"}} />
        </div>
        <div className="row">
          <div className="col-lg-10 col-xs-12 col-centered">
            <h3>{"You can even test them out here on this website!"}</h3>
            <p>{"Type in [3.14] below to test out the neural network 'sine'"}</p>
          </div>
					<div className="col-lg-10 col-xs-12 col-centered">
						<NeuralNetTest neuralNetwork={this.state.neuralNetwork} />
					</div>
          <div className="col-xs-12" style={{paddingBottom:"45px"}} />
	      </div>
        <Jumbotron />
			</div>
    );
  },

	setNeuralNetworkDetails: function () {
		var success = function (neuralNetwork) {
			var state = this.state;
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
			state.neuralNetwork.layers = neuralNetwork.layers;
			this.setState(state);
		}.bind(this);

		NeuralNetworkStore.getOne({
			id: this.state.neuralNetwork.name,
			params: "s=layers",
			success: success,
		});
	},
});

module.exports = Component;
