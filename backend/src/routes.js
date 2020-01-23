const express = require('express');
const multer = require('multer');
const uploadConfigs = require('./config/upload');
const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');

const routes = new express.Router();

const upload = multer(uploadConfigs);

routes.get('/post', PostController.index);
routes.post('/post', upload.single('image'), PostController.store);

routes.post('/post/:id/like', LikeController.store);

module.exports = routes;