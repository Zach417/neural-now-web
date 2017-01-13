var StoreTemplate = require('./Template');
var ApiService = require('../services/ApiService');
var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var Constants = require('../constants/ActionConstants.js');

var Store = new StoreTemplate(ApiService.NeuralNetwork);

AppDispatcher.register(function(action) {
	switch(action.actionType) {
		case Constants.NEURALNETWORK_UPDATE:
			Store.update(action.doc, function(data) {
				Store.emitChange();
			});
			break;
		case Constants.NEURALNETWORK_CREATE:
			Store.insert(action.doc, function(data) {
				Store.emitChange();
			});
			break;
		case Constants.NEURALNETWORK_DESTROY:
			Store.delete(action.doc, function(data) {
				Store.emitChange();
			});
			break;
	}
});

module.exports = Store;
