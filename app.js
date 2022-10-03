const DB_URL = "mongodb+srv://elmkn:0107025478@cluster0.xionep9.mongodb.net/Online-Shop?retryWrites=true&w=majority";

//الاكسبريس والباس 
const express = require("express");
const path = require("path");
//الروتير المستدعاه 
const homeRouter = require("./routes/home.routes")
const productRouter = require("./routes/product.routes");
const authRouter = require("./routes/auth.routes");
const cartRouter = require("./routes/cart.routes");
const adminRouter  = require("./routes/admin.routes")
const app = express();

//السيشن  والكوننيت منجو سيشن 
const session = require("express-session");
const SessionStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash");
//الفولدرات الثابته على السيريفير 
app.use(express.static(path.join(__dirname,"assets")));
app.use(express.static(path.join(__dirname,"images")));


//سيتنج لاستخدام التمبيلت انجيت 
app.set("view engine" , "ejs");
app.set("views" , "views");

//الفلاش ده خاص بالفيو علشان كده بتستخدمه مباشرة بعد التمليت انجي 
app.use(flash());



//هنا انت بتحديد هو هيحفظ السيشن فين فانت بتقوله هتحفظه فى الداتا بيز دي 
//وكمان فى البرميطر الثاني اديلتو اسم الجدول اللى هينشاءه علشان ضيف جوه السيشن
const STORE = new SessionStore({
    uri:DB_URL,
    collection:"sessiones",

})

app.use(session({
    //هنا انت بتقوله استخدم النص ده فى التشيفير 
    secret:" this is silkrod come pvp im strong str your mick",
   //هنا بتقوله متحفظش البينات غير لما اديلك امر الحفظ لو تروي بتقوله احفظ البينات مباشرة
    saveUninitialized:false,
    resave:true,
    store:STORE,
    cookie : {
        maxAge:24*60*60*100
    }
}))


//الرويتر المستخدمه من الاستدعاه 
app.use("/",homeRouter); 
app.use(authRouter);
app.use("/product",productRouter);
app.use("/cart",cartRouter);
app.use("/admin",adminRouter);

app.get("/notadmin" , (req,res,next)=>{
    res.status(403);
    res.render("notAdmin",{
        isUser:req.session.userId,
        isAdmin:false
    })
})
app.get("/error", (req ,res ,next)=>{
    res.status(500);
    res.render("err.ejs",{
        isUser:req.session.userId,
        isAdmin:req.session.isAdmin
    })
}); 

app.use( (error,req ,res ,next)=>{
    res.redirect("/error")
});

app.use((req ,res ,next)=>{
    res.status(404);
    res.render("notFound",{
        isUser:req.session.userId,
        isAdmin:req.session.isAdmin,
        pageTitle:"notFound"
    })
});
const port = process.env.PORT || 3000  
//السيريفير الخاص بيك 
app.listen(port, () =>{
    console.log(["Port","localhost:3000"]);
})


