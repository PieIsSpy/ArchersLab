const express = require('express');
const router = express.Router();
const { getUser, loginUser, createUser, updateUser,  deleteUser } = require('../controllers/userController')
const {isLoggedIn, isOwner} = require('../middleware/authMiddleware')

router.post('/', createUser);
router.post('/login', loginUser);

router.get('/:id', isLoggedIn, getUser);
router.put('/:id', isLoggedIn, isOwner, updateUser);
router.delete('/:id', isLoggedIn, isOwner, deleteUser);

module.exports = router;