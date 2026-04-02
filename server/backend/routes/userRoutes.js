const express = require('express');
const router = express.Router();
const { getUser, loginUser, createUser, updateUser,  deleteUser } = require('../controllers/userController')

router.route('/').post(createUser);
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser).get(loginUser);
router.post('/login', loginUser)

module.exports = router;