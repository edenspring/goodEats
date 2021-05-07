const express = require('express');
const router = express.Router();
const { asyncHandler } = require('./utils');
const { check, validationResult } = require('express-validator');
const { Ingredient, Instruction, Recipe, Review, Picture, Like, CookStatus } = require('../db/models');
const { loginUser, logoutUser, requireAuth, restoreUser, checkPermissions } = require('../auth')
const Sequelize = require("sequelize");
const Pictures = require('../db/seeders/8-Pictures');

router.post('/recipe/:id', asyncHandler(async(req, res)=>{
  const {userId, recipeId, cookStatus} = req.body;
  const workingStatus = await CookStatus.findOne({
    where: [
      userId, recipeId
    ]
  })
  if (workingStatus){
    workingStatus.status = cookStatus;
    await workingStatus.save();
  } else {
    const newStatus = await CookStatus.create({
      userId,
      recipeId
    })
  }
}))
