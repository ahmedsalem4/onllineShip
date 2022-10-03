
const mongoose = require("mongoose");
const DB_URL = "mongodb+srv://elmkn:0107025478@cluster0.xionep9.mongodb.net/Online-Shop?retryWrites=true&w=majority";

const cartSchema = mongoose.Schema(
    {

        name:String,
        price:Number,
        amount:Number,
        userId:String,
        productId:String,
        tiemstamp:Number
    }
);

const CartItem = mongoose.model("cart", cartSchema);

exports.addNewItem = (data) =>{

    return new Promise ((resolve,reject)=>{
        mongoose.connect(DB_URL)
        .then(
            ()=>{
         
                    let item = new CartItem(data); 
                    return item.save();
                }
        ).then(
                ()=>{
                    mongoose.disconnect();
                    resolve("adding");
                }).catch(
                    (err)=>{
                        mongoose.disconnect();
                        reject(err);
                    }
                )
    })
}

exports.getItemByUser = (userId) =>{

    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then( () => {
            return CartItem.find({userId:userId},null,{ sort:{ tiemstamp: -1}})
        } ).then(
                (items)=>{
                    mongoose.disconnect();
                    resolve(items)
                }
            ).then(
                (err)=>{
                    mongoose.disconnect();
                    reject(err)
                }
            )
    })
}


exports.editItem = (id , newData) => {

    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then( () => {
            return CartItem.updateOne({_id:id},newData,{sort:{tiemstamp: -1}})           
           
        } ).then(
                (items)=>{
                    mongoose.disconnect();
                    resolve(items)
                }
            ).then(
                (err)=>{
                    mongoose.disconnect();
                    reject(err)
                }
            )
    })

}


exports.deleteItem = (id) =>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then( () => {
           return CartItem.findByIdAndDelete(id)           
        } ).then(
                (items)=>{
                    mongoose.disconnect();
                    resolve(items)
                }
            ).then(
                (err)=>{
                    mongoose.disconnect();
                    reject(err)
                }
            )
    })
}