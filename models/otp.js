const mongoose = require('mongoose');

const otpSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    otp: { type: Number, required: true },
    user_id: { type: String, required:true }
});

module.exports = mongoose.model('otp', otpSchema);