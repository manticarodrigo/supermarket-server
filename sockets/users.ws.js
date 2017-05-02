var usersDB = require('./users.db');
module.exports = function(io) {
 
    var users = io.of('/users');
 
    users.on('connection', function(socket) {
 
        socket.on('getAllUsers', function() {
            dispatchAll(socket);
        });
 
        socket.on('saveTodo', function(todo) {
            console.log("Saving todo : " + todo.name);
            usersDB.saveTodo(todo, function(err, data) {
                if (err) throw err; // You can emit the error to a socket	
                dispatchAll(socket);
            });
        });
 
        socket.on('updateTodo', function(data) {
            usersDB.updateTodo(data, function(err, data) {
                if (err) throw err; // You can emit the error to a socket 
                dispatchAll(socket);
            });
        });
        
        socket.on('deleteTodo', function(data) {
            usersDB.deleteTodo(data.id, function(err, data) {
                if (err) throw err; // You can emit the error to a socket 
                dispatchAll(socket);
            });
        });
 
        // On connection send all the users, to save one round trip
        dispatchAll(socket);
    });
 
 
    function dispatchAll(socket) {
        console.log("Dispatching users...");
        usersDB.getAllUsers(function(err, data) {
            if (err) throw err; // You can emit the error to a socket 
            io.of('/users').emit('allUsers', data);
        });
    }
 
    return users;
}