const {Router} = require('express');
const { check } = require('express-validator');
const { purchaseStatus , getPurchase } = require('../controllers/purchase');
const { userExistById } = require('../helpers/db-validators');
const { jwtValidator } = require('../middlewares')
const { validation } = require('../middlewares/validator')


const router = Router();

router.get('/', jwtValidator, getPurchase)
router.post('/',jwtValidator, purchaseStatus)



module.exports = router;