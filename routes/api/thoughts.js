const router = require('express').Router();
const { Thought, User } = require('../models');

// GET to get all thoughts
router.get('/', async (req, res) => {
  try {
    const thoughts = await Thought.find().sort({ createdAt: -1 });
    res.json(thoughts);
  } catch (error) {
    console.error('Error fetching thoughts:', error);
    res.status(500).json({ error: 'Failed to fetch thoughts' });
  }
});

// GET to get a single thought by its _id
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const thought = await Thought.findById(id);
    if (!thought) {
      return res.status(404).json({ error: 'Thought not found' });
    }
    res.json(thought);
  } catch (error) {
    console.error('Error fetching thought by ID:', error);
    res.status(500).json({ error: 'Failed to fetch thought' });
  }
});

// POST to create a new thought
router.post('/', async (req, res) => {
  const { thoughtText, username, userId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const thought = await Thought.create({ thoughtText, username });
    user.thoughts.push(thought._id);
    await user.save();

    res.status(201).json(thought);
  } catch (error) {
    console.error('Error creating thought:', error);
    res.status(500).json({ error: 'Failed to create thought' });
  }
});

// PUT to update a thought by its _id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { thoughtText } = req.body;

  try {
    const thought = await Thought.findByIdAndUpdate(
      id,
      { thoughtText },
      { new: true }
    );
    if (!thought) {
      return res.status(404).json({ error: 'Thought not found' });
    }
    res.json(thought);
  } catch (error) {
    console.error('Error updating thought:', error);
    res.status(500).json({ error: 'Failed to update thought' });
  }
});

// DELETE to remove a thought by its _id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const thought = await Thought.findByIdAndDelete(id);
    if (!thought) {
      return res.status(404).json({ error: 'Thought not found' });
    }
    res.json({ message: 'Thought deleted' });
  } catch (error) {
    console.error('Error deleting thought:', error);
    res.status(500).json({ error: 'Failed to delete thought' });
  }
});

module.exports = router;
