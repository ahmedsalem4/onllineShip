
const router = require("express").Router();
const chek = require("express-validator").check;

const multer = require("multer");
const adminController = require("../controllers/admin.controller");

const adminGuards = require("./guards/auth.guard");

router.get("/add" , adminGuards.isAdmin,adminController.getAdd);
router.post("/add" , adminGuards.isAdmin,
 multer({storage:multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"images")
    },
    filename: (req,file,cb)=>{
        cb(null,Date.now() +"-" + file.originalname)
    }
 })
}).single("img"),
chek("img").custom((value,{req})=>{
    if(req.file){
        return true
    }else{
        throw " imge is required"
    }
})
,adminController.postAdd);

module.exports = router