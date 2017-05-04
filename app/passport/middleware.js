function authenticationMiddleware () {  
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/')
    console.log("No auth");
  }
}

module.exports = authenticationMiddleware;