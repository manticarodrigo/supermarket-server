var mongojs = require('mongojs');
var db = mongojs('mongodb://127.0.0.1:27017/edumate', ['todos']);
 
var todos = {
 
    getAllTodos: function(callback) {
        db.todos.find(callback);
    },
    saveTodo: function(todo, callback) {
        db.todos.insert(todo, callback);
    },
    updateTodos: function(todo, callback) {
        db.todo.update({
            id: todo.id
        }, todo, {}, callback);
    },
    deleteTodo: function(id, callback) {
        db.todos.remove({
            id: id
        }, '', callback);
    }
}
 
module.exports = todos;