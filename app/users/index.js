var usersDB = require('./users.db');

exports.getAllUsers = function (req, res) {
    console.log("Getting all users...");
    usersDB.getAllUsers(function(err, data) {
        if (err)
            res.send(err);
        res.json(data);
    });
}

exports.getUser = function (req, res) {
    var id = req.body;
    console.log("Getting user with id : " + id);
    usersDB.getUser(id, function(err, data) {
        if (err)
            res.send(err);
        res.json(data);
    });
}

exports.saveUser = function (req, res) {
    var user = req.body;
    console.log("Saving user with id : " + user.id);
    usersDB.saveUser(user, function(err, data) {
        if (err)
            res.send(err);
        res.json(data);
    });
}

exports.updateUser = function (req, res) {
    var user = req.body;
    console.log("Updating user with id : " + user.id);
    usersDB.updateUser(user, function(err, data) {
        if (err)
            res.send(err);
        res.json(data);
    });
}

exports.deleteUser = function (req, res) {
    var user = req.body;
    console.log("Deleting user with id : " + user.id);
    usersDB.deleteUser(user, function(err, data) {
        if (err)
            res.send(err);
        res.json(data);
    });
}