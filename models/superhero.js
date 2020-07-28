const mongoose = require("mongoose")
const Comment = require('./comment');

var superheroSchema = new mongoose.Schema({
    name: String, 
    image: String,
    affiliation : String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
})

superheroSchema.pre('remove', async function() {
	await Comment.remove({
		_id: {
			$in: this.comments
		}
	});
});
module.exports = mongoose.model("Superhero", superheroSchema)