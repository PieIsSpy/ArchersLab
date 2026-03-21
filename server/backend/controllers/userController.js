const asyncHandler = require('express-async-handler')

const User = require('../model/userModel')
const Reservation = require('../model/reservationModel')

// @desc    Get User
// @route   GET /api/users
// @access  Private
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password')

    res.status(200).json(users)
})

const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    res.status(200).json(user)
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

    if (req.body.oldPassword) {
        if (user.password !== req.body.oldPassword) {
            res.status(401)
            throw new Error('Old Password incorrect')
        }

        user.password = req.body.password;
        await user.save();

        const userResponse = user.toObject();
        delete userResponse.password
        return res.status(200).json(userResponse)
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true}).select('-password')

    res.status(200).json(updatedUser)
})

// @desc    Delete User
// @route   DELETE /api/users/:id
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
    const {password} = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(400);
        throw new Error('User not found');
    }

    if (user.password !== password) {
        res.status(401)
        throw new Error('Password incorrect')
    }

    await Reservation.deleteMany({user: req.params.id});
    await user.deleteOne();

    req.session.destroy((err) => {
        if (err) {
            res.status(500);
            throw new Error('Could not log out after deletion')
        }
        res.clearCookie('connect.sid')
        res.status(200).json({ 
            message: 'User and all asssociated reservations deleted',
            id: req.params.id
        });
    })
})

module.exports = {
    getUsers, getUser, loginUser, createUser, updateUser, deleteUser
}