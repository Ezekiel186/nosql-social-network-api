const router = require('express').Router();
const {
  getSinglePost,
  getPosts,
  createPost,
  updatePost,
  deletePost,
} = require('../../controllers/postController');

router.route('/').get(getPosts).post(createPost);

router.route('/:postId').get(getSinglePost);

router.route('/:postId/update').put(updatePost);

router.route('/:postId/delete').delete(deletePost);


module.exports = router;