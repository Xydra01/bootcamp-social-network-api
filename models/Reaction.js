const mongoose = require('mongoose');
const { Schema } = mongoose;

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
      required: true,
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => new Date(createdAtVal).toLocaleString(),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const Reaction = mongoose.model('Reaction', reactionSchema);

module.exports = { reactionSchema, Reaction };
