const connection = require('../config/connection');
const { User, Friend, Post } = require('../models');
const { getRandomUser, getRandomPost, users } = require('./data');

connection.once('open', async () => {
  try {
    await User.deleteMany({});
    await Friend.deleteMany({});
    await Post.deleteMany({});

    const seededUsers = await User.create(users);

    const seededFriends = [];
    seededUsers.forEach((user) => {
      const friends = getRandomUser(2);
      const friendIds = friends.map((friend) => friend._id);
      seededFriends.push(Friend.create({ user: user._id, friends: friendIds }));
    });
    await Promise.all(seededFriends);

    const seededPosts = [];
    seededUsers.forEach((user) => {
      const posts = getRandomPost(3);
      posts.forEach((post) => {
        seededPosts.push(Post.create({ user: user._id, ...post }));
      });
    });
    await Promise.all(seededPosts);

    console.log('seeding complete');
    connection.close();
  } catch (err) {
    console.error(err);
    connection.close();
  }
});
