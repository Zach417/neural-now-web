// A little recursive magic to ensure that unnecessary requests
// aren't sent to the server. I should probably decouple this into
// it's own component at some point.

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

function getMetaParams () {
  return "s=_id"
    + "&s=name"
    + "&s=description"
    + "&s=inputType"
    + "&s=outputDescription"
    + "&s=codeExample"
    + "&s=createdBy"
    + "&s=createdOn"
    + "&s=modifiedBy"
    + "&s=modifiedOn";
}

function getAllParams () {
  return getMetaParams() + "&s=layers";
}

module.exports = function(ApiService) {

  this._docs = [];
  this._requests = [];
  this._ignore = false;
  this._refreshed = false;

  this.executeRemainingRequests = function() {
    if (this._requests.length > 0) {
      for (var i = 0; i < this._requests.length; i++) {
        var request = this._requests[i];

        if (request.parameters["id"] && request.parameters["callback"]) {
          request.execute(request.parameters["id"], request.parameters["allAttributes"], request.parameters["callback"]);
        } else if (request.parameters["callback"]) {
          request.execute(request.parameters["allAttributes"], request.parameters["callback"]);
        } else {
          request.execute();
        }
      }

      this._requests = [];
    }
  }

  this.get = function(allAttributes, callback, refresh) {
    var params = getMetaParams();
    if (allAttributes === true) {
      params = getAllParams();
    }

    if (this._refreshed === false || refresh === true) {
      if (this._ignore === true) {
        var parameters = [];
        parameters["allAttributes"] = allAttributes;
        parameters["callback"] = callback;

        return this._requests.push({
          execute: this.get,
          parameters: parameters,
        });
      } else {
        this._ignore = true;
      }

      ApiService.get(params, function(docs) {
        this._ignore = false;
        this._docs = docs;
        this._refreshed = true;
        callback(this._docs);

        this.executeRemainingRequests();
      }.bind(this));
    } else {
      callback(this._docs);
    }
  }.bind(this);

  this.getOne = function(id, allAttributes, callback, refresh) {
    var params = getMetaParams();
    if (allAttributes === true) {
      params = getAllParams();
    }

    if (this._docs.length === 0 || refresh === true) {
      if (this._ignore === true) {
        var parameters = [];
        parameters["id"] = id;
        parameters["allAttributes"] = allAttributes;
        parameters["callback"] = callback;
        return this._requests.push({
          execute: this.getOne,
          parameters: parameters,
        });
      } else {
        this._ignore = true;
      }

      ApiService.get(params, function(docs) {
        this._ignore = false;
        this._docs = [];

        var calledBack = false;

        for (var i = 0; i < this._docs.length; i++) {
          if (this._docs[i].name == id) {
            callback(this._docs[i]);
            calledBack = true;
          }
        }

        if (!calledBack) {
          callback({});
        }

        this.executeRemainingRequests();
      }.bind(this));
    } else {
      var doc;
      for (var i = 0; i < this._docs.length; i++) {
        if (this._docs[i].name == id) {
          doc = this._docs[i];
        }
      }

      if (allAttributes === true && doc && !doc.layers) {
        ApiService.getOne(id, params, function(doc) {
          for (var i = 0; i < this._docs.length; i++) {
            if (this._docs[i].name == id) {
              this._docs[i].layers = doc.layers;
              callback(doc);
            }
          }
        }.bind(this));
      } else {
        for (var i = 0; i < this._docs.length; i++) {
          if (this._docs[i].name == id) {
            return callback(this._docs[i]);
          }
        }
      }
    }
  }.bind(this);

  this.Store = assign({}, EventEmitter.prototype, {
    get: this.get,
    getOne: this.getOne,

    insert: function(doc, callback) {
      ApiService.insert(doc, callback);
    },

    update: function(doc, callback) {
      ApiService.update(doc, callback);
    },

    delete: function(doc, callback) {
      ApiService.delete(doc, callback);
    },

    emitChange: function() {
      this.get(function(docs) {
        this.emit(CHANGE_EVENT);
      }.bind(this), true);
    },

    addChangeListener: function(callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
      this.removeListener(CHANGE_EVENT, callback);
    }
  });

  return this.Store;

}
