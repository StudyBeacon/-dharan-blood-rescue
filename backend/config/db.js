const mongoose = require('mongoose');
const { MONGO_URI } = process.env;

module.exports = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
    
    // Create indexes
    await mongoose.connection.db.collection('donors').createIndex({ location: '2dsphere' });
    await mongoose.connection.db.collection('drivers').createIndex({ currentLocation: '2dsphere' });
    
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};