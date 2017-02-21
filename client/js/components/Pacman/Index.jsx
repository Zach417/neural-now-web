var React = require('react');
var $ = require('jquery');
var Style = require('./Style.jsx');
var DeepQLearn = require('./deepqlearn.js');

var Component = React.createClass({
  getInitialState: function () {
    return {
      loaded: false,
      model: '',
      error: '',
      brain: {},
      type: "training",
      action: 0,
      score: 0,
      reward: 0,
      generation: 0,
    }
  },

  componentWillMount: function () {
    var state = this.state;
    state.model = require('./defaultmodel');
    this.setState(state);
  },

  render: function () {
    return (
    	<div className="container-fluid" style={Style.container}>
				<div className="row">
					{this.getHeader(this.state)}
					<div style={{marginBottom:"15px"}} />
          <div className="col-lg-10 col-xs-12 col-centered">
            <div className="row">
	            {this.getGame(this.state)}
  		        {this.getModel(this.state, this.handleEvent_Model)}
  		        {this.getError(this.state)}
  		        {this.getControls(this.state, this.handleEvent_Controls)}
              <div style={{marginBottom:"15px"}} className="col-lg-6 col-xs-12" />
              {this.getOutput(this.state)}
            </div>
          </div>
				</div>
			</div>
    )
  },

	// Functions that get sub-components
	getHeader: require('./get/header.jsx'),
	getGame: require('./get/game.jsx'),
	getError: require('./get/error.jsx'),
	getModel: require('./get/model.jsx'),
	getControls: require('./get/controls.jsx'),
	getOutput: require('./get/output.jsx'),

	// Functions that handle events from sub-components
	handleEvent_Model: function (value) {
		require('./handle/model.js') (value, this)
	},

	handleEvent_Controls: function (e, value) {
    if (e == "handleClick_Apply") {
		  require('./handle/handleClick_Apply.js') (value, this)
    } else if (e == "handleClick_Run") {
		  require('./handle/handleClick_Run.js') (value, this)
    } else if (e == "handleClick_Pause") {
		  require('./handle/handleClick_Pause.js') (value, this)
    } else if (e == "handleChange_Type") {
		  require('./handle/handleChange_Type.js') (value, this)
    }
	},
});

module.exports = Component;
