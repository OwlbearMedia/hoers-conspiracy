const mongoose = require('mongoose');
const ConspiracyLink = require('./ConspiracyLinkSchema');
const ConspiracyNode = require('./ConspiracyNodeSchema');

const { Schema } = mongoose;

const conspiracyBoardSchema = new Schema({
  nodes: [ConspiracyNode],
  links: [ConspiracyLink],
  description: String,
  title: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  conspirators: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
});

const ConspiracyBoard = mongoose.model('ConspiracyBoard', conspiracyBoardSchema);

module.exports = ConspiracyBoard;
