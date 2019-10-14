const express = require('express');
const router = express.Router();

//import controller
const controller = require('../controller/AllController');

router.post('/movies', controller.getMovies);
router.post('/movies/add', controller.addMovies);
router.post('/movies/edit', controller.editMovies);
router.post('/movies/delete', controller.deleteMovies);

router.post('/category', controller.getCategory);
router.post('/category/add', controller.addCategory);
router.post('/category/edit', controller.editCategory);
router.post('/category/delete', controller.deleteCategory);

router.post('/connector', controller.getConnector);
router.post('/connector/add', controller.addConnector);
router.post('/connector/delete', controller.deleteConnector);

module.exports = router;
