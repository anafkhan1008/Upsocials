const mongoose = require("mongoose");
const Comment = require("./Comment");

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
    comments: [Comment.schema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);