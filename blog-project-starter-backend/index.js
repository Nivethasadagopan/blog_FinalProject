// server.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require("cors");
const multer = require("multer");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve uploaded images
app.use("/uploads", express.static("uploads"));

// -----------------------------
// MULTER STORAGE CONFIG
// -----------------------------
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// -----------------------------
// MONGOOSE CONNECTION
// -----------------------------
// mongoose.connect('mongodb://localhost:27017/blogDB')
//   .then(() => console.log("Connection Successful"))
//   .catch(err => console.log(err));
   mongoose.connect(process.env.MONGO_URI) 
     .then(() => console.log("MongoDB connected")) 
     .catch(err => console.log(err));
// -----------------------------
// BLOG SCHEMA (FINAL VERSION)
// -----------------------------
const blogSchema = new mongoose.Schema({
  newTitle: String,
  newContent: String,
  date: String,
  likes: Number,
  image: String   // <-- supports optional image
});

const Blog = mongoose.model('Blog', blogSchema);

// -----------------------------
// ROUTES
// -----------------------------

// GET ALL BLOGS
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.send(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// LIKE A BLOG
app.patch('/api/blogs/like/:id', async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.json(updatedBlog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE BLOG (WITH OPTIONAL IMAGE)
app.post('/api/blogs', upload.single("image"), async (req, res) => {
  const blog = new Blog({
    newTitle: req.body.newTitle,
    newContent: req.body.newContent,
    date: req.body.date,
    likes: req.body.likes,
    image: req.file ? `/uploads/${req.file.filename}` : null
  });

  try {
    const newBlog = await blog.save();
    res.status(201).json({
      message: "Blog Added Successfully",
      blog: newBlog
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE BLOG (WITH OPTIONAL IMAGE)
app.patch('/api/blogs/:id', upload.single("image"), async (req, res) => {
  try {
    const updatedData = {
      newTitle: req.body.newTitle,
      newContent: req.body.newContent
    };

    if (req.file) {
      updatedData.image = `/uploads/${req.file.filename}`;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.json({
      message: "Blog Updated Successfully",
      blog: updatedBlog
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE BLOG
app.delete('/api/blogs/:id', async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);

    if (!deletedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.json({ message: 'Blog deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// -----------------------------
// START SERVER
// -----------------------------
app.listen(5000, () => console.log('Server running on port 5000'));
