const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conspiracyNodeSchema = new Schema({
  top: {
    type: Number,
    required: true
  },
  left: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  localTop: Number,
  localLeft: Number,
  isChild: Boolean,
  title: String,
  image: String,
  content: Object,
  children: [{ type: Schema.Types.ObjectId, ref: 'ConspiracyNode' }],
  parent: { type: Schema.Types.ObjectId, ref: 'ConspiracyNode' }
});

const ConspiracyNode = mongoose.model('ConspiracyNode', conspiracyNodeSchema);

module.exports = conspiracyNodeSchema;
