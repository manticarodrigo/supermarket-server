var config = require('../config');
var mongojs = require('mongojs');
var db = mongojs(config.mongoDB.host, ['users']);
 
var users = {
 
    getAllUsers: function(callback) {
        db.users.find(callback);
    },
    getUser: function(id, callback) {
        db.users.find({
            id: id
        }, callback);
    },
    saveUser: function(user, callback) {
        db.users.insert(user, callback);
    },
    updateUser: function(user, callback) {
        db.user.update({
            id: user.id
        }, user, {}, callback);
    },
    deleteUser: function(id, callback) {
        db.users.remove({
            id: id
        }, '', callback);
    }
}
 
module.exports = users;