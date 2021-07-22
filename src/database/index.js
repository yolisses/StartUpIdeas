import Sequelize from 'sequelize';

import Vote from '../models/Vote.js';
import Idea from '../models/Idea.js';
import User from '../models/User.js';
import Comment from '../models/Comment.js';

import { data } from '../config/config.js';

const env = process.env.NODE_ENV;
console.log('env', env);
const dbConfig = data[env || 'development']; // Change later

const connection = new Sequelize(dbConfig);

Idea.init(connection);
Vote.init(connection);
User.init(connection);
Comment.init(connection);

Vote.associate(connection.models);
Idea.associate(connection.models);
User.associate(connection.models);
Comment.associate(connection.models);

export default connection;
