
const router = require("express").Router();
const authGuard = require("./guards/auth.guard");
const bodyparser = require("body-parser");
const check = require("express-validator").check;
const cartcontlloer = require("../controllers/cart.contlloer");

router.get("/",authGuard.isAuth,cartcontlloer.getCart)


router.post("/",authGuard.isAuth,bodyparser.urlencoded({extended:true}),
check("amount").not().isEmpty().withMessage("Enter amount")
.isInt({min:1}).withMessage("amount is not larger then 0"),
cartcontlloer.postCart);

router.post("/save" ,authGuard.isAuth,bodyparser.urlencoded({extended:true}),
check("amount").not().isEmpty().withMessage("Enter amount")
.isInt({min:1}).withMessage("amount is not larger then 0"),
cartcontlloer.postSave )


router.post("/delete" ,authGuard.isAuth,bodyparser.urlencoded({extended:true})

,cartcontlloer.postDelete)
module.exports = router;