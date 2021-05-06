const express = require('express');
const router = express.Router();
const { asyncHandler } = require('./utils');
const { check, validationResult } = require('express-validator');
const { loginUser, logoutUser, requireAuth, restoreUser, checkPermissions } = require('../auth')
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
    });
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

router.get("/:id", asyncHandler(async (req, res) => {
    const recipeId = parseInt(req.body.recipeId, 10);
    const instructions = await Instruction.findAll({
        where: {
            recipeId: recipeId
        }
    })

    const currentUserId = res.locals.user.id;
    checkPermissions(instructions, currentUserId);

    res.render('recipes-edit', { instructions });
}));

router.post("/:id/delete", asyncHandler(async (req, res) => {
    let { recipeId, listOrder } = req.body;
    
    const instructions = await Instruction.findOne({
        where: {
            recipeId: recipeId,
            listOrder: listOrder
        }, 
        include: {
            model: Recipe
        }
    });
    const currentUserId = res.locals.user.id;
    checkPermissions(instructions.Recipe, currentUserId);
    
    await instructions.destroy();

    res.redirect(`/recipes/${recipeId}/edit`);
}));

module.exports = router;
