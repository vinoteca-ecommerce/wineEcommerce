const {Router} = require('express');
const { check } = require('express-validator');
const { postUser, getUserById, getUsers, updateUser, deleteUser, undeleteUser }  = require('../controllers/users');
const { validation } = require('../middlewares/validator')
const{ rolValidator, userExistById } = require('../helpers/db-validators');

const router = Router();


router.get('/',getUsers)

router.put('/:id',[
    check('id', 'no es un id valido').isMongoId(),
    check('id').custom(userExistById),
    check('role').custom(rolValidator),
validation
],updateUser)

router.post('/',[ 
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password must contain at least 6 characters').isLength({min: 6}),
    check('role').custom(rolValidator),
validation
] ,postUser)

router.get('/:id',[
    check('id', 'no es un id valido').isMongoId(),
    check('id').custom(userExistById),
validation
]
,getUserById)


router.delete('/:id',[
    check('id', 'no es un id valido').isMongoId(),
    check('id').custom(userExistById),
validation
],deleteUser)


//undelete users
router.patch('/:id',[
    check('id', 'no es un id valido').isMongoId(),
    check('id').custom(userExistById),
validation
],undeleteUser)





module.exports = router;