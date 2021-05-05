const express = require('express');
const router = express.Router();
const { asyncHandler } = require('./utils');
const { check, validationResult } = require('express-validator');
const { Ingredient, Instruction, Recipe, Review } = require('../db/models');
const { loginUser, logoutUser, requireAuth, restoreUser, checkPermissions } = require('../auth')

const recipeNotFoundError = function (recipeId) {
    const error = new Error(`The recipe with ID ${recipeId} was not found.`);
    error.title = "Recipe not found.";
    error.status = 404;
    return error;
}

const recipeValidator = [
    check("name")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a name for the recipe.")
    .isLength({ max: 50 })
    .withMessage("The recipe name must not be longer than 50 characters.")
];

router.get("/", asyncHandler(async (req, res) => {
    const recipes = await Recipe.findAll({
        order: [
            ["updatedAt", "DESC"]
        ]}
    );
    res.render('recipes', { recipes });
}))

router.get("/new", asyncHandler(async (req, res) => {
    const recipe = Recipe.build();
    res.render("recipes-new", { recipe });
}))

router.get("/:id", asyncHandler(async (req, res) => {
    const userId = req.session.auth.userId;
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
        const reviews = await Review.findAll({
            where: {
                recipeId: recipeId,
            },
            order: [
                ['createdAt', 'DESC']
            ]
        })
        console.log(reviews)
        res.render('recipe', { recipe, ingredients, instructions, recipeId, userId, reviews });
    }
}))


router.post("/new", recipeValidator, asyncHandler(async (req, res) => {
    const { name } = req.body;
    const recipe = Recipe.build({
        name,
        userId: req.session.auth.userId
    })
    const validatorErrors = validationResult(req);
    if (validatorErrors.isEmpty()) {
        await recipe.save();
        const ingredient = Ingredient.build();
        const instruction = Instruction.build();
        res.redirect(`/recipes/${recipe.id}/edit`);
    } else {

        const errors = validatorErrors.array().map((e) => e.msg);
        res.render('recipes-new', { recipe, errors });
    }
}))

router.get("/:id/edit", asyncHandler(async (req, res, next) => {
    const recipeId = parseInt(req.params.id, 10);
    const recipe = await Recipe.findByPk(recipeId);
    const userId = req.session.auth.userId;
    checkPermissions(recipe, userId)
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
        res.render('recipes-edit', { recipe, ingredients, instructions, recipeId, ingredient, instruction, listOrder});
    } else {
        next(recipeNotFoundError(recipeId));
    }
}))

module.exports = router;
