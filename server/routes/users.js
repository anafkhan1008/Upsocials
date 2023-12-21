const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');


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



//get all the users 

router.get("/all" , async (req , res) =>{
  try {
    const users = await User.find();
    res.status(200).json(users)
  }
  catch(err) {
    console.log(err)
  }
})
// update user
// router.put("/:id", async (req, res) => {
//   if (req.body.userId === req.params.id || req.body.isAdmin) {
//     if (req.body.password) {
//       try {
//         const salt = await bcrypt.genSalt(10);
//         req.body.password = await bcrypt.hash(req.body.password, salt);
//       } catch (err) {
//         return res.status(500).json(err);
//       }
//     }
//     try {
//       const user = await User.findByIdAndUpdate(req.params.id, {
//         $set: req.body,
//       });
//       res.status(200).json("Account has been updated");
//     } catch (err) {
//       return res.status(500).json(err);
//     }
//   } else {
//     return res.status(403).json("You can update only your account!");
//   }
// });

router.post('/upload', upload.single('image'), async (req, res) => {
  console.log("uploading.........")
  try {
    res.status(200).json({ imageUrl: req.file.location });
  } catch (err) {
    res.status(500).json(err);
  }
});



// Express router handling the PUT request
router.put('/:id', async (req, res) => {
  const userId = req.params.id;
  const userData = req.body;
  console.log(userData)
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, userData, { new: true });
     console.log(updatedUser)
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User information updated successfully', user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: 'Error updating user information', error: err.message });
  }
});



//delete user
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can delete only your account!");
  }
});

//get a user

router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});



router.get("/following/:userId" , async(req , res) =>{
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);
    const friends = await Promise.all (
      user.followings.map(friendId => {
        return User.findById(friendId)
      })
    )
    let friendList = [];
    friends.map((friend) =>{
      const {_id , username , profilePicture } = friend;
      friendList.push({_id , username , profilePicture});
    });
    res.status(200).json(friendList )
     
  }
  catch(err){
    res.status(500).json(err);


  }

})





router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you allready follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
});

//unfollow a user

router.put("/:id/unfollow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if (user.followers.includes(req.body.userId)) {
          await user.updateOne({ $pull: { followers: req.body.userId } });
          await currentUser.updateOne({ $pull: { followings: req.params.id } });
          res.status(200).json("user has been unfollowed");
        } else {
          res.status(403).json("you dont follow this user");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("you cant unfollow yourself");
    }
  });


  router.get('/:id/followingStatus', async (req, res) => {
 
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const loggedInUser = await User.findById(req.body.currentUserId);
      if (!loggedInUser) {
        return res.status(404).json({ message: 'Logged-in user not found' });
      }
  
      const isFollowing = loggedInUser.followings.includes(req.params.userId);
  
      res.status(200).json({ isFollowing });
    } catch (err) {
      res.status(500).json({ message: 'Server Error' });
    }
  });

  
  router.post('/upload', upload.single('image'), async (req, res) => {
    try {
      res.status(200).json({ imageUrl: req.file.location });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

module.exports = router;