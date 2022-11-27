const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Order = require('./order')
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    orders:[
        {
            type:Schema.Types.ObjectId,
            ref:'Product'
        }
    ]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);