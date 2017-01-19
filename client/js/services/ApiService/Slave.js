var $ = require('jquery');

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

function Slave(storeName) {

    this.root = "http://api.neuralnow.com/" + storeName + "/";
    //this.root = "http://localhost:8080/" + storeName + "/";

    return {
        get: function(callback) {
            $.getJSON({
                url: this.root,
                success: function(data) {
                    callback(data);
                },
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('email', getCookie("email"));
                    xhr.setRequestHeader('access-token', getCookie("accessToken"));
                },
                error: function(xhr, ajaxOptions, thrownError) {
                    console.log("XHR Status:", xhr.status);
                    console.log("Thrown Error:", thrownError);
                }
            });
        }.bind(this),

        getOne: function(id, callback) {
            $.getJSON({
                url: this.root + id,
                success: function(data) {
                    callback(data);
                },
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('email', getCookie("email"));
                    xhr.setRequestHeader('access-token', getCookie("accessToken"));
                },
                error: function(xhr, ajaxOptions, thrownError) {
                    console.log("XHR Status:", xhr.status);
                    console.log("Thrown Error:", thrownError);
                }
            });
        }.bind(this),

        insert: function(doc, callback) {
            $.ajax({
                url: this.root,
                type: 'POST',
                contentType: "application/json",
                data: JSON.stringify(doc),
                dataType: 'json',
                success: function(data) {
                    callback(data);
                },
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('email', getCookie("email"));
                    xhr.setRequestHeader('access-token', getCookie("accessToken"));
                },
                error: function(xhr, ajaxOptions, thrownError) {
                    console.log("XHR Status:", xhr.status);
                    console.log("Thrown Error:", thrownError);
                }
            });
        }.bind(this),

        update: function(doc, callback) {
            $.ajax({
                url: this.root + doc._id,
                type: 'PUT',
                contentType: "application/json",
                data: JSON.stringify(doc),
                dataType: 'json',
                success: function(data) {
                    callback(data);
                },
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('name', doc.name);
                    xhr.setRequestHeader('email', getCookie("email"));
                    xhr.setRequestHeader('access-token', getCookie("accessToken"));
                },
                error: function(xhr, ajaxOptions, thrownError) {
                    console.log("XHR Status:", xhr.status);
                    console.log("Thrown Error:", thrownError);
                }
            });
        }.bind(this),

        delete: function(doc, callback) {
            $.ajax({
                url: this.root + doc._id,
                type: 'DELETE',
                success: function(data) {
                    callback(data);
                },
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('name', doc.name);
                    xhr.setRequestHeader('email', getCookie("email"));
                    xhr.setRequestHeader('access-token', getCookie("accessToken"));
                },
                error: function(xhr, ajaxOptions, thrownError) {
                    console.log("XHR Status:", xhr.status);
                    console.log("Thrown Error:", thrownError);
                }
            });
        }.bind(this),
    }
}

module.exports = Slave;
