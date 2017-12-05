'use strict';
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    text: {type: String, default: ''}
});

TodoSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Todo', TodoSchema);