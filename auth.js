const db = require("./db/models");

// the following function will log in the user
const loginUser = function (req, res, user) {
    req.session.auth = {
        userId: user.id // sets the authenticated user
    }
}

// the following middleware function will attempt to restore the user if authenticated
const restoreUser = async function (req, res, next) {
    if (req.session.auth) { // checks to see if there is an authenticated user
        const { userId } = req.session.auth;
        try {
            const user = await db.User.findByPk(userId);
            if (user) { // checks to see if the user matches database
                res.locals.authenticated = true;
                res.locals.user = user; // set to user retrieved from database
                next();
            }
        } catch (err) {
            res.locals.authenticated = false;
            next(err);
        }
    } else { // if no session, default to not authenticated
        res.locals.authenticated = false;
        next();
    }
}

module.exports = { loginUser, restoreUser };
