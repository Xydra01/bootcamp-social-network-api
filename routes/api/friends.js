const router = require('express').Router();
const User = require('../../models/User');

router.post('/:userId/friends/:friendId', async (req, res) => {
  const { userId, friendId } = req.params;

  console.log('POST /api/users/:userId/friends/:friendId');
  console.log('userId:', userId);
  console.log('friendId:', friendId);

  try {
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ error: 'User or friend not found' });
    }

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

router.delete('/:userId/friends/:friendId', async (req, res) => {
  const { userId, friendId } = req.params;

  console.log('DELETE /api/users/:userId/friends/:friendId');
  console.log('userId:', userId);
  console.log('friendId:', friendId);

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.friends = user.friends.filter((id) => id.toString() !== friendId);
    await user.save();
    console.log('Updated user friends:', user.friends);
    res.json(user);
  } catch (error) {
    console.error('Error removing friend:', error);
    res.status(500).json({ error: 'Failed to remove friend' });
  }
});

module.exports = router;
