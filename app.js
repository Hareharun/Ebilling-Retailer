var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    cookieParser    = require("cookie-parser"),
    LocalStrategy   = require("passport-local"),
    flash           = require("connect-flash"),
    User            = require("./models/user"),
    Product         = require("./models/product")
    session         = require("express-session"),
    methodOverride  = require("method-override");

//App Configure
mongoose.connect("mongodb://localhost/ebilling", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));
app.use(cookieParser('secret'));

//Passport configuration
app.use(require("express-session")({
    secret: "Property of half blood prince!",
    resave: false,
    saveUninitialized: false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Configure Flash
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
 });

 //Routes
//Show Login Form(Start Page)
app.get("/", function(req,res){
    res.render("login");
}); 

//handling login logic
app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/dashboard",
        failureRedirect: "/login"
    }), function(req, res){
});

// logout route
app.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "LOGGED YOU OUT!");
    res.redirect("/");
 });

//Show signup Page
app.get("/register", function(req,res){
    res.render("register");
});

//handle sign up logic
app.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
           req.flash("success", "Successfully Signed Up! Nice to meet you " + req.body.username);
           res.redirect("/dashboard"); 
        });
    });
});

//Show Dashboard
app.get("/dashboard", function(req,res){
    Product.find({}, function(err, allProducts){
        if(err){
            console.log(err);
        }else{
            res.render("dashboard", {products: allProducts});     
        }
    });
});

//Add Product Page
app.get("/addproduct", function(req,res){
    res.render("addproduct");
});

//Handling product add route
app.post("/addproduct", function(req,res){
    var newProduct = req.body.product;
    Product.create(newProduct, function(err,newlyCreated){
        if(err){
            req.flash("error", err.message);
            res.redirect("/addproduct");
        }else{
            req.flash("success", "Added Product Successfully");
            res.redirect("/dashboard");
        }
    });
});

//Bill Generate Page
app.get("/generatebill", function(req,res){
    Product.find({}, function(err, allProducts){
        if(err){
            console.log(err);
        }else{
            res.render("billgenerate", {products: allProducts});     
        }
    });
});

//Handling Bill Generate Logic
app.post("/generatebill", function(req,res){
    res.send(req.body.key);
})

//Add Staff Page
app.get("/addstaff",function(req,res){
    res.render("addstaff");
});

app.post("/addstaff", function(req,res){
    var newUser = req.body.user;
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.redirect("/addstaff");
        }else{
            req.flash("success", "Successfully Added " + user.username + " as " + user.role);
            return res.redirect("/dashboard");
        }
    })
});

 app.listen(3000, function(){
    console.log("The Ebilling Server Has Started!");
 });