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
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', csrfProtection, (req, res) => {
  res.render('users-login', { title: "Log In", csrfToken: req.csrfToken() });
});

router.post('/login', csrfProtection, logInValidator, asyncHandler( async(req, res) => {
  const { username, password } = req.body;

  let errors = [];

  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
    const user = await db.User.findOne({ where: username });

    if (user !== null) {
      const passwordMatch = await bcrypt.compare(password, user.hashedPassword.toString());
      if (passwordMatch) {
        loginUser(req, res, user);
        return res.redirect('/');
      }
    }

    errors.push('Log-in failed for the provided username and password.');
  } else {
    errors = validatorErrors.array().map((error) => error.msg);
  }

  res.render('users-login', {
    title: 'Log-in',
    email,
    errors,
    csrfToken: req.csrfToken()
  });
}));

router.post('/logout', (req, res) => {
  logoutUser(req, res);
  res.redirect('/login');
});

module.exports = router;
