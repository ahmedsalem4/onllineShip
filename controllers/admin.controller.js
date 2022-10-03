const  validationResult  = require("express-validator").validationResult;
const productModles = require("../models/products.model");
exports.getAdd = (req,res,next)=>{
    res.render("add-product" , {
        isUser: true,
        isAdmin: true,
         pageTitle:"addProduct",
        mongErr: req.flash("validationerrsy")[0]
    })
}

exports.postAdd = (req , res , next )=>{
    if(validationResult(req).isEmpty()){
        console.log(req.body);
        console.log(req.file.filename);
        productModles.getAddProudct(req.file.filename,req.body).then(
            () =>{
                req.flash("addad" , true)
                res.redirect("/admin/add");
            }
        ).catch(
            (err)=>{
                next(err)
            
            }
        )
    }else{
        req.flash("validationerrsy",validationResult(req).array());
        res.redirect("/admin/add")
    }
 
}