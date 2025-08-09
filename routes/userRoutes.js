const express = require('express');
const userController = require('../controllers/UserController');
const logger = require('../config/logger');
const validate = require('../middleware/validate');
const { loginSchema, signupSchema } = require('../validation/userValidation');
const router=express.Router();


router.get("/", userController.getUsers);
router.post("/signup",validate(signupSchema) ,userController.signup);
router.post("/login",validate(loginSchema) , userController.login);

module.exports=router;
