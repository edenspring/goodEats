const express = require('express');
const router = express.Router();
const { csrfProtection, asyncHandler } = require('./utils');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../db/models');
const { loginUser, logoutUser } = require('../auth');

const logInValidator = [
  check('username')
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for username."),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for password.")
];

/* GET users listing. */
router.get('/', function (req, res, next) {
  if (req.session.auth) {
    res.redirect("/");
  } else {
    res.redirect("/users/login");
  }
});

router.get('/login', csrfProtection, (req, res) => {
  if (req.session.auth) {
    res.redirect("/");
  } else {
    res.render('users-login', { title: "Log In", csrfToken: req.csrfToken() });
  }
});

router.post('/login', csrfProtection, logInValidator, asyncHandler( async(req, res) => {
  const { username, password } = req.body;

  let errors = [];

  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
    const user = await db.User.findOne({ where: { username } });

    if (user !== null) {
      const passwordMatch = await bcrypt.compare(password, user.hashedPassword.toString());
      if (passwordMatch) {
        console.log("passwords match!")
        loginUser(req, res, user);
        req.session.save(() => res.redirect("/"));
      }
    }

    errors.push('Log-in failed for the provided username and password.');
  } else {
    errors = validatorErrors.array().map((error) => error.msg);
    res.render('users-login', {
      title: 'Log-in',
      username,
      errors,
      csrfToken: req.csrfToken()
    });
  }

}));

router.get('/demo', csrfProtection, asyncHandler(async (req, res) => {
  const username = 'demoguy';
  const user = await db.User.findOne({ where: { username } });
  loginUser(req, res, user)
  req.session.save(() => res.redirect('/'));
}))

router.get('/logout', (req, res) => {
  logoutUser(req, res);
  res.redirect('/');
});

router.get('/register', csrfProtection, (req, res) => {
  if (req.session.auth) {
    res.redirect("/");
  } else {
    const user = db.User.build();
    res.render('users-register', {
      title: "Register a new User",
      user,
      csrfToken: req.csrfToken(),
    });
  }
})


const registerUserValidators = [
  check("username")
    .exists({checkFalsy: true})
    .withMessage("Please provide a username")
    .isLength({max: 35})
    .withMessage("Username cannot be longer than 35 characters")
    .custom((value) =>{
      return  db.User.findOne({where: {username: value}}).then(
        (user) => {
          if (user){
            return Promise.reject("That username is already in use, please choose another");
          }
        }
      )
    }),
  check("email")
    .exists({checkFalsy:true})
    .withMessage("Please provide an email address")
    .isLength({max: 255})
    .withMessage("Email cannot be longer than 255 characters")
    .isEmail()
    .withMessage("Must use a valid email address")
    .custom((value) =>{
      return  db.User.findOne({where: {email: value}}).then(
        (user) => {
          if (user){
            return Promise.reject("That email is already in use, please choose another");
          }
        }
      )
    }),
  check("password")
    .exists({checkFalsy:true})
    .withMessage("Please provide a password")
    .isLength({min:6})
    .withMessage("Password must be at least 6 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, "g")
    .withMessage(
      'Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'
    ),
  check("confirmPassword")
  .exists({checkFalsy:true})
  .withMessage("Please confirm your password")
  .isLength({min:6})
  .withMessage("Password must be at least 6 characters long")
  .custom((value, {req})=>{
    if (value !== req.body.password){
      throw new Error ("Passwords do not match")
    }
    return true;
  })
]

router.post('/register', csrfProtection, registerUserValidators, asyncHandler(async(req, res, next)=>{
  const {username, email, password, confirmPassword} = req.body;
  const user = db.User.build({
    username,
    email,
    hashedPassword : ""
  })

  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
    const hashedPassword = await bcrypt.hash(password, 10);
    user.hashedPassword = hashedPassword;
    await user.save();
    loginUser(req, res, user);
    res.redirect("/");
  }
  else {
    const errors = validatorErrors.array().map((e)=>e.msg);

    res.render('users-register', {
      title: "Register a New User",
      user,
      errors,
      csrfToken: req.csrfToken(),
    });
  }
}))

module.exports = router;
