import mongoose from 'mongoose';

const searchHistorySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  searchedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

searchHistorySchema.index({ userId: 1, searchedAt: -1 });

export default mongoose.model('SearchHistory', searchHistorySchema);