var express = require('express');
const csrf = require('csurf');
const bcrypt = require('bcryptjs')
const {check, validationResult} = require("express-validators")

const db = require('../db/models')
const csrfProtection = csrf({ cookie: true });
const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

var router = express.Router();



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', (req, res) => {
  res.render('users-login');
});

router.get('/register', csrfProtection, (req, res) => {
  const user = db.User.build();
  res.render('users-register', {
    title: "Register a new User",
    user,
    csrfToken: req.csrfToken(),
  });
})


router.post('/register', csrfProtection, asyncHandler(async(req, res, next)=>{
  const {username, email, password, confirmPassword} = req.body;
  const user = db.User.build({
    username,
    email,
    hashedPassword : ""
  })
  if (password === confirmPassword) {
    const hashedPassword = await bcrypt.hash(password, 10);
    user.hashedPassword = hashedPassword;
    await user.save();
    res.render('index')
  }
  else {
    res.render('users-register', {
      title: "Register a new User",
      user,
      csrfToken: req.csrfToken(),
    });
  }
}))

module.exports = router;
