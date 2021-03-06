const express = require('express'),
    app = express(),
    flash = require("connect-flash"),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    Superhero = require("./models/superhero"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    seedDB = require("./seeds"),
    methodOverride = require("method-override");



// Requiring Routes
const   commentRoutes = require("./routes/comments"),
        superheroRoutes = require("./routes/superheroes"),
        indexRoutes = require("./routes/index");
        
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
console.log(process.env.DATABASEURL)

mongoose.set('useUnifiedTopology', true);
// mongoose.connect("mongodb://localhost/super_camp", {useNewUrlParser:true})
mongoose.connect(process.env.DATABASEURL, {useNewUrlParser:true, useCreateIndex: true})
    .then(() => console.log("Connected to DB"))
    .catch(err => console.log("Error!", err.message))

mongoose.set('useFindAndModify', false);

// seedDB(); // Seed the Database

// PASSPORT CONFIG
app.use(require("express-session")({
    secret: "Thanos is the best MCU villain",
    resave: false, 
    saveUninitialized: false
}))

app.use(flash())
app.use(passport.initialize());
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error")
    res.locals.success = req.flash("success")
    next();
})

app.use("/", indexRoutes);
app.use("/superheroes", superheroRoutes);
app.use("/superheroes/:id/comments", commentRoutes);

var port = process.env.PORT || 3000;
app.listen(port, process.env.IP, () => console.log("Server has started on port 3000"))