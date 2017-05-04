var config = require('../config');
var mongojs = require('mongojs');
var db = mongojs(config.mongoDB.host, ['users']);
 
var users = {
 
    getAllUsers: function(callback) {
        db.users.find(callback);
    },
    saveUser: function(user, callback) {
        db.users.insert(user, callback);
    },
    updateUser: function(user, callback) {
        db.users.update({
            _id: user._id
        }, user, {}, callback);
    },
    deleteUser: function(user, callback) {
        db.users.remove({
            _id: user._id
        }, '', callback);
    },
    findUserByUsername: function(username, callback) {
        db.users.find({
            username: username
        }, function (err, data) {
            console.log("Found users", data);
            extractUser(err, data, callback);
        });
    },
    findUserById: function(id, callback) {
        db.users.find({
            _id: id
        }, function (err, data) {
            console.log("Found users", data);
            extractUser(err, data, callback);
        });
    },
    findUserByFbId: function(id, callback) {
        db.users.find({
            fb: {
                id: id
            }
        }, function (err, data) {
            console.log("Found users", data);
            extractUser(err, data, callback);
        });
    },
    
}

function extractUser (err, data, callback) {
    if (err)
        callback(err, null);
    if (data[0]) {
        callback(null, data[0]);
    } else {
        callback(err, null);
    }
}
 
module.exports = users;