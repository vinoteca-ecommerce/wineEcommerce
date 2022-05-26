const {Router} = require('express');
const { check } = require('express-validator');
const { postProduct, getAll , getProduct, productUpdate, deleteProduct } = require('../controllers/products');
const {jwtValidator, adminRole} = require('../middlewares')
const { validation } = require('../middlewares/validator')
const { categoryValidator , productIdValidator} =require('../helpers/db-validators')


const router = Router();


router.get('/',getAll)

router.get('/:id', getProduct)

router.post('/', [
    jwtValidator, 
    check('name', 'The name is required').not().isEmpty(),
    check('category', 'Not a Mongo id valid').isMongoId(),
    check('category').custom(categoryValidator),
    validation,
], postProduct );


router.put('/:id',[
    jwtValidator,
    check('id').isMongoId(),
    check('id').custom(productIdValidator),
    validation
] ,productUpdate)

router.delete('/:id',[
    jwtValidator,
    adminRole,
    check('id', 'This id doesnt exist').isMongoId(),
    check('id').custom(productIdValidator),
    validation
], deleteProduct)


module.exports = router;