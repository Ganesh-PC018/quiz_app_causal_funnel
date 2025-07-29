import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  email: { type: String, required: true },
  response: [   
    {
      question: String,
      userAnswer: String,
      correctAnswer: String,
    }
  ],
  submittedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Report', reportSchema);
