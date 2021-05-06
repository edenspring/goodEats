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
  }));

  /** we want to grab all the instructions for a particular recipe
   * Once we grab those instructions, we want to find a particular instruction at its list order
   * Then we want to delete that instruction and render the new list.
   */
  router.delete("/:id/delete", asyncHandler(async(req, res)=>{
    const { specification, listOrder, instructionId, recipeId } = req.body;
        const instructions = await Instruction.findAll({
            where: {
                recipeId: recipeId
            },
            order: [
                ['listOrder', 'ASC']
            ]
        });
        checkPermissions(instructions, currentUserId);
        instructions.forEach(async (instruction) => {
            await instruction.listOrder.destroy();
        })
        console.log(instructions);
    const currentUserId = res.locals.user.id;
    // await instruction.destroy(lastItem);
  }));

//   router.edit("/:id/edit", asyncHandler(async(req, res)=>{
//     const {instructionId} = req.body;
//     const instruction = await Instruction.findByPk(instructionId);
//     const currentUserId = res.locals.user.id;
//     checkPermissions(instruction, currentUserId);
//     await review.destroy();
//   }));


module.exports = router;
