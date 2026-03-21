const asyncHandler = require('express-async-handler')

const User = require('../model/userModel')

// @desc    Get User
// @route   GET /api/users
// @access  Private
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password')

    res.status(200).json(users)
})

const loginUser = asyncHandler(async (req, res) => {
    const {id, password} = req.body;

    const user = await User.findOne({_id: Number(id)})

    if (user && (user.password === password)) {
        const userRes = user.toObject();
        delete userRes.password

        req.session.isAuth = true;
        req.session.user = userRes;

        req.session.save((err) => {
            if (err) {
                return res.status(500).json({message: 'Session storage failed'})
            }
            res.status(200).json(userRes)
        })
    }
    else {
        res.status(400);
        throw new Error('User not found');
    }
})

// @desc    Create User
// @route   POST /api/users
// @access  Private
const createUser = asyncHandler(async (req, res) => {
    const {name, nickname, id, bio, email, college, program, about, pfp_url, password, isAdmin} = req.body;

    if (!name || !id || !email || !password) {
        res.status(400)
        throw new Error('Invalid Creation')
    }

    const user = await User.create({
        name: name,
        nickname: nickname,
        _id: id,
        bio: bio,
        email: email,
        college: college,
        program: program,
        about: about,
        pfp_url: pfp_url,
        password: password,
        isAdmin: isAdmin
    })

    res.status(200).json(user)
})

// @desc    Update User
// @route   PUT /api/users/:id
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(400);
        throw new Error('User not found');
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true}).select('-password')

    res.status(200).json(updatedUser)
})

// @desc    Delete User
// @route   DELETE /api/users/:id
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(400);
        throw new Error('User not found');
    }

    await user.deleteOne();
    res.status(200).json({ id: req.params.id });
})

module.exports = {
    getUsers, loginUser, createUser, updateUser, deleteUser
}