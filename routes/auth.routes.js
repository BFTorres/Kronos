const router = require("express").Router();
const bcrypt = require("bcryptjs");
const UserModel = require("../models/User.model");
const TaskModel = require("../models/Task.model");

// !!!Manager = Admin, User = Staff

departments = [
  "FrontOffice",
  "Administration",
  "Sales",
  "FoodsBeverage",
  "Housekeeping",
  "Engineering",
  "HumanRessources",
];

// Validation
const validateEmpty = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.render("auth/signup.hbs", { msg: "Please fill all the fields !" });
  } else {
    next();
  }
};

//** ROUTES SIGNUP**/

// get signup
router.get("/signup", (req, res) => {
  res.render("auth/signup", { departments });
});

//* post signup  *//
router.post("/signup", validateEmpty, (req, res, next) => {
  const { username, password, department, userType } = req.body;

  // password encryption
  let regexPw = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
  if (!regexPw.test(password)) {
    res.render("auth/signup.hbs", {
      departments,
      msg:
        "Password must be 6 characters long, must have a number, and an uppercase Letter",
    });
    return;
  }
  let salt = bcrypt.genSaltSync(12);
  let hash = bcrypt.hashSync(password, salt);
  UserModel.findOne({ username: username })
    .then((user) => {
      if (user) {
        res.render("auth/signup", { departments, msg: "username is taken" });
      } else {
        UserModel.create({ username, password: hash, department, userType })
          .then(() => {
            res.redirect("/");
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
});

// PRIVATE ROUTES

const authorize = (req, res, next) => {
  console.log("See I'm here");
  if (req.session.loggedInUser) {
    next();
  } else {
    res.redirect("/login");
  }
};

router.get("/main", (req, res, next) => {
  let user = req.session.loggedInUser; //!session
  let manager = false;
  let staff = false;
  if (user && user.userType == "Manager") {
    manager = true;
  } else if (user && user.userType == "Staff") {
    staff = true;
  }
  res.render("auth/main.hbs", { manager, staff });
});

router.get("/staff", (req, res) => {
  let user = req.session.loggedInUser;
  //let signupDate = req.session.loggedInUser;
  res.render("auth/staff-profile.hbs");
});

router.get("/manager", (req, res, next) => {
  let user = req.session.loggedInUser;
  res.render("auth/manager-profile.hbs");
});

// POST ROUTES

//* POST Login credentials *//
router.post("/login", validateEmpty, (req, res, next) => {
  const { username, password } = req.body;

  UserModel.findOne({ username })
    .then((user) => {
      if (!user) {
        res.render("index", {
          msg: "Username or Password incorrect!",
        });
      } else {
        // check if password is correct
        bcrypt.compare(password, user.password).then((isMatching) => {
          if (isMatching) {
            req.app.locals.isUserLoggedIn = true;
            req.session.loggedInUser = user;
            res.redirect("/main");
          } else {
            res.render("index.hbs", {
              msg: "Username or Password incorrect!",
            });
          }
        });
      }
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/logout", (req, res, next) => {
  req.app.locals.isUserLoggedIn = false;
  req.session.destroy();
  res.redirect("/");
});

// !change password?

// !delete user?

module.exports = router;
