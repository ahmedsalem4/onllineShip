const router = require("express").Router();

const productRouter = require("../controllers/product.controller");

router.get("/",productRouter.getProductFirest);
router.get("/:id",productRouter.getProduct);

module.exports = router ;