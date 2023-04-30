const mongoose =  require("mongoose");


const blogSchema = new mongoose.Schema({
    blogTitle: {type: String, required: true},
    blogDesc: {type: String, required: true},
        blogPic: {type: String, required: true},
})

const Blog = new mongoose.model("BLOG",blogSchema);
    module.exports = Blog;