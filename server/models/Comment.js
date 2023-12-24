const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({

    userId: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

module.exports = mongoose.model("Comment", CommentSchema);