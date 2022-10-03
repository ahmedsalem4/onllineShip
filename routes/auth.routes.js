
const router = require("express").Router();
const bodyParser= require("body-parser");
const chek = require("express-validator").check;
const authController = require("../controllers/auth.controller");

const notAuthguard = require("./guards/auth.guard");

router.get("/signup",notAuthguard.notAuth,authController.getsignup);

router.post("/signup",notAuthguard.notAuth,bodyParser.urlencoded({extended:true}),
chek("username").isString().not().isEmpty().withMessage(" userName is require"),
chek("email").isString().not().isEmpty().isEmail(),
chek("password").isLength({min:6}),
chek("confirmpassword").custom( (value,{req}) =>{
    if(value === req.body.password){
       return true
        
    }else{
        
        throw `${value} pswordes done equle ${req.body.password}`
    }
}) 
,
authController.postSignup );


router.get("/login",notAuthguard.notAuth,authController.getlogin);

router.post("/login",notAuthguard.notAuth , bodyParser.urlencoded({extended:true}),
chek("email").isString().withMessage("emailNotString").not().isEmpty().withMessage("email-is-Requierd")
.isEmail().withMessage("emailNotEmail"),
chek("password").isString().notEmpty().withMessage("passwoed-IS-Empty")
.isLength({min:6}).withMessage("password notSreong"),
authController.postLogin);

router.all("/logout",notAuthguard.isAuth,authController.logOut);
module.exports =  router;