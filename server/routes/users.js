import express from 'express';
import User from '../models/User.js';
import FavoriteLocation from '../models/FavoriteLocation.js';
import SearchHistory from '../models/SearchHistory.js';

const router = express.Router();

// Get user favorites
router.get('/:userId/favorites', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const favorites = await FavoriteLocation.find({ userId }).sort({ createdAt: -1 });
    res.json(favorites);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ error: 'Failed to fetch favorites' });
  }
});

// Add favorite location
router.post('/:userId/favorites', async (req, res) => {
  try {
    const { userId } = req.params;
    const { city, country } = req.body;
    
    // Check if already exists
    const existingFavorite = await FavoriteLocation.findOne({ userId, city });
    if (existingFavorite) {
      return res.status(400).json({ error: 'Location already in favorites' });
    }
    
    const favorite = new FavoriteLocation({
      userId,
      city,
      country
    });
    
    await favorite.save();
    res.status(201).json(favorite);
  } catch (error) {
    console.error('Error adding favorite:', error);
    res.status(500).json({ error: 'Failed to add favorite' });
  }
});

// Remove favorite location
router.delete('/:userId/favorites/:favoriteId', async (req, res) => {
  try {
    const { userId, favoriteId } = req.params;
    
    await FavoriteLocation.findOneAndDelete({ _id: favoriteId, userId });
    res.status(204).send();
  } catch (error) {
    console.error('Error removing favorite:', error);
    res.status(500).json({ error: 'Failed to remove favorite' });
  }
});

// Get search history
router.get('/:userId/history', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const history = await SearchHistory.find({ userId })
      .sort({ searchedAt: -1 })
      .limit(10);
      
    res.json(history);
  } catch (error) {
    console.error('Error fetching search history:', error);
    res.status(500).json({ error: 'Failed to fetch search history' });
  }
});

export default router;