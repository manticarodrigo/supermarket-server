var mongo = require('mongodb').MongoClient;
var mongojs = require('mongojs');
var db = mongojs('mongodb://127.0.0.1:27017/edumate', ['chats']);
 
var chats = {
 
    fetchChatsFor: function(user, callback) {
        db.chats.find({"users": ObjectId(user.id)}, callback);
    },
    chatWith: function(user, callback) {
        // TODO: Create separate participants table
        const chat = 
        db.chats.insert(user, callback);
        
    },
    updateUsers: function(user, callback) {
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