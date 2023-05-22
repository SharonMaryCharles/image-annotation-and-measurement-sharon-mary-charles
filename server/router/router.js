const route = require('express').Router();
const controller = require('../controller/controller');
const store = require('../middleware/multer');

route.get('/', controller.home); //homepage route
route.post('/uploadmultiple', store.array('images', 12), controller.uploads); //image upload route
route.get('/nextPage', controller.nextPage); //uploaded image route
route.get('/newimage/:id', controller.getImage); //selected image route

module.exports = route;