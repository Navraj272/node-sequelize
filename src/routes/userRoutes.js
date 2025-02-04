const express = require('express')
const userController = require('../controllers/userController')
const verifyToken = require('../middleware/middleware')
const adminAuth = require('../middleware/adminauth')
const router = express.Router()


router.post('/SignUp', userController.SignUp);

router.post('/Login', userController.Login);

router.get('/users',userController.getAllUsers)

router.get('/userInfo',verifyToken,userController.getUserInfo)

router.get('/admin',verifyToken,adminAuth,userController.getUserInfo)

// router.post('/onetoone', userController.onetoone);
// router.get('/onetoone', userController.getOnetoone);

router.delete('/onetoone/:id', userController.deleteUser);
module.exports = router


// statefull and stateless authentications 

// client give username and passw and server will give client a session unique id >> cookies,headers,responses 