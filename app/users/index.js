var usersDB = require('./users.db');

exports.getAllUsers = function (req, res) {
    console.log("Getting all users...");
    usersDB.getAllUsers(function(err, data) {
        if (err)
            res.send(err);
        res.json(data);
        console.log(data);
    });
}

exports.getUser = function (req, res) {
    var _id = req.params.userId;
    console.log("Getting user with id : " + _id);
    usersDB.findUserById(_id, function(err, data) {
        if (err)
            res.send(err);
        res.json(data);
        console.log(data);
    });
}

exports.saveUser = function (req, res) {
    var user = req.body;
    console.log("Saving user : " + user);
    usersDB.saveUser(user, function(err, data) {
        if (err)
            res.send(err);
        res.json(data);
        console.log(data);
    });
}

exports.updateUser = function (req, res) {
    var _id = req.params.userId;
    var user = req.body;
    console.log("Updating user with id : " + _id);
    usersDB.updateUser(user, function(err, data) {
        if (err)
            res.send(err);
        res.json(data);
        console.log(data);
    });
}

exports.deleteUser = function (req, res) {
    var _id = req.params.userId;
    var user = req.body;
    console.log("Deleting user with id : " + _id);
    usersDB.deleteUser(user, function(err, data) {
        if (err)
            res.send(err);
        res.json(data);
        console.log(data);
    });
}