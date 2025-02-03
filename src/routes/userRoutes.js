const express = require('express')
const userController = require('../controllers/userController')
const router = express.Router()


router.post('/user', userController.createUser);
router.post('/onetoone', userController.onetoone);
router.get('/onetoone', userController.getOnetoone);
router.delete('/onetoone/:id', userController.deleteUser);
module.exports = router