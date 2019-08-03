const jwt = require('jsonwebtoken');


module.exports = function(req,res,next){
  const verifyToken = req.header('Authorization');
  if(!verifyToken) return res.status(401).send("Access Denied!");
  
  try {
    const verified = jwt.verify(verifyToken, process.env.JWT_SECRETE);
    req.user = verified;
    next()
  } catch (error) {
    res.status(400).send('Invalid Token');
  }
}