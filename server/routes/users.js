const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");



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
//update user
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only your account!");
  }
});
///




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


//get all following of user

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

//follow a user

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

module.exports = router;