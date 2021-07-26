const express = require("express");
const router = express.Router();
const { asyncHandler } = require("./utils");
const { check, validationResult } = require("express-validator");
const { CookStatus } = require("../db/models");
const { checkPermissions } = require("../auth");


//define constraints for status
const statusValidator = [
  check("userId")
    .exists({ checkFalsy: true })
    .withMessage("current userId must be provided"),
  check("recipeId")
    .exists({ checkFalsy: true })
    .withMessage("current recipeId must be provided"),
  check("status")
    .exists({ checkFalsy: true })
    .withMessage("a valid status must be provided"),
];

router.post(
  "/",
  statusValidator,
  asyncHandler(async (req, res, next) => {
    console.log('ping')
    const { userId, recipeId, cookStatus } = req.body;

    //check for validation errors
    const validatorErrors = validationResult(req);
    if (validatorErrors.isEmpty()) {
      console.log('pong')
      //attempt to find User's status for recipe, if it exists
      const workingStatus = await CookStatus.findOne({
        where: {
          userId: userId,
          recipeId: recipeId,
        },
      });

      //find current authenticated user from
      const currentUser = res.locals.user.id;
      if (workingStatus) {
        //verify current user is authorized to make changes
        checkPermissions(workingStatus, currentUser);

        //update status
        workingStatus.status = cookStatus;
        await workingStatus.save();
        res.sendStatus(200).end;
      } else {
        //if no status found for user and recipe, build new
        const newStatus = CookStatus.build({
          userId,
          recipeId,
          status: cookStatus,
        });
        //verify current user is the one making request
        checkPermissions(workingStatus, newStatus);

        //save review
        await newStatus.save();
        res.sendStatus(200).end();
      }
    } else {
      const errors = validatorErrors.array().map((e) => e.msg);
      console.log(errors)
      next(errors);
    }
  })
);

module.exports = router;
