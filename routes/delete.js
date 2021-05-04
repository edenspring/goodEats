const express = require('express');
const router = express.Router();
const { asyncHandler } = require('./utils');
const { Ingredient, Instruction, Like, Recipe, RecipeBox, Review, User } = require('../db/models');

router.post("/", asyncHandler(async (req, res, next) => {
    const recipeId = parseInt(req.body.recipeId, 10);
    const recipe = await Recipe.findByPk(recipeId);
    if (recipe) {
        const ingredients = await Ingredient.findAll({
            where: {
                recipeId: recipeId
            },
        });
        const instructions = await Instruction.findAll({
            where: {
                recipeId: recipeId
            },
            order: [
                ['listOrder', 'ASC']
            ]
        });
        instructions.forEach(async (instruction) => {
            await instruction.destroy();
        })
        ingredients.forEach(async (ingredient) => {
            await ingredient.destroy();
        })
        await recipe.destroy();
        res.redirect("/");
    } else {
        next(recipeNotFoundError(recipeId));
    }
}))

module.exports = router;
