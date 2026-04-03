const asyncHandler = require('express-async-handler')

const isLoggedIn = (req, res, next) => {
    console.log('isAuth?', req.session.isAuth)
    if (req.session && req.session.isAuth) {
        next();
    } else {
        res.status(401);
        throw new Error('Not Authorized')
    }
}

const isAdmin = (req, res, next) => {
    if (req.session && req.session.user.isAdmin) {
        next();
    } else {
        res.status(403);
        throw new Error('Not Authorized')
    }
}

const isOwner = (req, res, next) => {
    const id = req.session.user._id.toString();
    const urlId = req.params.id;

    console.log('id?', id)
    console.log('urlId', urlId)
    if (id === urlId || req.session.user.isAdmin) {
        next();
    } else {
        res.status(403);
        throw new Error('Not Authorized')
    }
}

module.exports = {isLoggedIn, isAdmin, isOwner}