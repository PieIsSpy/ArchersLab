const express = require('express');
const router = express.Router();
const { getUsers, getUser, loginUser, createUser, updateUser,  deleteUser } = require('../controllers/userController')

router.route('/').get(getUsers).post(createUser);
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser).get(loginUser);
router.post('/login', loginUser)

module.exports = router;