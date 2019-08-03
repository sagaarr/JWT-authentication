router = require('express').Router();
const user = require('../model/User');
const verify = require('../_authentication-middleware/auth');



router.get('/',verify, (req,res) => {
  res.json({name:"mera naam sagar hai sagar bhai !!!!.... Bhool neka nai !"})



})





module.exports = router;
