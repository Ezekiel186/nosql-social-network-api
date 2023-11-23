const { Users, Post } = require('../models');

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await Users.find({})
        .select('-__v');
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
    try {
      const user = await Users.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createUser(req, res) {
    try {
      const user = await Users.create(req.body);
      const post = await Post.findOneAndUpdate(
        { _id: req.body.postId },
        { $addToSet: { users: user._id } },
        { new: true }
      );

      if (!post) {
        return res
          .status(404)
          .json({ message: 'User created, but found no post with that ID' });
      }

      res.json('User Created');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
