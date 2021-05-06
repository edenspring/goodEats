const express = require('express');
const router = express.Router();
const { asyncHandler } = require('./utils');
const { check, validationResult } = require('express-validator');
const { loginUser, logoutUser, requireAuth, restoreUser, checkPermissions } = require('../auth')
const { Ingredient, Instruction, Recipe } = require('../db/models');

// const statusValidator = [
//     check("specification")
//         .exists({ checkFalsy: true })
//         .withMessage("Please select a status.")
// ];

router.post("/", statusValidator, asyncHandler(async (req, res) => {
    
    

    
}));

module.exports = router;