const {Router} = require('express');
const { postProduct, getWines } = require('../controllers/products')

const router = Router();



router.get('/', getWines);

router.post('/', postProduct);



module.exports = router;