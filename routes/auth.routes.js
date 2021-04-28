const router = require("express").Router();
const bcrypt = require("bcryptjs");
const UserModel = require("../models/User.model");
const TaskModel = require("../models/Task.model");

// !!!Manager = Admin, User = Staff
let manager = false;
let staff = false;
departments = [
  "FrontOffice",
  "Administration",
  "Sales",
  "FoodsBeverage",
  "Housekeeping",
  "Engineering",
  "HumanRessources",
];
let isTodo = false, isInProgres = false, isDone = false;

// Validation
// const validateEmpty = (req, res, next) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     res.render("auth/signup.hbs", { msg: "Please fill all the fields !" });
//   } else {
//     next();
//   }
// };

//** ROUTES SIGNUP**/

// get signup
router.get("/signup", (req, res) => {
  res.render("auth/signup", { departments });
});

//* post signup  *//
router.post("/signup", (req, res, next) => {
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

  if (req.session.loggedInUser) {
    next();
  } else {
    res.redirect("/");
  }
};
const userType = (req, res, next) => {
  let user = req.session.loggedInUser; //!session
  if (user && user.userType == "Manager") {
    manager = true;
    next()
  } else if (user && user.userType == "Staff") {
    staff = true;
    next()
  }
}
router.get("/main", userType, (req, res, next) => {
  let user = req.session.loggedInUser;
  res.render("auth/main.hbs", { manager, staff, user });
});



router.get("/staff", (req, res) => {

  let user = req.session.loggedInUser;

  TaskModel.find()
    .populate('asingedTo')
    .then((tasks) => {
      let doneTasks = [], pending = [], todo = []
      for (let i = 0; i < tasks.length; i++) {

        if (tasks[i].asignedTo == user._id) {
          if (tasks[i].status == "In Progres") {
            isInProgres = true
            pending.push(tasks[i])
          } else if (tasks[i].status == "Done") {
            isDone = true
            doneTasks.push(tasks[i])
          } else {
            isTodo = true
            todo.push(tasks[i])
          }
        }
      }
      res.render("auth/staff-profile.hbs", { manager, user, todo, isTodo, isInProgres, isDone, pending, doneTasks });
    })
    .catch((err) => {
      console.log(err)
    });

});

router.get("/manager", userType, (req, res, next) => {
  let user = req.session.loggedInUser;
  if (user.userType != "Manager") {
    res.redirect('/staff')
  }
  TaskModel.find()
    .then((tasks) => {
      let doneTasks = [], pending = [], todo = []
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].status == "In Progres") {
          isInProgres = true
          pending.push(tasks[i])
        } else if (tasks[i].status == "Done") {
          isDone = true
          doneTasks.push(tasks[i])
        } else {
          isTodo = true
          todo.push(tasks[i])
        }
      }
      res.render("auth/manager-profile.hbs", { manager, user, todo, isTodo, isInProgres, isDone, pending, doneTasks });
    })
    .catch((err) => {
      console.log(err)
    });

});

// POST ROUTES

//* POST Login credentials *//
// login 
router.post("/login", (req, res, next) => {
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
            res.redirect("/main")
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
router.get("/test", (req, res, next) => {

  // let user = req.session.loggedInUser;
  TaskModel.find()
    .then((tasks) => {

      res.render("test.hbs", { tasks });
    })
    .catch((err) => {
      console.log(err)
    });

});
module.exports = router;
