const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const speechSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    inputText: { type: String, required: true },
    inputLanguage: {
      type: String,
      required: true,
    },
    outputText: {
      type: String,
      required: true,
    },
    outputLanguage: { type: String, required: true },
    timeCreated: { type: String, required: true },
    // Favourites
    isStarred: { type: Boolean, default: false },
    // Records that it was once cleared from main page
    isCleared: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Speech', speechSchema);
