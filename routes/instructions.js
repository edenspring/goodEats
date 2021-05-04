const express = require('express');
const router = express.Router();
const { asyncHandler } = require('./utils');
const { check, validationResult } = require('express-validator');
const { Ingredient, Instruction, Recipe } = require('../db/models');

const instructionValidator = [
    check("specification")
        .exists({ checkFalsy: true })
        .withMessage("Please provide some instructions.")
]


router.post('/', instructionValidator, asyncHandler(async (req, res) => {
    const { specification, listOrder, recipeId } = req.body;
    const validatorErrors = validationResult(req);
    const instruction = Instruction.build({
        specification,
        listOrder,
        recipeId
    })
    await Instruction.create({
      specification,
      listOrder,
      recipeId
    })
    if (validatorErrors.isEmpty()) {
        await instruction.save();
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
