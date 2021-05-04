const express = require('express');
const router = express.Router();
const { asyncHandler, handleValidationErrors } = require('./utils');
const { check, validationResult } = require('express-validator');
const { Ingredient, Instruction, Like, Recipe, RecipeBox, Review, User } = require('../db/models');


router.post('/', asyncHandler(async (req, res) => {
    console.log(req.body);
    const { name, measurements, recipeId } = req.body
    console.log("recipe id: ", recipeId);
    await Ingredient.create({
      name,
      measurements,
      recipeId
    })
    res.redirect(`/recipes/${recipeId}/edit`);
  }))


module.exports = router;
