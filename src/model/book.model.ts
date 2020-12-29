import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";

let bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  price: { type: Number, required: true },
  publishDate: { type: Date, required: false, default: new Date() },
  isAvailable: { type: Boolean, required: true, default: true },
  quantity: { type: Number, required: true, default: 0 },
});

bookSchema.plugin(mongoosePaginate);

const Book = mongoose.model("Book", bookSchema);

export default Book;
