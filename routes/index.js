const express = require('express');
const router = express.Router();
const { asyncHandler } = require('./utils');
const { Recipe } = require("../db/models");

/* GET home page. */
router.get('/', asyncHandler(async (req, res) => {
  const recipes = await Recipe.findAll({
    order: [
      ["updatedAt", "DESC"]
    ]
  });
  res.render('home', { title: "GoodEats", recipes });
}));

router.get('/about', asyncHandler(async(req, res) => {
  res.render('about', { title: 'About' });
}));

module.exports = router;
