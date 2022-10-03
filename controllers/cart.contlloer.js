const cartModle = require("../models/cart.model");
const validationResulty = require("express-validator").validationResult;

exports.getCart = (req, res, next) =>{
    cartModle.getItemByUser(req.session.userId).then(
        (itemsy)=>{
            res.render("cart",
                {
                    items:itemsy,
                    isUser:req.session.userid,
                    isAdmin:req.session.isAdmin, 
                     pageTitle:"PageCart",
                    mongErr: req.flash("validationerrsy")[0]
                }
            )
        }
    ).catch( err =>console.log(err))
}
exports.postCart = (req,res,next) =>{

    
    if(validationResulty(req).isEmpty()){
        cartModle.addNewItem(
            {
                name:req.body.name,
                price :req.body.price,
                amount: req.body.amount,
                productId : req.body.productId,
                userId : req.session.userId,
                tiemstamp:Date.now()
            }
        ).then(()=>{
                res.redirect("/cart")
            }).catch(
                (err)=>{
                    console.log(err);
                }
            )
    }else{
        req.flash("validationerrsy",validationResulty(req).array());
        
        res.redirect(req.body.redirectTo);
    }
}
exports.postSave = (req, res ,next) =>{

    if(validationResulty(req).isEmpty()){
        cartModle.editItem(req.body.cartId ,{  amount:req.body.amount ,tiemstamp:Date.now() }).then(
            ()=>{
            res.redirect("/cart")
        }).catch(
            (err)=>{
                console.log(err);
            }
        )
    }else{
        req.flash("validationerrsy",validationResulty(req).array());
        
        console.log(req.flash("validationerrsy",validationResulty(req).array()[0]))
        res.redirect("/cart");
    }   
    }


    exports.postDelete = (req,res,next) => {
        cartModle.deleteItem(req.body.cartId).then(
            ()=>{
                res.redirect("/cart")
            }).catch(
                (err)=>{
                    console.log(err);
                }
            )
        

    }