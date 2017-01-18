var React = require('react');
var Link = require('react-router').Link;
var Style = require('./Style.jsx');
var NeuralNets = require('../NeuralNets/Index.jsx');
var NeuralNetCanvas = require('../NeuralNetCanvas/Index.jsx');
var NeuralNetCode = require('../NeuralNetCode/Index.jsx');
var NeuralNetTest = require('../NeuralNetTest/Index.jsx');
var NeuralNetworkStore = require('../../stores/NeuralNetworkStore');

var Component = React.createClass({
  componentDidMount: function () {
    Prism.highlightAll();
  },

  render: function(){
    return (
    	<div className="container-fluid" style={Style.container}>
        <div className="row">
          <NeuralNets />
        </div>
			</div>
    );
  },
});

module.exports = Component;
