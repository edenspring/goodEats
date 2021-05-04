const express = require('express');
const router = express.Router();
const { asyncHandler, handleValidationErrors } = require('./utils');
const { check, validationResult } = require('express-validator');
const { Ingredient, Instruction, Like, Recipe, RecipeBox, Review, User } = require('../db/models');

const recipeNotFoundError = function (recipeId) {
    const error = new Error(`The recipe with ID ${recipeId} was not found.`);
    error.title = "Recipe not found.";
    error.status = 404;
    return error;
}

// router.get("/", asyncHandler(async (req, res) => {
//     const recipes = await Recipe.findAll();
//     res.render('recipes', { recipes });
// }))

router.get("/new", asyncHandler(async (req, res) => {
    const recipe = Recipe.build();
    res.render("recipes-new", { recipe });
}))

const recipeValidator = [
    check("name")
        .exists({ checkFalsy: true })
        .withMessage("Please provide a name for the recipe.")
        .isLength({ max: 50 })
        .withMessage("The recipe name must not be longer than 50 characters.")
    // check("")
];

// recipeValidator, handleValidationErrors,

router.post("/new", asyncHandler(async (req, res) => {
    const { name } = req.body;
    const recipe = await Recipe.create({
        name,
        userId: req.session.auth.userId
    });
    const ingredient = Ingredient.build();
    const instruction = Instruction.build();
    res.redirect(`/recipes/${recipe.id}/edit`, { recipe, ingredient, instruction });
}))

router.get("/:id/edit", asyncHandler(async (req, res, next) => {
    const recipeId = parseInt(req.params.id, 10);
    const recipe = await Recipe.findByPk(recipeId);
    const ingredient = Ingredient.build();
    const instruction = Instruction.build();
    if (recipe) {
        const name = recipe.name;
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
        console.log(instructions.length);
        const listOrder = instructions.length + 1;
        res.render('recipes-edit', { name, ingredients, instructions, recipeId, ingredient, instruction, listOrder});
    } else {
        next(recipeNotFoundError(recipeId));
    }
}))

router.post("/:id(\\d+)/ingredients", asyncHandler(async (req, res, next) => {
    const recipeId = parseInt(req.params.id, 10);
    const recipe = await Recipe.findByPk(recipeId);
    if (recipe) {
        const instructions = await Instruction.findAll({
            where: {
                recipeId: recipeId
            },
            order: [
                ['listOrder', 'ASC']
            ]
        });
        console.log(req);
        const currentLength = instructions.length;
        await Instruction.create({
            specification: req.body,
            listOrder: currentLength,
            recipeId: recipeId
        });
        await Ingredient.create({
            name,
            measurements,
            recipeId: recipeId
        })
        res.render('recipes-edit', { name, ingredients, instructions });
    } else {
        next(recipeNotFoundError(recipeId));
    }
}))

router.put("/:id(\\d+)", asyncHandler(async (req, res, next) => {
    const recipeId = parseInt(req.params.id, 10);
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
        await recipe.update({ name: req.body.name });
        await ingredients.update({ name: req.body.ingredient, measurements: req.body.measurements });
        await instructions.update({ specifications: req.body.specification });
        res.render('recipes-edit', { name, ingredients, instructions });
    } else {
        next(recipeNotFoundError(recipeId));
    }
}))

router.delete("/:id(\\d+)", asyncHandler(async (req, res, next) => {
    const recipeId = parseInt(req.params.id, 10);
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
        await instructions.destroy();
        await ingredients.destroy();
        await recipe.destroy();
        res.redirect("/");
    } else {
        next(recipeNotFoundError(recipeId));
    }
}))

module.exports = router;
