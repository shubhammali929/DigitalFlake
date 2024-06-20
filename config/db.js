// ./config/db.js
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://shubhammali929:ObDJqu9ddCeW66VF@cluster0.3l0prq0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    // Exit process with failure
    process.exit(1);
  }
};

export { connectDB }; // Exporting connectDB as a named export
