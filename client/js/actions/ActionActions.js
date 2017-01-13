var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var Constants = require('../constants/NeuralNetworkConstants.js');

var NeuralNetworkActions = {
	update: function(doc) {
		AppDispatcher.dispatch({
			actionType: Constants.NEURALNETWORK_UPDATE,
			doc: doc
		});
	},
	create: function(doc) {
		AppDispatcher.dispatch({
			actionType: Constants.NEURALNETWORK_CREATE,
			doc: doc
		});
	},
	destroy: function(doc) {
		AppDispatcher.dispatch({
			actionType: Constants.NEURALNETWORK_DESTROY,
			doc: doc
		});
	},
};

module.exports = NeuralNetworkActions;
