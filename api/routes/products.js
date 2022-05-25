const {Router} = require('express');
const { check } = require('express-validator');
const { postProduct, getWines } = require('../controllers/products');
const { validation } = require('../middlewares/validator')
const { categoryValidator } =require('../helpers/db-validators')


const router = Router();



router.get('/', getWines);

router.post('/', [ 
    check('name', 'The name is required').not().isEmpty(),
    check('category', 'Not a Mongo id valid').isMongoId(),
    check('category').custom(categoryValidator),
    validation,
], postProduct );



module.exports = router;