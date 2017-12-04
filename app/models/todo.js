const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    text: {type: String, default: ''}
});

module.exports = mongoose.model('Todo', TodoSchema);