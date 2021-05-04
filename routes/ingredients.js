const express = require('express');
const router = express.Router();
const { asyncHandler, handleValidationErrors } = require('./utils');
const { check, validationResult } = require('express-validator');
const { Ingredient, Instruction, Recipe } = require('../db/models');


const ingredientValidator = [
    check("name")
        .exists({ checkFalsy: true })
        .withMessage("Please provide a name for the ingredient."),
    check("measurements")
        .exists({ checkFalsy: true })
        .withMessage("Please provide valid ingredients and measurements.")
];

router.post('/', ingredientValidator, asyncHandler(async (req, res) => {
    const { name, measurements, recipeId } = req.body;
    const validatorErrors = validationResult(req);
    const ingredient = Ingredient.build({
        name,
        measurements,
        recipeId
    })
    if (validatorErrors.isEmpty()) {
        await ingredient.save();
        res.redirect(`/recipes/${recipeId}/edit`);
    } else {
        const errors = validatorErrors.array().map((e) => e.msg);
        const recipe = await Recipe.findByPk(recipeId);
        const ingredient = Ingredient.build();
        const instruction = Instruction.build();
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
            const listOrder = instructions.length + 1;
            res.render('recipes-edit', { recipe, ingredients, instructions, recipeId, ingredient, instruction, listOrder, errors });
        } else {
            next(recipeNotFoundError(recipeId));
        }
    }
}))


module.exports = router;
