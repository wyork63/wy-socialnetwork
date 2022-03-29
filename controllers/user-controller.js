const { Thought, User } = require("../models");

const userController = {
    // get all users
    async getAllUsers(req, res) {
        try {
          const dbUser = await User.find({}).populate({ path: "thoughts", select: "-__v" }).populate({ path: "friends", select: "-__v" }).select("-__v");
          if (!dbUser) return res.status(400).json({ message: "Bad Request!" });
          res.json(dbUser);
        } catch (err) {
          res.status(500).json(err);
        }
      },
    
    // create a user
    async createUser({ body }, res) {
        try {
          const dbUser = await User.create(body);
          if (!dbUser) return res.status(400).json({ message: "Bad Request!" });
          res.json({ dbUser, message: "A user was created successfully" });
        } catch (err) {
          res.status(500).json(err);
        }
      },

    // get a user by id /api/user/:id
    async getSingleUser({ params }, res) {
      try {
        const dbUser = await User.findOne({ _id: params.id }).populate({ path: "thoughts", select: "-__v" }).select("-__v");
        if (!dbUser) return res.status(404).json({ message: "Can not find user with this id!" });
        res.json(dbUser);
      } catch (err) {
        res.status(500).json(err);
      }
    },

    // update a user by id 
    async updateSingleUser({ params, body }, res) {
      try {
        const dbUser = await User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidator: true });
        if (!dbUser) return res.status(404).json({ message: "Can not find user with this id!" });
        res.json({ dbUser, message: "The user was updated successfully" });
      } catch (err) {
        res.status(500).json(err);
      }
    },

    // remove/delete a user by id 
    async removeUser({ params }, res) {
      try {
        const dbUser = await User.findOneAndDelete({ _id: params.id });
        if (!dbUser) return res.status(404).json({ message: "Can not find a user with this id!" });
        const dbThought = await Thought.deleteMany({ _id: { $in: dbUser.thoughts } });
        res.json({ dbUser, dbThought, message: "The user was removed successfully" });
      } catch (err) {
        res.status(500).json(err);
      }
    },

    // add a new friend to a users friend list
    async addFriend({ params }, res) {
      try {
        const dbFriend = await User.findOneAndUpdate({ _id: params.userId }, { $push: { friends: params.friendId } }, { new: true });
        if (!dbFriend) return res.status(404).json({ message: "Can not find a user with this id!" });
        res.json({ dbFriend, message: "The new friend was added" });
      } catch (err) {
        res.status(500).json(err);
      }
    },

    // delete friend
    async removeFriend({ params }, res) {
      try {
        const dbFriend = await User.findOneAndUpdate({ _id: params.userId }, { $pull: { friends: params.friendId } }, { new: true });
        if (!dbFriend) return res.status(404).json({ message: "Can not find a user with this id!" });
        res.json({ dbFriend, message: "The friend was removed successfully" });
      } catch (err) {
        res.status(500).json(err);
      }
    },  
  };

module.exports = userController;