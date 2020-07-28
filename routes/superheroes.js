const express = require("express")
const router = express.Router()
const Superhero = require("../models/superhero")
const middleware = require("../middleware")


//==================================================================================

// Routes
router.get("/", (req, res) => {
   // Get all superheroes from DB
    Superhero.find({}, (err, allSuperheroes) => {
        err ? console.log(err) : res.render("superheroes/index", {superheroes: allSuperheroes})
    })

})
// Create new superhero
router.post("/", middleware.isLoggedIn, (req, res) => {
    const {name, image, affiliation, description} = req.body
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newSuperHero = {
        name: name,
        image: image,
        affiliation, affiliation,
        description: description,
        author: author
    }
    
    Superhero.create(newSuperHero, (err, newlyCreated) => {
        err ? console.log(err) : res.redirect("/superheroes")
    })
    
})

router.get("/new", middleware.isLoggedIn, (req, res) => {
    res.render("superheroes/new")
})

// SHOW - Shows more info about one superhero
router.get("/:id", (req, res) => {
    // find suphero with the provided ID
    Superhero.findById(req.params.id).populate("comments").exec((err, foundSuperhero) => {
        err ? console.log(err) : 
        (res.render("superheroes/show", {superhero: foundSuperhero}))      
    })
})

// edit superhero route
router.get("/:id/edit", middleware.checkSuperheroOwnership, (req, res) => {
    // is user logged in
            Superhero.findById(req.params.id, ((err, foundSuperhero) => { 
                res.render("superheroes/edit", {superhero: foundSuperhero})
            }))
})

// update superhero route
router.put("/:id", middleware.checkSuperheroOwnership, (req, res) => {
    // find and update correct superhero
    Superhero.findByIdAndUpdate(req.params.id, req.body, (err, updatedSuperhero) => {
        err ? res.redirect("/superheroes") : res.redirect(`/superheroes/${req.params.id}`)
    })
    // redirect
})
router.delete("/:id", middleware.checkSuperheroOwnership, async(req, res) => {
    try {
        let foundSuperhero = await Superhero.findById(req.params.id);
        await foundSuperhero.deleteOne();
        req.flash("success", "Successfully deleted post")
        res.redirect("/superheroes");
    } catch (error) {
        console.log(error.message);
        res.redirect("/superheroes");
    }
  });
// Destroy Route
// router.delete("/:id", (req, res) => {
//     Superhero.findByIdAndRemove(req.params.id, err => {
//         err ? res.redirect("/superheroes") : res.redirect("/superheroes")
//     })
// })

module.exports = router