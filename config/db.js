const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Atlas connected');
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;