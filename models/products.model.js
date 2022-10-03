
const mongoose = require("mongoose");
const DB_URL = "mongodb+srv://elmkn:0107025478@cluster0.xionep9.mongodb.net/Online-Shop?retryWrites=true&w=majority";

const productsSchema = mongoose.Schema(
    {

        name:String,
        price:Number,
        category:String,
        description:String,
        img:String
    }
);

const Product = mongoose.model("product",productsSchema)

exports.getAllProducts = () =>{

  return new Promise ( (resolve,reject) =>{
    mongoose.connect(DB_URL).then( () => {
                return Product.find({})

            }).then(products=>{
                mongoose.disconnect();
                resolve(products);

            }).catch( err => reject(err))
  })
}



exports.getProductsByQuery = (categoryQuery) =>{

    return new Promise ( (resolve,reject) =>{
      mongoose.connect(DB_URL).then( () => {
                  return Product.find({category:categoryQuery})
  
              }).then(products=>{
                  mongoose.disconnect();
                  resolve(products);
  
              }).catch( err => reject(err))
    })
  }
  
  exports.getAllProductId = (productId) =>{
    return new Promise ( (resolve,reject) =>{
        mongoose.connect(DB_URL).then( () => {
                    return Product.findById(productId);
    
                }).then(products=>{
                    mongoose.disconnect();
                    resolve(products);
    
                }).catch( err => reject(err))
      }) 
  }
  
  exports.getFirest = () =>{

    return new Promise ( (resolve,reject) =>{
        mongoose.connect(DB_URL).then( () => {
                    return Product.findOne({});
    
                }).then(products=>{
                    mongoose.disconnect();
                    resolve(products);
    
                }).catch( err => reject(err))
      })
  }



    exports.getAddProudct = (img,data) =>{
        return new Promise ( (resolve,reject) =>{
          
            mongoose.connect(DB_URL).then( () => {
                        let newprodact =  new Product(  {
                            name:data.name,
                            price:data.price,
                            category:data.category,
                            description:data.description,
                            img:img
                        })
                        return newprodact.save();
                    }).then(products=>{
                        mongoose.disconnect();
                        resolve("add");
        
                    }).catch( err => reject(err))
          })
            
  }
 