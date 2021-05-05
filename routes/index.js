const express = require('express');
const router = express.Router();
const { asyncHandler } = require('./utils');

/* GET home page. */
router.get('/', asyncHandler(async (req, res) => {
  res.render('index', { title: 'goodEats' });
}));

module.exports = router;
