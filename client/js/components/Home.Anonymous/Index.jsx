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
            <h1>{"Explore pre-trained, deep neural networks"}</h1>
            <h3>
              {"Models from published, peer-reviewed papers \
								as well as other meaningful networks"}
            </h3>
          </div>
        	<div className="col-lg-10 col-xs-12 col-centered">
        		<NeuralNetCanvas neuralNetwork={this.state.neuralNetwork} />
						<div style={{color:"#999",fontStyle:"italic"}}>
							{"This simple model approximates \
								the trigonometric function, sine."}
						</div>
        	</div>
          <div className="col-xs-12" style={{paddingBottom:"15px"}} />
        </div>
        <div className="row" style={{backgroundColor: "#1487BF", color: "white"}}>
          <div className="col-xs-12" style={{paddingTop:"15px"}} />
        	<div className="col-lg-10 col-xs-12 col-centered">
            <h3>
							{"Models are accessible via a web API \
								cuz why not"}
						</h3>
            <p>
              {"Make requests to api.neuralnow.com or use the \
								npm package"}
            </p>
          </div>
          <div className="col-lg-10 col-xs-12 col-centered">
            <NeuralNetCode neuralNetwork={this.state.neuralNetwork} />
          </div>
          <div className="col-xs-12" style={{paddingBottom:"15px"}} />
        </div>
        <div className="row">
          <div className="col-lg-10 col-xs-12 col-centered">
            <h3>{"Test everything out in the playground area"}</h3>
            <p>
							{"Type in [3.14] below to test out the neural \
								network 'math-sine'"}
						</p>
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
