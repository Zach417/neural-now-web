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
    console.log("get");
    console.log(allAttributes, callback, refresh);
    console.log(this._ignore, this._docs.length);
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
    console.log("getOne");
    console.log(id, allAttributes, callback, refresh);
    console.log(this._ignore, this._docs.length);
    var params = getMetaParams();
    if (allAttributes === true) {
      params = getAllParams();
    }

    if (this._docs.length === 0) {
      ApiService.getOne(id, params, function (doc) {
        this._docs.push(doc);
        return callback(doc);
      }.bind(this));
    } else if (refresh === true) {
      ApiService.getOne(id, params, function (doc) {
        for (var i = 0; i < this._docs.length; i++) {
          if (this._docs[i].name == id) {
            this._docs[i] = doc;
            return callback(doc);
          }
        }
        this._docs.push(doc);
        return callback(doc);
      }.bind(this));
    } else {
      for (var i = 0; i < this._docs.length; i++) {
        if (this._docs[i].name == id) {
          if (allAttributes && this._docs[i].layers) {
            return callback(this._docs[i]);
          } else if (!allAttributes) {
            return callback(this._docs[i]);
          }
        }
      }

      ApiService.getOne(id, params, function (doc) {
        for (var i = 0; i < this._docs.length; i++) {
          if (this._docs[i].name == id) {
            this._docs[i] = doc;
            return callback(doc);
          }
        }
        this._docs.push(doc);
        return callback(doc);
      }.bind(this));
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
