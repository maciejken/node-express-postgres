'use strict';
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    password: String,
    admin: Boolean
});

UserSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', UserSchema);