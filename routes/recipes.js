const express = require('express');
const router = express.Router();
const { asyncHandler } = require('./utils');
const { check, validationResult } = require('express-validator');
const { Ingredient, Instruction, Recipe, Review, Picture, Like } = require('../db/models');
const { loginUser, logoutUser, requireAuth, restoreUser, checkPermissions } = require('../auth')
const Sequelize = require("sequelize");
const Pictures = require('../db/seeders/8-Pictures');

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
            ['updatedAt', "DESC"]
        ],
    });
    res.render('recipes', { recipes });
}))

router.get("/my", asyncHandler(async (req, res) => {
    const recipes = await Recipe.findAll({
        where: {
            userId: req.session.auth.userId
        },
        order: [
            [Sequelize.fn('lower', Sequelize.col('name')), "ASC"]
        ]
    });
    res.render('recipes', { recipes });
}))

router.get("/new", asyncHandler(async (req, res) => {
    if (!req.session.auth) {
        res.redirect("/users/login")
    }
    const recipe = Recipe.build();
    res.render("recipes-new", { recipe });
}))

router.get("/:id", asyncHandler(async (req, res) => {
    let userId = 0;
    if (req.session.auth) {
        userId = req.session.auth.userId;
    };
    const recipeId = parseInt(req.params.id, 10);
    const recipe = await Recipe.findByPk(recipeId, {
        include:[
            {model: Picture},
            {model: Instruction},
            {model: Ingredient},
            {model: Review},
            {model: Like}
        ]
    });
    if (recipe) {
        // const ingredients = await Ingredient.findAll({
        //     where: {
        //         recipeId: recipeId
        //     },
        // });
        // const instructions = await Instruction.findAll({
        //     where: {
        //         recipeId: recipeId
        //     },
        //     order: [
        //         ['listOrder', 'ASC']
        //     ]
        // });
        // const reviews = await Review.findAll({
        //     where: {
        //         recipeId: recipeId,
        //     },
        //     order: [
        //         ['createdAt', 'DESC']
        //     ]
        // })
        const ingredients = recipe.Ingredients;
        const instructions = recipe.Instructions;
        const reviews = recipe.Reviews;
        const likes = recipe.Likes;

        let counter = likes.length;

        res.render('recipe', { recipe, ingredients, instructions, recipeId, userId, reviews, likes, counter });
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
    const recipe = await Recipe.findByPk(recipeId, {
        include: [
            Picture, Ingredient, Instruction
        ]
    });
    const userId = req.session.auth.userId;
    checkPermissions(recipe, userId)
    const ingredient = Ingredient.build();
    const instruction = Instruction.build();

    if (recipe) {
        // const ingredients = await Ingredient.findAll({
        //     where: {
        //         recipeId: recipeId
        //     },
        // });
        // const instructions = await Instruction.findAll({
        //     where: {
        //         recipeId: recipeId
        //     },
        //     order: [
        //         ['listOrder', 'ASC']
        //     ]
        // });
        const ingredients = recipe.Ingredients;
        const instructions = recipe.Instructions;
        const listOrder = instructions.length + 1;
        res.render('recipes-edit', { recipe, ingredients, instructions, recipeId, ingredient, instruction, listOrder});
    } else {
        next(recipeNotFoundError(recipeId));
    }
}))

router.get("/:id/delete", asyncHandler(async (req, res) => {
    const recipeId = parseInt(req.params.id, 10);
    const userId = req.session.auth.userId;
    const recipe = await Recipe.findByPk(recipeId);
    checkPermissions(recipe, userId);
    res.render('recipe-delete-confirm', { recipeId, recipe})
}))

router.post("/:id/delete", asyncHandler(async (req, res, next) => {
    const recipeId = parseInt(req.body.recipeId, 10);
    const userId = req.session.auth.userId;
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

router.post("/:id/likes", asyncHandler(async (req, res) => {
    const { recipeId, like } = req.body;
    const userId = res.locals.user.id;
    const newLike = Like.build({ recipeId, userId });
    await newLike.save();
    res.end();
}));

module.exports = router;
