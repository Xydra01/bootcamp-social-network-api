const express = require('express');
const router = express.Router({ mergeParams: true });
const Thought = require('../../models/Thought');

// POST to create a reaction stored in a single thought's reactions array field
router.post('/', async (req, res) => {
  const { thoughtId } = req.params;
  const { reactionBody, username } = req.body;

  try {
    const thought = await Thought.findById(thoughtId);
    if (!thought) {
      return res.status(404).json({ error: 'Thought not found' });
    }

    thought.reactions.push({ reactionBody, username });
    const updatedThought = await thought.save();

    res.status(201).json(updatedThought);
  } catch (error) {
    console.error('Error creating reaction:', error);
    res.status(500).json({ error: 'Failed to create reaction' });
  }
});

// DELETE to pull and remove a reaction by the reaction's reactionId value
router.delete('/:reactionId', async (req, res) => {
  const { thoughtId, reactionId } = req.params;

  try {
    // Check if the thought exists
    const thought = await Thought.findById(thoughtId);
    if (!thought) {
      return res.status(404).json({ error: 'Thought not found' });
    }

    // Debug log to see the thought object and its reactions
    console.log('Thought:', thought);
    console.log('Reactions:', thought.reactions);

    // Find the index of the reaction with the given ID
    const reactionIndex = thought.reactions.findIndex(
      (reaction) => reaction.reactionId.toString() === reactionId.toString()
    );

    // Debug log to see if the reaction was found
    console.log('Reaction Index:', reactionIndex);

    if (reactionIndex === -1) {
      return res.status(404).json({ error: 'Reaction not found' });
    }

    // Remove the reaction from the array
    thought.reactions.splice(reactionIndex, 1);
    const updatedThought = await thought.save();

    res.json(updatedThought);
  } catch (error) {
    console.error('Error deleting reaction:', error);
    res.status(500).json({ error: 'Failed to delete reaction' });
  }
});

module.exports = router;
