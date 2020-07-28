const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user")


router.get("/", (req, res) => {
    res.render("landing")
})

router.get("/register", (req, res) => {
    res.render("register")
})

// handle sign up logic
router.post("/register", (req, res) => {
    const {username, password} = req.body
    User.register(new User({username: username}), password, (err, user) => {
        err ? (req.flash("error", err.message), res.redirect("/register")) :
        passport.authenticate("local")(req, res, () => {
            req.flash("success", `Welcome to YelpCamp ${user.username}`)
            res.redirect("/superheroes")
        })
    })
})

// Show Login form
router.get("/login", (req, res) => {
    res.render("login")
})
// Handle Log in Logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/superheroes",
        failureRedirect: "/login"
    }), (req, res) => {})

// Logout Route
router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success", "Successfully, Logged you out")
    res.redirect("/superheroes")
})

 module.exports = router