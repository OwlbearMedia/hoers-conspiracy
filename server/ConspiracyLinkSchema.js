const mongoose = require('mongoose');

const { Schema } = mongoose;

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

module.exports = conspiracyLinkSchema;
