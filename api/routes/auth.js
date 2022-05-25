const {Router} = require('express');
const { check } = require('express-validator');
const { loginController } = require('../controllers/auth');
const {validation}= require('../middlewares/validator');


const router = Router();



router.post('/login',[
    check('email', 'Valid E-mail is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validation
] ,loginController)


module.exports = router;