const Product = require('../models/campground');
const Review = require('../models/review');
const Order = require('../models/order');
const User = require('../models/user');
const review = require('../models/review');
module.exports.insertOrder = async(req,res)=>{
    const product = await Product.findById(req.params.id);
    const user = await User.findById(req.user._id);
    user.orders.push(product);
    await user.save();
    req.flash('success','Added to cart');
    req.flash('success',"Don't forget to leave a review");
    res.redirect(`/products/${req.params.id}`);
}

module.exports.showOrder = async(req,res)=>{
    const user = await User.findById(req.user._id).populate('orders');
    if (!user) {
        req.flash('error', 'Cannot find that user!');
        return res.redirect('/products');
    }
    // console.log(user);
    res.render('order/cart',{user});
}

module.exports.newOrder = async(req,res)=>{
    const user = await User.findById(req.user._id).populate('orders');
    const order = new Order({
        userId: req.user._id,
        products: user.orders
    });
    user.orders = [];
    await order.save();
    await user.save();
    res.redirect('/order/your');
}

module.exports.yourOrder = async(req,res)=>{
    const orders = await Order.find({userId : req.user._id}).populate('products');
    console.log(orders[0]);
   const order = orders[0];
    res.render('order/yourOrder',{order});
}
