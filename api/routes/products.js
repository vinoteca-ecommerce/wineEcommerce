const {Router} = require('express');
const { check } = require('express-validator');
const { postProduct, getAll , getProduct, productUpdate, deleteProduct, addFav, getFavs, deleteFavs, addToCart, getCart, deleteCart,getAllProducers,paymentMP, pushToCart, productUpdateComment } = require('../controllers/products');
const {jwtValidator, adminRole} = require('../middlewares')
const { validation } = require('../middlewares/validator')
const { categoryValidator , productIdValidator} =require('../helpers/db-validators')


const router = Router();


router.get('/',getAll)

router.get('/producer',getAllProducers)

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


router.post('/favs/:id',[
    jwtValidator,
    check('id', 'This id doesnt exist').isMongoId(),
    validation
],addFav)

router.get('/favs',[
    jwtValidator
],getFavs)

router.delete('/favs/:id',[
    jwtValidator,
    check('id', 'This id doesnt exist').isMongoId(),
    validation
],deleteFavs)

router.post('/cart/:id',[
    jwtValidator,
    check('id', 'This id doesnt exist').isMongoId(),
    validation
],addToCart)

router.post('/cart',[
    jwtValidator,
    //validation
],pushToCart)

router.get('/cart',[
    jwtValidator,
    validation
],getCart)

router.delete('/cart',[
    jwtValidator,
    validation
],deleteCart)


router.get('/:id', getProduct)


router.delete('/:id',[
    jwtValidator,
    adminRole,
    check('id', 'This id doesnt exist').isMongoId(),
    check('id').custom(productIdValidator),
    validation
], deleteProduct)

router.post('/payment', paymentMP)


router.put('/comment/:id',[
    jwtValidator]
     ,productUpdateComment)


module.exports = router;