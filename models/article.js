// Include the Mongoose Dependencies
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true
  },
  url: {
    type: String,
    trim: true,
    required: true
  },
  date: {
  	type: Date,
    required: true
  }
});

// Create the Model
var Article = mongoose.model("Article", ArticleSchema);

// Export it for use elsewhere
module.exports = Article;
