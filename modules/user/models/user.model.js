const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const types = mongoose.types;

const userSchema = new Schema({
        full_name: {type: String, required: false},
        username: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        join_date: {type: Date, required: true, default: new Date}
})

const User = mongoose.model("user", userSchema);

module.exports = User;