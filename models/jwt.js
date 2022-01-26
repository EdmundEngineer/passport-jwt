const mongoose = require('mongoose');

const jwtSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    jwt: { type: String, required: true },
    user_id: { type: String, required:true }
});

module.exports = mongoose.model('jwt', jwtSchema);