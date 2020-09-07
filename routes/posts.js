const router = require("express").Router();
const verify = require("./verifyToken");

router.get("/", verify, (req, res) => {
  res.json({ posts: { title: "What", description: "Secret data" } });
  //   res.json({ posts: { title: "hello", description: "Arr secrets live here" } });
  //   console.log(json({ posts: { title: "What", description: "Secret data" } }));
});

module.exports = router;
