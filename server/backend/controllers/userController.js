// @desc    Get User
// @route   GET /api/users
// @access  Private
const getUsers = (req, res) => {
    res.status(200).json({message: 'Get User'})
}

// @desc    Create User
// @route   POST /api/users
// @access  Private
const createUser = (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Invalid Creation')
    }
    res.status(200).json({message: 'Create User'})
}

// @desc    Update User
// @route   PUT /api/users/:id
// @access  Private
const updateUser = (req, res) => {
    res.status(200).json({message: `Update User ${req.params.id}`})
}

// @desc    Delete User
// @route   DELETE /api/users/:id
// @access  Private
const deleteUser = (req, res) => {
    res.status(200).json({message: `Delete User ${req.params.id}`})
}

module.exports = {
    getUsers, createUser, updateUser, deleteUser
}