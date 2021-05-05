const express = require("express");
const router = express.Router();
const { asyncHandler } = require("./utils");
const { check, validationResult } = require("express-validator");
const { Review } = require("../db/models");
const {
  loginUser,
  logoutUser,
  requireAuth,
  restoreUser,
  checkPermissions,
} = require("../auth");

const reviewValidator = [
  check("review")
    .exists({ checkFalsy: true })
    .isLength({ min: 15 })
    .withMessage("Reviews must be at least 15 characters long"),
];

router.post(
  "/",
  reviewValidator,
  asyncHandler(async (req, res) => {
    const { recipeId, userId, review } = req.body;
    const newReview = Review.build({
      recipeId,
      userId,
      review,
    });
    const validatorErrors = validationResult(req);
    if (validatorErrors.isEmpty()) {
      await newReview.save();
      res.redirect(`/recipes/${recipe.id}`);
    } else {
      const errors = validatorErrors.array().map((e) => e.msg);
      const recipe = await Recipe.findByPk(recipeId);
      const ingredients = await Ingredient.findAll({
        where: {
          recipeId: recipeId,
        },
      });
      const instructions = await Instruction.findAll({
        where: {
          recipeId: recipeId,
        },
        order: [["listOrder", "ASC"]],
      });
      res.render('recipe', {recipe, ingredients, instructions, recipeId, userId, errors})
    }
  })
);


module.exports = router;
