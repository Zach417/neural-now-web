var React = require('react');
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;
var Griddle = require('griddle-react');
var NeuralNetwork = require('neural-network').NeuralNetwork;
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
      weightString: '[]',
			neuralNetwork: {
        name: "new-neural-net",
        input: {size: 1, activation: "linear"},
        hidden: [],
        output: {size: 1, activation: "sigmoid"},
        weights: [],
      }
		}
	},

	componentWillMount: function () {
    if (this.props.params && this.props.params.id) {
  		NeuralNetworkStore.getOne(this.props.params.id, function (neuralNetwork) {
  			var state = this.state;
        state.weightString = JSON.stringify(neuralNetwork.weights);
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
							<Form.Label label={"Description"} />
							<Form.TextArea
								value={this.state.neuralNetwork.description}
								attribute="description"
								onChange={this.handleChange_Attribute} />
						</div>
					</div>
				</div>
				<div className="row">
        	{this.getSettings()}
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

	getSettings: function () {
		return (
			<div className="col-lg-10 col-xs-12 col-centered">
				<h3>Parameters</h3>
				<div className="col-md-6 col-xs-12">
					<Form.Label label={"Input Layer Size"} />
					<Form.Input
						value={this.state.neuralNetwork.input.size}
						attribute="input"
						onChange={this.handleChange_Size} />
				</div>
				<div className="col-md-6 col-xs-12">
					<Form.Label label={"Input Activation"} />
					<Form.Select
						value={this.state.neuralNetwork.input.activation}
            options={["linear","sigmoid","hyperbolic-tangent"]}
						attribute="input"
						onChange={this.handleChange_Activation} />
				</div>
				<div className="col-md-6 col-xs-12">
					<Form.Label label={"Output Layer Size"} />
					<Form.Input
						value={this.state.neuralNetwork.output.size}
						attribute="output"
						onChange={this.handleChange_Size} />
				</div>
				<div className="col-md-6 col-xs-12">
					<Form.Label label={"Output Activation"} />
					<Form.Select
						value={this.state.neuralNetwork.output.activation}
            options={["linear","sigmoid","hyperbolic-tangent"]}
						attribute="output"
						onChange={this.handleChange_Activation} />
				</div>
				<div className="col-xs-12">
					<Form.Label label={"Add/Remove Layers"} />
					<Button.Primary label="Add" onClick={this.handleClick_AddHidden} />
					<span> </span>
					<Button.Danger label="Remove" onClick={this.handleClick_RemoveHidden} />
				</div>
				{this.getHiddenLayerInputs()}
        {this.getWeights()}
			</div>
		)
	},

	getHiddenLayerInputs: function () {
		var layers = [];
		for (var i = 0; i < this.state.neuralNetwork.hidden.length; i++) {
			layers.push(
        <div key={i} className="row-fluid">
  				<div className="col-md-6 col-xs-12">
  					<Form.Label label={"Hidden Layer " + (i + 1) + " Size"} />
  					<Form.Input
  						value={this.state.neuralNetwork.hidden[i].size}
  						attribute={i.toString()}
  						onChange={this.handleChange_Hidden_Input} />
  				</div>
          <div className="col-md-6 col-xs-12">
            <Form.Label label={"Hidden Layer " + (i + 1) + " Activation"} />
            <Form.Select
  						value={this.state.neuralNetwork.hidden[i].activation}
  						attribute={i.toString()}
              options={["linear","sigmoid","hyperbolic-tangent"]}
              onChange={this.handleChange_Hidden_Activation} />
      		</div>
        </div>
			);
		}
		return layers;
	},

  getWeights: function () {
    return (
      <div className="col-xs-12">
        <Form.Label label={"Weights"} />
        <Form.TextArea
          value={this.state.weightString}
          onChange={this.handleChange_Weights} />
      </div>
    )
  },

	handleChange_Attribute: function (attribute, value) {
		var state = this.state;
		state.neuralNetwork[attribute] = value;
		this.setState(state);
	},

  handleChange_Weights: function (value) {
    var isJson = true;
    try {
        JSON.parse(value);
    } catch (e) {
        isJson = false;
    }

    if (isJson === true) {
      var state = this.state;
      state.weightString = value;
      state.neuralNetwork.weights = JSON.parse(value);
      this.setState(state);
    } else {
      var state = this.state;
      state.weightString = value;
      this.setState(state);
    }
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

  handleChange_Activation: function (attribute, value) {
    var state = this.state;
    state.neuralNetwork[attribute].activation = value;
    this.setState(state);
  },

	handleChange_Size: function (attribute, value) {
		if (Number(value) > 200) {
			value = "200";
		}

    var neuralNetwork = new NeuralNetwork();
    neuralNetwork.generateFromJson(this.state.neuralNetwork);
		neuralNetwork._id = this.state.neuralNetwork._id;

		if (isNaN(Number(value))) {
			neuralNetwork[attribute].size = 0;
		} else {
			neuralNetwork[attribute].size = Number(value);
		}

    neuralNetwork.weights = [];
    neuralNetwork.generateDendrites();
    neuralNetwork = this.filterNeuralNetwork(neuralNetwork);

    var state = this.state;
    state.neuralNetwork = neuralNetwork;
    state.weightString = JSON.stringify(neuralNetwork.weights);
		this.setState(state);
	},

	handleChange_Hidden_Input: function (attribute, value) {
    var neuralNetwork = new NeuralNetwork();
    neuralNetwork.generateFromJson(this.state.neuralNetwork);
		neuralNetwork._id = this.state.neuralNetwork._id;
    neuralNetwork.weights = [];

  	var i = Number(attribute);
		if (isNaN(Number(value)) && state.neuralNetwork.hidden) {
			neuralNetwork.hidden[i].size = 0;
		} else {
			neuralNetwork.hidden[i].size = Number(value);
		}

    neuralNetwork.generateDendrites();
    neuralNetwork = this.filterNeuralNetwork(neuralNetwork);

    var state = this.state;
    state.neuralNetwork = neuralNetwork;
    state.weightString = JSON.stringify(neuralNetwork.weights);
		this.setState(state);
	},

	handleChange_Hidden_Activation: function (attribute, value) {
  	var i = Number(attribute);
    var state = this.state;
		state.neuralNetwork.hidden[i].activation = value;
		this.setState(state);
	},

	handleClick_AddHidden: function () {
    var neuralNetwork = new NeuralNetwork();
    neuralNetwork.generateFromJson(this.state.neuralNetwork);
    neuralNetwork.weights = [];
		neuralNetwork.addHiddenLayer(3, "sigmoid");
    neuralNetwork.generateDendrites();
    neuralNetwork = this.filterNeuralNetwork(neuralNetwork);

    var state = this.state;
    state.neuralNetwork = neuralNetwork;
    state.weightString = JSON.stringify(neuralNetwork.weights);
		this.setState(state);
	},

  filterNeuralNetwork: function (nn) {
    var neuralNetwork = {
      name: this.state.neuralNetwork.name,
      input: {
        size: nn.input.size,
        activation: nn.input.activationName,
      },
      hidden: [],
      output: {
        size: nn.output.size,
        activation: nn.output.activationName,
      },
      weights: [],
    };

    for (var i = 0; i < nn.hidden.length; i++) {
      neuralNetwork.hidden.push({
        size: nn.hidden[i].size,
        activation: nn.hidden[i].activationName,
      });
    }

    for (var i = 0; i < nn.weights.length; i++) {
      neuralNetwork.weights.push(nn.weights[i].tolist());
    }

		neuralNetwork._id = this.state.neuralNetwork._id;

    return neuralNetwork;
  },

	handleClick_RemoveHidden: function () {
    var neuralNetwork = new NeuralNetwork();
    neuralNetwork.generateFromJson(this.state.neuralNetwork);
		neuralNetwork._id = this.state.neuralNetwork._id;
    neuralNetwork.hidden.splice(neuralNetwork.hidden.length - 1, 1);
    neuralNetwork.weights = [];
    neuralNetwork.generateDendrites();
    neuralNetwork = this.filterNeuralNetwork(neuralNetwork);

    var state = this.state;
    state.neuralNetwork = neuralNetwork;
    state.weightString = JSON.stringify(neuralNetwork.weights);
		this.setState(state);
  }
});

module.exports = Component;
