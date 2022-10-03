const mongoose = require("mongoose");
const DB_URL = "mongodb+srv://elmkn:0107025478@cluster0.xionep9.mongodb.net/Online-Shop?retryWrites=true&w=majority";

const bcrypt = require("bcrypt");

const userScheam = mongoose.Schema(
    {
        username:String,
        email:String,
        password :String,
        isAdmin:{
            type:Boolean,
            default:false
        }
    }
);

const User = mongoose.model("user",userScheam);


exports.cearteNewUser = (username,email,password) =>{

    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(
            ()=>{
                return User.findOne({email:email});
                }
            ).then(
                (user) =>{
                    
                    if(user){
                        mongoose.disconnect();
                        reject("email is used")
                    }else{
                        return bcrypt.hash(password,10)            
                    }
                }
            ).then(
                (hashPassword)=>{
                    let user = new User({
                        username:username,
                        email:email,
                        password:hashPassword
                    })
                    return user.save();
                   
                }).then( () =>{
                    mongoose.disconnect();
                     resolve("true")
                 }).catch(err =>{
                    mongoose.disconnect();
                    reject(err)});
    })
}




 exports.login = (email,password) =>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(
            ()=>{
                return User.findOne({email:email});
                }
            ).then(
                (user)=>{
                    if(!user){
                        mongoose.disconnect();
                        reject("Sorry accoun nout esiest");
                    }else{
                         bcrypt.compare(password , user.password).then(
                            (some)=>{
                            if(!some){
                                mongoose.disconnect();
                                reject("Sorry password is incorerect");
                            }else{
                                mongoose.disconnect();
                                resolve({id:user._id,isAdmin:user.isAdmin})
                            }
                        })
                        
                    }
                }).catch(
                    (err)=>{
                        mongoose.disconnect();
                        reject(err);
                        console.log(err);
                    }
                )
        });
 }