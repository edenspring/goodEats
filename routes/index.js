const express = require('express');
const router = express.Router();
const { asyncHandler } = require('./utils');
const { Recipe, Picture } = require("../db/models");

/* GET home page. */
router.get('/', asyncHandler(async (req, res) => {
  const recipes = await Recipe.findAll({
    include: { model: Picture },
    order: [
      ["updatedAt", "DESC"]
    ]
  });
  // console.log(recipes[0].Pictures[0].dataValues.src);
  res.render('home', { title: "GoodEats", recipes });
}));

router.get('/about', asyncHandler(async(req, res) => {
  res.render('about', { title: 'About' });
}));

module.exports = router;
