var React = require('react');
var Style = require('./Style.jsx');

var Component = React.createClass({
	getInitialState: function () {
		return { loaded: false, models: [], search: '' }
	},

	componentWillMount: function () {
		this.setDetails(this);
	},

	render: function () {
		return (
    	<div className="container-fluid" style={Style.container}>
				<div className="row">
					{this.getHeader(this.state)}
					{this.getControls(this.state, this.handleSearch)}
					<div style={{marginBottom:"15px"}} />
					{this.getModels(this.state)}
				</div>
			</div>
		);
	},

	// Functions that set state
	setDetails: require('./set/details.js'),

	// Functions that get sub-components
	getControls: require('./get/controls.jsx'),
	getHeader: require('./get/header.jsx'),
	getModels: require('./get/models.jsx'),

	// Functions that handle events from sub-components
	handleSearch: function (value) {
		require('./handle/search.js') (value, this)
	},
});

module.exports = Component;
