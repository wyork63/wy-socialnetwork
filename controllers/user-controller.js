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

    // update a user by id 

    // delete a user by id 

    // add a new friend to a users friend list

    // delete friend  
  };

module.exports = userController;