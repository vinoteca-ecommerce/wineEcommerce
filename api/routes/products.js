const {Router} = require('express');
const { check } = require('express-validator');
const { postProduct, getAll } = require('../controllers/products');
const { validation } = require('../middlewares/validator')
const { categoryValidator } =require('../helpers/db-validators')


const router = Router();





router.post('/', [ 
    check('name', 'The name is required').not().isEmpty(),
    check('category', 'Not a Mongo id valid').isMongoId(),
    check('category').custom(categoryValidator),
    validation,
], postProduct );


router.get('/',getAll)

module.exports = router;