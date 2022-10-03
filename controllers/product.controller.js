
const productModles = require("../models/products.model");
exports.getProduct = (req ,res ,next) =>{

    const id = req.params.id;

    productModles.getAllProductId(id).then(
        (product)=>{
            res.render( "product",{
                product:product,
                isUser:req.session.userid,
                isAdmin:req.session.isAdmin,
                mongErr: req.flash("validationerrsy")[0]
            })
        }
    )


}

exports.getProductFirest  = (req ,res ,next) =>{
    
    productModles.getFirest().then(
        (product)=>{
            res.render( "product",{
                product:product,
                isUser:req.session.userid,
                isAdmin:req.session.isAdmin,
                pageTitle:"Product",
                mongErr: req.flash("validationerrsy")[0]
            })
        }
    )


}