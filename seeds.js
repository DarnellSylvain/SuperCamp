const mongoose = require("mongoose");
const Superhero = require("./models/superhero");
const Comment = require("./models/comment");

var data = [
    {name: "Iron Man", image: "https://cnet2.cbsistatic.com/img/bZaqv6tPvT44-cop4ZL2gG3j5wE=/940x0/2020/01/17/7da55a03-ac5b-4ec1-b59b-6b3c2414e68b/egdt5idw4aittju.jpg", description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit donec consectetur semper nunc in molestie. Sed velit lectus, porttitor eu convallis sit amet, semper eget mauris. Integer in pulvinar mauris. Donec facilisis placerat magna sed cursus. Mauris vel tristique arcu. Duis congue orci id libero dictum sollicitudin. Curabitur dapibus arcu leo, condimentum tempus augue condimentum sed. Aliquam sed auctor ex. Nunc quis neque non eros dictum scelerisque ut ac urna. Etiam vel felis molestie, malesuada neque tempus, bibendum mauris. Nullam sit amet rhoncus nisl."},
    {name: "Hulk", image: "https://townsquare.media/site/442/files/2018/02/the-hulk.jpg?w=980&q=75", description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit donec consectetur semper nunc in molestie. Sed velit lectus, porttitor eu convallis sit amet, semper eget mauris. Integer in pulvinar mauris. Donec facilisis placerat magna sed cursus. Mauris vel tristique arcu. Duis congue orci id libero dictum sollicitudin. Curabitur dapibus arcu leo, condimentum tempus augue condimentum sed. Aliquam sed auctor ex. Nunc quis neque non eros dictum scelerisque ut ac urna. Etiam vel felis molestie, malesuada neque tempus, bibendum mauris. Nullam sit amet rhoncus nisl."},
    {name:"Thanos", image: "https://www.sideshow.com/storage/product-images/903429/thanos_marvel_feature.jpg", description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit donec consectetur semper nunc in molestie. Sed velit lectus, porttitor eu convallis sit amet, semper eget mauris. Integer in pulvinar mauris. Donec facilisis placerat magna sed cursus. Mauris vel tristique arcu. Duis congue orci id libero dictum sollicitudin. Curabitur dapibus arcu leo, condimentum tempus augue condimentum sed. Aliquam sed auctor ex. Nunc quis neque non eros dictum scelerisque ut ac urna. Etiam vel felis molestie, malesuada neque tempus, bibendum mauris. Nullam sit amet rhoncus nisl."},
]

const seedDB = () => {
    // Remove all camgrounds
    Superhero.deleteMany({}, err => {
        err ? console.log(err) : console.log("Removed all superheros!")
    // Add a few camgrounds
    data.map(seed => {
        Superhero.create(seed, (err, superhero) => {
            err ? console.log(err) : 
            console.log("Campground added"),
            // create a comment
            Comment.create({text: "This character is great, but he is an alcoholic", 
                            author: "BruzR 4D"}, (err, comment) => {
                            superhero.comments.push(comment);
                            superhero.save()
                            console.log("Create new comment")
                            })
        })
    })
})
    


    // Add a few comments
}

module.exports = seedDB;