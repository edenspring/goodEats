const indexRouter = require('./index');
const usersRouter = require('./users');
const ingredientsRouter = require('./ingredients');
const instructionsRouter = require('./instructions');
const recipesRouter = require('./recipes');
const boxesRouter = require('./boxes')
const deleteRouter = require('./delete');

module.exports = {
    indexRouter,
    usersRouter,
    ingredientsRouter,
    instructionsRouter,
    recipesRouter,
    boxesRouter,
    deleteRouter
}
