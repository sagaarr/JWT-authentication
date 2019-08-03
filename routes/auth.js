const router = require('express').Router();
const userModel = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// Validators For data (@Hapi/Joi)
const {
  registerValidation,
  loginValidation
} = require('../validation')


router.post('/register', async (req, res) => {
  // Validation using @Hapi/Joi
  const {
    error
  } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // Check if email already exists 
  const emailExists = await userModel.findOne({
    email: req.body.email
  });
  if (emailExists) return res.status(400).send("Email already exists!");

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new userModel({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword
  });
  try {
    const saveUser = await user.save();
    res.send(saveUser.name);
  } catch (err) {
    res.status(400).send(err)
  }
});

router.post('/login', async (req, res) => {
  /* Validation For login */
  const {
    error
  } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  /* Check if email exists in DB */
  const emailIsThereOrNot = await userModel.findOne({
    email: req.body.email
  });
  if (!emailIsThereOrNot) return res.status(400).send("email does not exists!");

  /* Check if password is correct OR NOT*/
  if (emailIsThereOrNot) {
    const validPassword = await bcrypt.compare(req.body.password, emailIsThereOrNot.password);
    if (!validPassword) return res.status(400).send("Password is incorrect!");
  }
  /* JWT authentication */
  const token = jwt.sign({
    _id: emailIsThereOrNot.id
  }, process.env.JWT_SECRETE, {
    expiresIn: '1h'
  });

  res.header('Authorization', token).send(token);


})



module.exports = router;