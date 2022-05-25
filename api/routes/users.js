const {Router} = require('express');
const { check } = require('express-validator');
const { postUser }  = require('../controllers/users');
const { validation } = require('../middlewares/validator')
const{ rolValidator } = require('../helpers/db-validators');

const router = Router();


router.post('/',[ 
check('name', 'Name is required').not().isEmpty(),
check('password', 'Password must contain at least 6 characters').isLength({min: 6}),
check('role').custom(rolValidator),
validation
] ,postUser)



module.exports = router;