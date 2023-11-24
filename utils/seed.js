const connection = require('../config/connection');
const { User, Friend, Post } = require('../models');
const { getRandomUser, getRandomPost, users } = require('./data');

connection.on('error', (err) => err);