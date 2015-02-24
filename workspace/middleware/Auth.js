module.exports = {
  is: function(role) {
    return function(req,res,next) {
      var auth_header = req.get('Authorization');
      if(!auth_header) {
        if(role==='ANONYMOUS') next();
        var err = new Error('User must be authenticated');
        err.status = 401;
        next(err)
      } else if(auth_header===role) {
        next();
      } else if(auth_header==='ADMIN') {
        next();
      } else {
        var err = new Error('User is not authorized');
        err.status = 403;
        next(err);
      }
    }
  }
}
