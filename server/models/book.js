var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
  _id: {type: mongoose.Schema.ObjectId, auto: true},
  __v: {type: Number, select: false},
  title: String,
  description: String,
  author: String,
  length: Number,
  publisher: String,
  publicationDate: String
});

bookSchema.virtual('id').get(function(){
    console.log('this', this);
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
bookSchema.set('toJSON', {
    virtuals: true
});

var Book = mongoose.model('Book', bookSchema);

module.exports = Book;