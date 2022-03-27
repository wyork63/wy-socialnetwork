const { Thought, User } = require("../models");

const thoughtController = {
    // get all thoughts
    async getAllThoughts(req, res) {
        try {
          const dbThought = await Thought.find({}).populate({ path: "reactions", select: "-__v" }).select("-__v");
          if (!dbThought) return res.status(400).json({ message: "Bad Request!" });
          res.json(dbThought);
        } catch (err) {
          res.status(500).json(err);
        }
      },
    
    // create a thought
    async createThought({ body }, res) {
        try {
          const dbThought = await Thought.create(body);
          const dbUser = await User.findOneAndUpdate({ _id: body.userId }, { $push: { thoughts: dbThought.id } }, { new: true });
          res.json({ dbThought, dbUser, message: "A thought was successfully created" });
        } catch (err) {
          res.status(500).json(err);
        }
      },

    // get a thought by id /api/thoughts/:id

    // update a thought by id 

    // delete a thought by id 

    // create a reaction stored in a single thoughts reaction array  

    // delete a reaction by its id 
  };

module.exports = thoughtController;