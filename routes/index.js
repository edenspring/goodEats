const express = require('express');
const router = express.Router();
const { asyncHandler } = require('./utils');

/* GET home page. */
router.get('/', asyncHandler(async (req, res) => {
  res.render('index', { title: 'goodEats' });
}));

router.get('/about', asyncHandler(async(req, res) => {
  res.render('about', { title: 'About' });
}));

module.exports = router;
