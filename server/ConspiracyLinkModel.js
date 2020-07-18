const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conspiracyLinkSchema = new Schema({
  pointA: {
    type: Schema.Types.ObjectId,
    ref: 'ConspiracyNode',
    required: true
  },
  pointB: {
    type: Schema.Types.ObjectId,
    ref: 'ConspiracyNode',
    required: true
  },
  description: String,
});

const ConspiracyLink = mongoose.model('ConspiracyLink', conspiracyLinkSchema);

module.exports = conspiracyLinkSchema;
