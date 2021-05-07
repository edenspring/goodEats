const express = require('express');
const router = express.Router();
const { asyncHandler } = require('./utils');
const { check, validationResult } = require('express-validator');
const { Ingredient, Instruction, Recipe, Review, Picture, Like, CookStatus } = require('../db/models');
const { loginUser, logoutUser, requireAuth, restoreUser, checkPermissions } = require('../auth')
const Sequelize = require("sequelize");
const Pictures = require('../db/seeders/8-Pictures');

router.post('/', asyncHandler(async(req, res)=>{
  const {userId, recipeId, cookStatus} = req.body;
  console.log('user :', userId)
  console.log('recipe :', recipeId)
  console.log('status :', cookStatus)
  const workingStatus = await CookStatus.findOne({
    where: {
      userId: userId,
      recipeId: recipeId
    }
  })
  console.log(workingStatus)
  if (workingStatus){
    workingStatus.status = cookStatus;
    await workingStatus.save();
    res.sendStatus(200).end;
  } else {
      const newStatus = CookStatus.build({
      userId,
      recipeId,
      status: cookStatus
    })
    await newStatus.save();
    res.sendStatus(200).end();
  }
}))

module.exports = router;
