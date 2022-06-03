
const {Router} = require('express');
const { check } = require('express-validator');
const { loginController, googleSingIn, verifyAccount } = require('../controllers/auth');
const {validation}= require('../middlewares/validator');


const router = Router();



router.post('/login',[
    check('email', 'Valid E-mail is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validation
] ,loginController)

router.post('/google',[
    check('id_token', 'id_token is neccesary').not().isEmpty(),
    validation
] ,googleSingIn)

router.get('/verify/:token',verifyAccount)

module.exports = router;