const { Schema, model } = require('mongoose');

const bookSchema = new Schema(
  {

    name: {
      type: String,
      required: false,
      unique: true,
      trim: true
    },
    
  }
);

const Book = model('Book', bookSchema);

module.exports = Book;
