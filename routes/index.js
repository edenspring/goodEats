const express = require('express');
const router = express.Router();
const { asyncHandler } = require('./utils');
const { Recipe, Picture, RecipeBox } = require("../db/models");

/* GET home page. */
router.get('/', asyncHandler(async (req, res) => {
  const recipes = await Recipe.findAll({
    include: { model: Picture },
    order: [
      ["updatedAt", "DESC"]
    ],
    limit: 10
  });
  const boxes = await RecipeBox.findAll({
    include: {
      model: Recipe,
      include: {
        model: Picture
      }
    },
    order: [
      ["updatedAt", "DESC"]
    ],
    limit: 10
  })
  res.render('home', { title: "GoodEats", recipes, boxes });
}));

router.get('/about', asyncHandler(async(req, res) => {
  res.render('about', { title: 'About' });
}));

module.exports = router;
