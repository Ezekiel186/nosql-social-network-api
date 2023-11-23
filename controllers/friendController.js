const User = require('../models');

module.exports = {
    async addFriend(req, res) {
  try {
    const { userId, friendId } = req.body;

    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.friends.includes(friendId)) {
      return res.status(400).json({ message: 'User is already in friends list' });
    }

    user.friends.push(friendId);
    await user.save();

    friend.friends.push(userId);
    await friend.save();

    res.status(200).json({ message: 'Friend added successfully' });
  } catch (err) {
    console.error({ message: err });
    res.status(500).json(err);
  }
},

async getFriends(req, res) {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId).populate('friends', 'username');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.friends);
  } catch (err) {
    console.error({ message: err });
      res.status(500).json(err);
    }
},

async deleteFriend(req, res) {
    try {
      const { userId, friendId } = req.body;
  
      const user = await User.findById(userId);
      const friend = await User.findById(friendId);
  
      if (!user || !friend) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.friends = user.friends.filter(id => id.toString() !== friendId);
      await user.save();
  
      friend.friends = friend.friends.filter(id => id.toString() !== userId);
      await friend.save();
  
      res.status(200).json({ message: 'Friend removed from friends list' });
    } catch (err) {
        console.error({ message: err });
        res.status(500).json(err);
      }
  },
};