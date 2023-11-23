const { Post } = require('../models');

module.exports = {
  async getPosts(req, res) {
    try {
      const posts = await Post.find()
        .populate({ path: 'users', select: '-__v' });

      res.json(posts);
    } catch (err) {
      console.error({ message: err });
      res.status(500).json(err);
    }
  },
  async getSinglePost(req, res) {
    try {
      const post = await Post.findOne({ _id: req.params.postId })
        .populate({ path: 'users', select: '-__v' });

      if (!post) {
        return res.status(404).json({ message: 'No post with that ID' });
      }

      res.json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createPost(req, res) {
    try {
      const post = await Post.create(req.body);
      res.json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updatePost(req, res) {
    try {
      const post = await Post.findOneAndUpdate(
        { _id: req.params.postId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!post) {
        return res.status(404).json({ message: 'No post with this id!' });
      }

      res.json(post);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
