import express from "express";
import mongoose from "mongoose";
import Book from "./model/book.model";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());
const uri = "mongodb://127.0.0.1:27017/biblio";

mongoose.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) console.log(err);
    else console.log("Mongo database connected successfully");
  }
);

app.get("/", (req, res) => {
  res.send("Hello Express");
});

app.get("/books", (req, res) => {
  Book.find((err, books) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(books);
    }
  });
});

app.get("/books/search", (req, res) => {
//   let page = parseInt(req.query.page);
  //   let size = req.query.size;
//   console.log("page", page);
  Book.paginate({}, { page: 1, limit: 5 }, (err, books) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(books);
    }
  });
});

app.get("/books/:id", (req, res) => {
  Book.findById(req.params.id, (err, book) => {
    if (err) {
      res.status(403).send(err);
    } else {
      res.send(book);
    }
  });
});

app.put("/books/:id", (req, res) => {
  Book.findByIdAndUpdate(req.params.id, req.body, (err, book) => {
    if (err) {
      res.status(403).send(err);
    } else {
      res.send("Book updated Successfully");
    }
  });
});
app.delete("/books/:id", (req, res) => {
  Book.findByIdAndDelete(req.params.id, (err, book) => {
    if (err) {
      res.status(403).send(err);
    } else {
      res.send("Book deleted Successfully");
    }
  });
});
app.post("/books", (req, res) => {
  const body = req.body;
  const book = new Book(body);
  book.save((err) => {
    if (err) res.send(err);
    else res.send(book);
  });
});

app.listen(8085, () => {
  console.log("Server started on port 8085");
});
