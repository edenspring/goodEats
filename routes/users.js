var express = require('express');
const csrf = require('csurf');
const bcrypt = require('bcryptjs')

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
  res.render('users-register', {
    title: "Register a new User",
    user,
    csrfToken: req.csrfToken(),
  });
})

router.post('/', csrfProtection, asyncHandler(async(req, res, next)=>{
  const {userName, email, password, confirmedPassworrd} = req.body;

}))

module.exports = router;
