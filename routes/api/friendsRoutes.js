const express = require('express');
const router = express.Router();
const {
  addFriend,
  getFriends,
  deleteFriend,
} = require('../../controllers/friendController');

router.post('/add', addFriend);

router.get('/user/:userId', getFriends);

router.delete('/delete', deleteFriend);

module.exports = router;