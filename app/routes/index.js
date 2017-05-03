var express = require('express');
var router = express.Router();
 
/* GET home page. */
router.get('/', function(req, res ) {
    res.send('Welcome to Edumate!');
});
 
// users routes
var users = require('../users');
router.route('/users')
    .get(users.getAllUsers);


router.route('/users/:userId')
    .get(users.getUser)
    .put(users.updateUser)
    .delete(users.deleteUser);
 
module.exports = router;