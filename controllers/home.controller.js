
const productsModel = require("../models/products.model");
const cartModle = require("../models/cart.model");

exports.getHome = (req,res,next)=>{
    let categoryQ =  req.query.category;
    let validCategory= ["clothes","phones","test"]
    if(categoryQ && validCategory.includes(categoryQ)){
        productsModel.getProductsByQuery(categoryQ).then(products=>{
          
            res.render('index' , {
                products:products,
                isUser:req.session.userid,
                isAdmin:req.session.isAdmin , 
                pageTitle:"Home",
                mongErr: req.flash("validationerrsy")[0]
             })
        })

    }else{
        productsModel.getAllProducts().then(products=>{
            
            res.render('index' , {
                products:products,
                isUser:req.session.userid,
                isAdmin:req.session.isAdmin , 
                pageTitle:"Home",
                mongErr: req.flash("validationerrsy")[0]
            })
        })
    }
}

