var config = require('../config');
var mongojs = require('mongojs');
var db = mongojs(config.mongoDB.host, ['users']);
 
var users = {
 
    getAllUsers: function(callback) {
        db.users.find(callback);
    },
    findUser: function(input, callback) {
        Promise.all([
            queryPromise({username: input.username}),
            queryPromise({id: input.id})
        ]).then(function(result) {
            // result is an array of responses here
            callback(result[0] || result[1]);
        }).catch(function(err) {
            console.log(err);
            callback(null);
        });
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
        db.users.update({
            id: user.id
        }, user, {}, callback);
    },
    deleteUser: function(_id, callback) {
        db.users.remove({
            id: id
        }, '', callback);
    }
    
}

function queryPromise(query) {
    return new Promise(function(resolve, reject) {
        db.users.find(query, function(err, resp) {
            if (err) {
                reject(err);
            } else {
                resolve(resp);
            }
        });
    })
}
 
module.exports = users;