const { Router } = require("express");
const { jwtValidator } = require("../middlewares");
const { validation } = require("../middlewares/validator");
const { check } = require("express-validator");
const { postAdress } = require('../controllers/adress');

const router = Router();




router.post('/',[jwtValidator], postAdress);


module.exports = router ;