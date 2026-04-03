const asyncHandler = require('express-async-handler')

const User = require('../model/userModel')
const Reservation = require('../model/reservationModel')
const bcrypt = require('bcrypt')

const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
        res.status(400);
        throw new Error('User not found');
    }

    res.status(200).json(user)
})

const loginUser = asyncHandler(async (req, res) => {
    const {id, password, remember} = req.body;

    const user = await User.findOne({_id: Number(id)})

    if (!user) {
        res.status(400);
        throw new Error('User not found');
    }

    isMatch = await bcrypt.compare(password, user.password)

    if (user && isMatch) {
        const userRes = user.toObject();
        delete userRes.password

        const oneDay = 1000 * 60 * 60 * 24;
        const threeWeeks = 21 * 24 * 60 * 60 * 1000;

        req.session.cookie.maxAge = remember ? threeWeeks : oneDay;
        console.log('remember? ', remember)

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
        throw new Error('Wrong Password');
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

	if (await User.findOne({_id: Number(id)})) {
        res.status(400)
        throw new Error('User already exists')
    }

    const hash = await bcrypt.hash(password, 13)

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
        password: hash,
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
        isMatch = await bcrypt.compare(req.body.oldPassword, user.password)
        
        if (!isMatch) {
            res.status(401)
            throw new Error('Old Password incorrect')
        }

        const hash = await bcrypt.hash(req.body.password, 13)
        user.password = hash;
        await user.save();

        const userResponse = user.toObject();
        delete userResponse.password
        return res.status(200).json(userResponse)
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true}).select('-password')
    req.session.user = updatedUser.toObject();

    req.session.save((err) => {
        if (err) {
            res.status(500);
            throw new Error(err)
        }
        res.status(200).json(updatedUser)
    })
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

    isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
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
    getUser, loginUser, createUser, updateUser, deleteUser
}