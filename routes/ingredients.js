const express = require('express');
const router = express.Router();
const { csrfProtection, asyncHandler } = require('./utils');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../db/models');
const { loginUser, logoutUser } = require('../auth');

router.post('/', asyncHandler(async(req, res)=>{
  const {name, measurements, recipeId} = req.body
  await db.Ingredient.create({
    name,
    measurements,
    recipeId
  })
  res.render('index')
}))
