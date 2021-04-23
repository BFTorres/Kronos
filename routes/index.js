const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  if (req.loggedInUser) res.redirect('/main'); //!session
  else res.render("index");
});

module.exports = router;
