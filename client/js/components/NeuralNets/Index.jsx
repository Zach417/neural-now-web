var React = require('react');
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;
var Griddle = require('griddle-react');
var Style = require('./Style.jsx');
var NeuralNetCanvas = require('../NeuralNetCanvas/Index.jsx');
var NeuralNetworkStore = require('../../stores/NeuralNetworkStore');

var Component = React.createClass({
	getInitialState: function () {
		return {
			neuralNetworks: []
		}
	},

	componentWillMount: function () {
		NeuralNetworkStore.get(function (neuralNetworks) {
			var state = this.state;
			state.neuralNetworks = neuralNetworks;
			this.setState(state);
		}.bind(this));
	},

	render: function () {
		return (
    	<div className="container-fluid" style={Style.container}>
				<div className="row">
					<div className="col-lg-10 col-xs-12 col-centered">
            <h1>Neural Networks</h1>
					</div>
					<div className="col-lg-10 col-xs-12 col-centered">
						<p>
							Search the zoo! Find all of the neural networks
							that you want to use here.
						</p>
					</div>
					<div className="col-lg-10 col-xs-12 col-centered">
		        <Griddle results={this.getGriddleData()} columns={["Name", "Size"]}
		          resultsPerPage={20} onRowClick={this.handleClick_Row} />
					</div>
				</div>
			</div>
		);
	},

  getGriddleData: function () {
    var result = [];
    for (var i = 0; i < this.state.neuralNetworks.length; i++) {
			var name = this.state.neuralNetworks[i].name;
			var size = 2 + this.state.neuralNetworks[i].hidden.length;
      result.push({
        "Name": name,
				"Size": size,
      });
    }
    return result;
  },

  handleClick_Row: function (gridRow, group) {
    browserHistory.push("/neuralnetwork/" + gridRow.props.data["Name"]);
  },
});

module.exports = Component;
