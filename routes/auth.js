const router = require("express").Router();

router.post("/register", (req, res) => {
  res.send(
    "Register, displays when the /register path is hit with an http post method"
  );
});

module.exports = router;
