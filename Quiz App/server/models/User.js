import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  createdAt:{
    type:Date,
    default:Date.now,
  }
});

export default mongoose.model('User', userSchema);
