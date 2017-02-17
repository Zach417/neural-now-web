var React = require('react');
var Style = require('./Style.jsx');

var Component = React.createClass({
  getInitialState: function () {
    return { loaded: false, games: [] }
  },

	componentWillMount: function () {
		this.setGames(this);
	},

  render: function () {
    return (
    	<div className="container-fluid" style={Style.container}>
				<div className="row">
					{this.getHeader(this.state)}
					<div style={{marginBottom:"15px"}} />
					{this.getGames(this.state)}
				</div>
			</div>
    )
  },

	// Functions that set state
	setGames: require('./set/games.js'),

	// Functions that get sub-components
	getHeader: require('./get/header.jsx'),
	getGames: require('./get/games.jsx'),
});

module.exports = Component;
