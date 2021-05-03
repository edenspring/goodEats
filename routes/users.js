var express = require('express');
const csrf = require('csurf');
const bcrypt = require('bcryptjs')
const {check, validationResult} = require("express-validator")
const {loginUser} = require('../auth')

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
    loginUser(req, res, user)
    res.render('index')
  }
  else {
    const errors = validatorErrors.array().map((e)=>e.msg);

    res.render('users-register', {
      title: "Register a new User",
      user,
      errors,
      csrfToken: req.csrfToken(),
    });
  }
}))

module.exports = router;
