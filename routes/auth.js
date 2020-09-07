const router = require("express").Router();
const User = require("../model/User");
const { registerValidation, login } = require("../validation");

router.post("/register", async (req, res) => {
  ///Validate data submitted before sending to MongoDB
  const { error } = registerValidation(req.body);
  /// Validation component returns an error message if there is one
  if (error) return res.status(400).send(error.details[0].message);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const savedUser = await user.save();
    console.log("auth saved user", savedUser);
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
