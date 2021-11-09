const express = require('express')
const router = express.Router()
const users = require('../controllers/usersController')

router.route('/').get(users.getUsers).post(users.createUser)
router.route('/:id').get(users.getUser)

module.exports = router
