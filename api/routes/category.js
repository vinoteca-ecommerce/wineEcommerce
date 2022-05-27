const { Router } = require("express");
const { check } = require("express-validator");
const {
  postCategory,
  getCategories,
  getCategoriesId,
  categoryUpdate,
  deleteCategory,
} = require("../controllers/category");
const { jwtValidator, adminRole } = require("../middlewares");
const { categoryValidator } = require("../helpers/db-validators");
const { validation } = require("../middlewares/validator");

const router = Router();

router.get("/", getCategories);

router.get("/:id", getCategoriesId);

router.post(
  "/",
  [jwtValidator, check("name", "Name is required").not().isEmpty(), validation],
  postCategory
);

router.put(
  "/:id",
  [
    jwtValidator,
    check("name", "name is required").not().isEmpty(),
    check("id", "id must be valid").isMongoId(),
    check("id").custom(categoryValidator),
    validation,
  ],
  categoryUpdate
);

router.delete(
  "/:id",
  [
    jwtValidator,
    adminRole,
    check("id", "id must be valid").isMongoId(),
    check("id").custom(categoryValidator),
    validation,
  ],
  deleteCategory
);

module.exports = router;
