const {Router} = require('express');
const { purchaseStatus , getPurchase, getPurchases , updateState } = require('../controllers/purchase');
const { jwtValidator, adminRole } = require('../middlewares')
const { validation } = require('../middlewares/validator')


const router = Router();

router.get('/', [
    jwtValidator,
], getPurchase);

router.get('/all', [
    jwtValidator,
    adminRole,
    validation
], getPurchases);

router.put('/:id', [
    jwtValidator,
    
],updateState)


router.post('/', jwtValidator , purchaseStatus);



module.exports = router;