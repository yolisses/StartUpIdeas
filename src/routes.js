import express from 'express';
import IdeaController from './controllers/IdeaController.js';
import VoteController from './controllers/VoteController.js';
import UserController from './controllers/UserController.js';
import CommentController from './controllers/CommentController.js';
import './database/index.js';

import auth from './middlewares/auth.js';

const routes = express.Router();

routes.get('/idea/:id', IdeaController.findOne);
routes.get('/idea/', IdeaController.index);
routes.get('/ideas_ids', IdeaController.get_ids);
routes.get('/idea/page/:page', IdeaController.index);
routes.post('/idea', auth, IdeaController.add);
routes.get('/ideas_total_count', IdeaController.total_count);
// routes.delete('/idea/:id', IdeaController.remove);
// routes.put('/idea/:id', IdeaController.update);

routes.post('/login', UserController.login);

routes.get('/idea/:id/comments', CommentController.index);
routes.post('/idea/:id/comments', auth, CommentController.add);

routes.get('/idea/:id/vote', VoteController.count);
routes.get('/idea/:idea_id/user/:user_id/vote', VoteController.countAndVoted);
routes.post('/idea/:id/vote', auth, VoteController.add);
routes.delete('/idea/:id/vote', auth, VoteController.remove);

routes.get('/user/:id', UserController.findOne);
routes.put('/user', auth, UserController.changeName);

export default routes;
