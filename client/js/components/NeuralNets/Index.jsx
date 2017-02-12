var React = require('react');
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;
var Griddle = require('griddle-react');
var Style = require('./Style.jsx');
var Button = require('../Button/Index.jsx');
var NeuralNetCanvas = require('../NeuralNetCanvas/Index.jsx');
var NeuralNetworkStore = require('../../stores/NeuralNetworkStore');

var Component = React.createClass({
	getInitialState: function () {
		return {
			loaded: false,
			neuralNetworks: []
		}
	},

	componentWillMount: function () {
		var success = function (neuralNetworks) {
			var state = this.state;
			state.loaded = true;
			state.neuralNetworks = neuralNetworks;
			this.setState(state);
		}.bind(this);

		NeuralNetworkStore.get({
			refresh: true,
			params: "s=name&s=description&s=inputType",
			success: success,
		});
	},

	render: function () {
		return (
    	<div className="container-fluid" style={Style.container}>
				<div className="row">
					<div className="col-lg-10 col-xs-12 col-centered">
            <h1>Neural Networks</h1>
						<p>
							Welcome to the zoo! Find all of the neural networks
							that you want to use here.
						</p>
					</div>
					<div className="col-lg-10 col-xs-12 col-centered">
						<Button.Primary label={"New Neural Network"} onClick={this.handleClick_New} />
						<div style={{marginBottom:"15px"}} />
					</div>
					{this.getSearchComponent()}
				</div>
			</div>
		);
	},

	getSearchComponent: function () {
		var loaded = this.state.loaded;
		if (loaded) {
			return (
				<div className="col-lg-10 col-xs-12 col-centered">
					<Griddle
						results={this.getGriddleData()}
						columns={["Name", "Type", "Description"]}
						resultsPerPage={20}
						onRowClick={this.handleClick_Row} />
				</div>
			)
		}

		return (
			<div className="col-lg-10 col-xs-12 col-centered">
				{"Loading neural networks..."}
			</div>
		)
	},

  getGriddleData: function () {
    var result = [];
    for (var i = 0; i < this.state.neuralNetworks.length; i++) {
			var name = this.state.neuralNetworks[i].name;
			var description = this.state.neuralNetworks[i].description;
			var inputType = this.state.neuralNetworks[i].inputType;
      result.push({
        "Name": name,
				"Type": inputType,
				"Description": description
      });
    }
    return result;
  },

	handleClick_New: function () {
    browserHistory.push("/neuralnetwork/new");
	},

  handleClick_Row: function (gridRow, group) {
    browserHistory.push("/neuralnetwork/" + gridRow.props.data["Name"]);
  },
});

module.exports = Component;
