const express = require('express');
const router = express.Router();
const { asyncHandler, handleValidationErrors } = require('./utils');
const { check, validationResult } = require('express-validator');
const { Recipe, Picture } = require('../db/models');


const pictureValidator = [
    check("url")
        .exists({ checkFalsy: true })
        .withMessage("Please provide an URL for the recipe.")
];

router.post('/', pictureValidator, asyncHandler(async (req, res) => {
    const { src, alt, recipeId } = req.body;
    const validatorErrors = validationResult(req);
    const picture = Ingredient.build({
        src,
        alt,
        recipeId
    })
    if (validatorErrors.isEmpty()) {
        await picture.save();
        res.redirect(`/recipes/${recipeId}/edit`);
    } else {
        const errors = validatorErrors.array().map((e) => e.msg);
        const src = Ingredient.build();
        const alt = Instruction.build();
        const recipe = await Recipe.findByPk(recipeId);
        if (recipe) {
            const picture = await Picture.findAll({
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
