// All the Middleware goes here
const middlewareObj = {};
const Superhero = require("../models/superhero")
const Comment = require("../models/comment")

middlewareObj.checkSuperheroOwnership = (req, res, next) => {
    req.isAuthenticated() ? 
            Superhero.findById(req.params.id, ((err, foundSuperhero) => {
                err ? (req.flash("error", "Superhero not found"), res.redirect("back"))
                : (foundSuperhero.author.id.equals(req.user._id) ? next() 
                    : (req.flash("error", "You dont have permission to do that"), res.redirect("back")))     
            })) 
        :( req.flash("error", "You need to be logged in to do that"), res.redirect("back"))
}

middlewareObj.checkCommentOwnership = (req, res, next) => {
    req.isAuthenticated() ? 
            Comment.findById(req.params.comment_id, ((err, foundComment) => {
                err ? res.redirect("back") 
                : (foundComment.author.id.equals(req.user._id) ? next() 
                    : (req.flash("error", "You dont have permission to do that"), res.redirect("back")))      
            })) 
        : (req.flash("error", "You need to be logged in to do that"), res.redirect("back"));
}

middlewareObj.isLoggedIn = (req, res, next) => {
    req.isAuthenticated() ? next(): (req.flash("error", "You need to be logged in to do that!"), res.redirect("/login"))
}

module.exports = middlewareObj