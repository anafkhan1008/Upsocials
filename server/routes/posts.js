const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
//create a post
//image upload for s3

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: 'ap-south-1',
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'upsocial-image-bucket',
    acl: 'public-read', 
    key: function (req, file, cb) {
      const filename = req.body.name;
      cb(null, filename);
    },
  }),
});
// 1702305542065-person1.png
router.post("/" , async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});



router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    res.status(200).json({ imageUrl: req.file.location });
  } catch (err) {
    res.status(500).json(err);
  }
});





router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("the post has been updated");
    } else {
      res.status(403).json("you can update only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//delete a post

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("the post has been deleted");
    } else {
      res.status(403).json("you can delete only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//like / dislike a post

router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//get a post

//get all post of user

router.get("/profile/:username" , async (req , res)=>{
  try {
    const user = await User.findOne({username : req.params.username});
    const posts = await Post.find({userId : user._id});
   res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);

  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get timeline posts

router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    console.log("currentUser:", currentUser);

    const userPosts = await Post.find({ userId: currentUser._id });
    console.log("userPosts:", userPosts);

    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    console.log("friendPosts:", friendPosts);

    res.json(userPosts.concat(...friendPosts));
  } catch (err) {
    console.error(err); 
    res.status(500).json(err);
  }
});


module.exports = router;