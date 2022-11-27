const express = require('express');
const router = express.Router({ mergeParams: true });
const Product = require('../models/campground');
const Review = require('../models/review');
const Order = require('../models/order');
const orders = require('../controllers/order');
const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');

router.post('/:id', isLoggedIn, catchAsync(orders.insertOrder));
router.get('/cart',isLoggedIn, catchAsync(orders.showOrder));
router.get('/new',isLoggedIn,catchAsync(orders.newOrder));
router.get('/your',isLoggedIn,catchAsync(orders.yourOrder))


module.exports = router;