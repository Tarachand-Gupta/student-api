// const queryHandler = require('./../handlers/query-handler');
// const CONSTANTS = require('./../config/constants');

const router = require("express").Router();
let UserCollection = require("../model/user.model");
let CollegeCollection = require("../model/College.model");
let TeacherCollection = require("../model/Teacher.model");

console.log("auth.js  called !!");

router.route("/login").post(async (req, res) => {
  console.log("login request.body => " + JSON.stringify(req.body));
  const username = req.body.username;

  // const newUser = new User({ username });

  UserCollection.findOne({ firstname: username })
    .select(["-password", "-passwordKey", "-createdOn"])
    .then((user) => {
      //   const token = JWT.createToken(user);
      //need to add token to the res-
      res.json(user);
    })
    .catch((err) => {
      console.log("catch in /auth/login" + err);
      // res.send('error: ' + err)
    });
});
router.route("/teacherlogin").post((req, res) => {
  console.log("teacherlogin request.body => " + JSON.stringify(req.body));
  const username = req.body.username;

  // const newUser = new User({ username });

  TeacherCollection.findOne({ firstname: username })
    .then((user) => {
      res.json(user);
      console.log(" teacherlogin response => ", user);
    })
    .catch((err) => {
      console.log("catch in /auth/teacherlogin" + err);
      // res.send('error: ' + err)
    });
});

router.route("/collegelogin").post((req, res) => {
  console.log("\n collegelogin request.body => " + JSON.stringify(req.body));
  const collegecode = req.body.collegecode;

  // const newUser = new User({ username });

  CollegeCollection.findOne({ collegecode: collegecode })
    .then((college) => res.json(college))
    .catch((err) => {
      console.log("\n catch in /auth/collegelogin" + err);
      // res.send('error: ' + err)
    });
});

router.route("/usersignup").post((req, res) => {
  console.log("\n usersignup request.body => " + JSON.stringify(req.body));
  const data = req.body;

  UserCollection.save(data)
    .then((response) => res.json(response))
    .catch((err) => {
      console.log("\n catch in /auth/usersignup" + err);
      // res.send('error: ' + err)
    });
});

module.exports = router;
