const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const challengeSchema = new Schema({
    mix:String,
    match:String,
    idea:String,
    name:String,
    code: String
});

const challengeModel = mongoose.model('challengeData', challengeSchema, 'challengeDataCollection');

module.exports = challengeModel;