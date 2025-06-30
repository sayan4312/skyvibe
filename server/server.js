import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import weatherRoutes from './routes/weather.js';
import userRoutes from './routes/users.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


let isDatabaseConnected = false;


if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      console.log('✅ Connected to MongoDB');
      isDatabaseConnected = true;
    })
    .catch(err => {
      console.log('⚠️  MongoDB connection failed:', err.message);
      console.log('📝 Running in development mode without database functionality');
      console.log('💡 To enable database features, ensure MongoDB is running or use MongoDB Atlas');
      isDatabaseConnected = false;
    });
} else {
  console.log('📝 No MongoDB URI provided. Running without database functionality.');
  console.log('💡 Set MONGODB_URI in your .env file to enable database features');
}


const requireDatabase = (req, res, next) => {
  if (!isDatabaseConnected) {
    return res.status(503).json({ 
      error: 'Database not available',
      message: 'This feature requires a database connection. Please set up MongoDB to use this functionality.'
    });
  }
  next();
};

// Routes
app.use('/api/weather', weatherRoutes);
app.use('/api/users', requireDatabase, userRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Weather API is running',
    database: isDatabaseConnected ? 'Connected' : 'Not connected',
    features: {
      weather: 'Available',
      favorites: isDatabaseConnected ? 'Available' : 'Requires database',
      searchHistory: isDatabaseConnected ? 'Available' : 'Requires database'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
});