const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const getChallengeSchema = new Schema({
    name:String,
    about:String,
    instructions:String,
    mix_group:String,
    match_group: String
});

const getChallengeModel = mongoose.model('getChallengeData', getChallengeSchema, 'getChallengeDataCollection');

module.exports = getChallengeModel;
