const express = require('express');
const router = express.Router();
const { asyncHandler } = require('./utils');
const { check, validationResult } = require('express-validator');
const { RecipeBox, Recipe, RecipeBoxJoinTable } = require('../db/models');
const { loginUser, logoutUser, requireAuth, restoreUser, checkPermissions } = require('../auth')

const boxNotFoundError = function (boxId) {
    const error = new Error(`The box with ID ${boxId} was not found.`);
    error.title = "Recipe box not found.";
    error.status = 404;
    return error;
}

const boxValidator = [
    check("name")
        .exists({ checkFalsy: true })
        .withMessage("Please provide a name for this box.")
        .isLength({ max: 50 })
        .withMessage("The recipe box name must not be longer than 50 characters.")
];

router.get("/", asyncHandler(async (req, res) => {
    const boxes = await RecipeBox.findAll({
        order: [
            ["updatedAt", "DESC"]
        ]
    });
    res.render('boxes', { boxes });
}))

router.get("/my", asyncHandler(async (req, res) => {
    const boxes = await RecipeBox.findAll({
        where: {
            userId: req.session.auth.userId
        },
        order: [
            ["updatedAt", "DESC"]
        ]
    });
    res.render("boxes", { boxes });
}))

router.get("/new", asyncHandler(async (req, res) => {
    const box = RecipeBox.build();
    res.render("boxes-new", { box });
}))

router.get("/:id", asyncHandler(async (req, res) => {
    let userId;
    if (req.session.auth) {
        userId = req.session.auth.userId;
    } else {
        userId = 0;
    }
    const boxId = parseInt(req.params.id, 10);
    const box = await RecipeBox.findByPk(boxId, {
        include: { model: Recipe }
    });
    if (box) {
        const recipes = box.Recipes;
        res.render("box", { box, recipes, boxId, userId})
    }
}))

router.post("/new", boxValidator, asyncHandler(async (req, res) => {
    const { name } = req.body;
    const box = RecipeBox.build({
        name,
        userId: req.session.auth.userId
    })
    const validatorErrors = validationResult(req);
    if (validatorErrors.isEmpty()) {
        await box.save();
        res.redirect(`/boxes/${box.id}/edit`);
    } else {
        const errors = validatorErrors.array().map((e) => e.msg);
        res.render('boxes-new', { box, errors });
    }
}))

router.get("/:id/edit", asyncHandler(async (req, res, next) => {
    const boxId = parseInt(req.params.id, 10);
    const box = await RecipeBox.findByPk(boxId, {
        include: { model: Recipe }
    });
    const userId = req.session.auth.userId;
    checkPermissions(box, userId);
    if (box) {
        const recipes = box.Recipes;
        res.render("boxes-edit", { box, recipes, boxId})
    } else {
        next(boxNotFoundError(boxId));
    }
}))

router.get("/:id/add", asyncHandler(async (req, res) => {
    const boxId = parseInt(req.params.id, 10);
    const userId = req.session.auth.userId
    const box = await RecipeBox.findByPk(boxId);
    const recipes = await Recipe.findAll({
        order: [
            ["name", "DESC"]
        ]
    });
    checkPermissions(box, userId);
    res.render('box-add-recipe', { recipes, boxId });
}))

router.get("/:id/add/:recipeId", asyncHandler(async (req, res) => {
    const boxId = parseInt(req.params.id, 10);
    const recipeId = parseInt(req.params.recipeId, 10);
    const userId = req.session.auth.userId
    const box = await RecipeBox.findByPk(boxId);
    const recipe = await Recipe.findByPk(recipeId);
    checkPermissions(box, userId);
    res.render('box-add-recipe-confirm', { boxId, recipeId, box, recipe });
}))

router.post("/:id/add/:recipeId", asyncHandler(async (req, res) => {
    const boxId = parseInt(req.params.id, 10);
    const recipeId = parseInt(req.params.recipeId, 10);
    const userId = req.session.auth.userId
    const box = await RecipeBox.findByPk(boxId);
    checkPermissions(box, userId);
    const join = await RecipeBoxJoinTable.create({
        recipeId,
        recipeBoxId: boxId
    })
    res.redirect(`/boxes/${boxId}/edit`);
}))

router.get("/:id/remove/:recipeId", asyncHandler(async (req, res, next) => {
    const boxId = parseInt(req.params.id, 10);
    const recipeId = parseInt(req.params.recipeId, 10);
    const userId = req.session.auth.userId;
    const box = await RecipeBox.findByPk(boxId, {
        include: { model: Recipe }
    });
    checkPermissions(box, userId);
    const recipe = await Recipe.findByPk(recipeId);
    const join = await RecipeBoxJoinTable.findOne({
        where: {
            recipeBoxId: boxId,
            recipeId: recipeId
        }
    })
    await join.destroy();
    res.redirect(`/boxes/${boxId}/edit`);
}))

router.post("/delete-box", asyncHandler(async (req, res, next) => {
    const boxId = parseInt(req.body.boxId, 10);
    const userId = req.session.auth.userId
    const box = await RecipeBox.findByPk(boxId);
    if (box) {
        checkPermissions(box, userId);
        const joins = await RecipeBoxJoinTable.findAll({
            where: {
                recipeBoxId: boxId
            }
        });
        joins.forEach(async (join) => {
            await join.destroy();
        })
        await box.destroy();
        res.redirect("/");
    } else {
        next(boxNotFoundError(boxId));
    }
}))

module.exports = router
