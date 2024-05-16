const express = require('express');
const router = express.Router({ mergeParams: true });
const Thought = require('../../models/Thought');

router.delete('/:reactionId', async (req, res) => {
  const { thoughtId, reactionId } = req.params;

  try {
    const thought = await Thought.findById(thoughtId);
    if (!thought) {
      return res.status(404).json({ error: 'Thought not found' });
    }

    console.log('Thought:', thought);
    console.log('Reactions:', thought.reactions);

    const reactionIndex = thought.reactions.findIndex(
      (reaction) => reaction.reactionId.toString() === reactionId.toString()
    );

    console.log('Reaction Index:', reactionIndex);

    if (reactionIndex === -1) {
      return res.status(404).json({ error: 'Reaction not found' });
    }

    thought.reactions.splice(reactionIndex, 1);
    const updatedThought = await thought.save();

    res.json(updatedThought);
  } catch (error) {
    console.error('Error deleting reaction:', error);
    res.status(500).json({ error: 'Failed to delete reaction' });
  }
});

module.exports = router;
