const router = require("express").Router();
const User = require("../model/User");
const Joi = require(`@hapi/joi`);

//Validation!!! YEES
const schema = Joi.object({
  name: Joi.string().min(6).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});
router.post("/register", async (req, res) => {
  ///Validate data submitted before sending to MongoDB
  const validation = schema.validate(req.body);

  res.send(validation);
  console.log(validation);

  //   const user = new User({
  //     name: req.body.name,
  //     email: req.body.email,
  //     password: req.body.password,
  //   });
  //   try {
  //     const savedUser = await user.save();
  //     console.log('auth saved user', savedUser)
  //     res.send(savedUser);
  //   } catch (err) {
  //     res.status(400).send(err);
  //   }
});

module.exports = router;
