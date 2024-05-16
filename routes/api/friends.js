const router = require('express').Router();
const { User } = require('../models');

// POST to add a new friend to a user's friend list
router.post('/:userId/friends/:friendId', async (req, res) => {
  const { userId, friendId } = req.params;

  try {
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ error: 'User or friend not found' });
    }

    // Check if friend is already in the user's friend list
    if (user.friends.includes(friendId)) {
      return res.status(400).json({ error: 'Friend already added' });
    }

    user.friends.push(friendId);
    await user.save();

    res.json(user);
  } catch (error) {
    console.error('Error adding friend:', error);
    res.status(500).json({ error: 'Failed to add friend' });
  }
});

// DELETE to remove a friend from a user's friend list
router.delete('/:userId/friends/:friendId', async (req, res) => {
  const { userId, friendId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Remove friend from user's friend list
    user.friends = user.friends.filter((id) => id !== friendId);
    await user.save();

    res.json(user);
  } catch (error) {
    console.error('Error removing friend:', error);
    res.status(500).json({ error: 'Failed to remove friend' });
  }
});

module.exports = router;
