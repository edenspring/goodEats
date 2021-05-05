const express = require("express");
const router = express.Router();
const { asyncHandler } = require("./utils");
const { check, validationResult } = require("express-validator");
const { Review, User, Recipe, Ingredient, Instruction } = require("../db/models");
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
    .withMessage("Please enter your review"),
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
      username : '',
    });
    const validatorErrors = validationResult(req);
    if (validatorErrors.isEmpty()) {
      console.log('made it here')
      const user = await User.findByPk(userId)
      newReview.username = user.username;
      await newReview.save();
      res.redirect(`/recipes/${recipeId}`);
    } else {
      console.log('made it to else')
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
      const reviews = await Review.findAll({
        where: {
            recipeId: recipeId,
        },
        order: [
            ['createdAt', 'DESC']
        ]
    })
      res.redirect(`/recipes/${recipeId}`)
    }
  })
);


module.exports = router;
