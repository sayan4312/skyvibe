import mongoose from 'mongoose';

const favoriteLocationSchema = new mongoose.Schema({
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
  country: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

favoriteLocationSchema.index({ userId: 1, city: 1 }, { unique: true });

export default mongoose.model('FavoriteLocation', favoriteLocationSchema);