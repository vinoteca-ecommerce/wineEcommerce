const {Router} = require('express');
const { postProduct } = require('../controllers/products')

const router = Router();


router.post('/', postProduct)



module.exports = router;