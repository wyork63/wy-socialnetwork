const router = require("express").Router();

// set the requirements once the thought controllers are set up
const { getAllThoughts, 
    createThought, 
    // getSingleThought, 
    // updateSingleThought, 
    // removeThought, 
    // addReaction, 
    // removeReaction
 } = require("../../controllers/thought-controller");

// get all thoughts and post them
router.route("/").get(getAllThoughts).post(createThought);

// get, update, and delete thought
// router.route("/:id").get(getSingleThought).put(updateSingleThought).delete(removeThought);

// create a reaction with the thought ID
// router.route("/:thoughtId/reactions").post(addReaction);

// delete a reaction with the reaction ID
// router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;