const posts = [
    'Test Post 1',
    'Test Post 2',
    'Test Post 3',
  ];
  
  const users = [
    {
      username: 'user0',
      posts: [
        {
          published: true,
          description: 'First Post',
        },
      ],
      friends: ['user1'],
    },
    {
      username: 'user1',
      posts: [
        {
          published: true,
          description: 'Another Post',
        },
      ],
      friends: ['user0'],
    },
  ];
  
  const getRandomUser = () => getRandomArrItem(users);
  
  const getRandomPost = (int) => {
    let results = [];
    for (let i = 0; i < int; i++) {
      results.push({
        published: Math.random() < 0.5,
        description: getRandomArrItem(posts),
      });
    }
    return results;
  };
  
  module.exports = { getRandomUser, getRandomPost, users };
  