const { default: mongoose } = require("mongoose");

postSchema = mongoose.Schema({
    title: {type: String, require: true},
    content: {type: String, require: true},
});

// model() wlll export a constructor to make the object based on the defined schema
module.exports = mongoose.model("Post", postSchema);