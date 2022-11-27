const express = require('express');
const router = express.Router();
const products = require('../controllers/campgrounds');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');

const Campground = require('../models/campground');

router.route('/')
    .get(catchAsync(products.index))
    .post(isLoggedIn, validateCampground, catchAsync(products.createCampground))

router.get('/new', isLoggedIn, products.renderNewForm)

router.route('/:id')
    .get(catchAsync(products.showCampground))
    .put(isLoggedIn, isAuthor, validateCampground, catchAsync(products.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(products.deleteCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(products.renderEditForm))



module.exports = router;