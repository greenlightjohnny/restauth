const router = require("express").Router();
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcryptjs");
require("dotenv").config();

router.post("/register", async (req, res) => {
  ///Validate data submitted before sending to MongoDB
  const { error } = registerValidation(req.body);
  /// Validation component returns an error message if there is one
  if (error) return res.status(400).send(error.details[0].message);

  ///Check to see if the user is already in the MongoDB
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send("Email already registered");

  ////HASH passwords for fun and profit

  const salt = await bcrypt.genSalt(10);

  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });
  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

/////////////////LOGIN
router.post("/login", async (req, res) => {
  ////Validate login info
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  ///Check to make sure the user email is already in the MongoDB
  const user = await User.findOne({ email: req.body.email });
  /////Return message, say "email or password is wrong, so that people can't tell for sure if you have registered for a service by trying to sign up. You might be registered on some kinky sites or something"
  if (!user) return res.status(400).send("Email or password is wronge");

  //////Check if password is correct

  const validPass = await bcrypt.compare(req.body.password, user.password);
  console.log("whatis", user);
  if (!validPass)
    return res.status(400).send("Email or password is incorrectp");

  ////Create and assign a JWT for repeat requests. Yay!
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  console.log("token start", token);

  res.header("auth-token", token).send(token);
});

module.exports = router;
