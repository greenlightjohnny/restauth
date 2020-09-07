const router = require("express").Router();

router.get("/", async (req, res) => {
  res.json({ posts: { title: "What", description: "Secret data" } });
  //   res.json({ posts: { title: "hello", description: "Arr secrets live here" } });
  //   console.log(json({ posts: { title: "What", description: "Secret data" } }));
});

module.exports = router;
