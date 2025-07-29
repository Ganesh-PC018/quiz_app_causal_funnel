import User from '../models/User.js';
import Report from '../models/Report.js';

export const saveEmail = async (req, res) => {
  const { email } = req.body;
//   console.log("Received Email:", email);

  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'Email is required and must be a string.' });
  }

  try {
    let user = await User.findOne({ email });

    if (user) {
    //   console.log('User already exists. Logging in...');
      return res.status(200).json({ message: 'Login successful', email, user });
    }

    user = new User({ email, createdAt: new Date() });
    await user.save();
    res.status(201).json({ message: 'User created successfully', email, user });
  } catch (error) {
    console.error('Save error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const submitQuiz = async (req, res) => {
  const { email, response } = req.body;
//   console.log("Submitting with email:", email);
//  console.log("Submitting report:", response);

  if (!email || !response) {
    return res.status(400).json({ error: 'Email and response are required.' });
  }

  try {
    const report = new Report({
      email,
      response,
      createdAt: new Date(),
      score: {
        correct: response.filter(q => q.userAnswer === q.correctAnswer).length,
        total: response.length,
        percentage: ((response.filter(q => q.userAnswer === q.correctAnswer).length / response.length) * 100).toFixed(2)
      }
    });
    
    await report.save();
    res.status(201).json({ message: 'Quiz submitted successfully.', report });
  } catch (err) {
    console.error('Submission error:', err.message);
    res.status(500).json({ error: 'Submission failed.' });
  }
};

export const getReportByEmail = async (req, res) => {
  const { email } = req.params;
  
  try {
    const reports = await Report.find({ email }).sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) {
    console.error('Fetch error:', err.message);
    res.status(500).json({ error: 'Fetching report failed.' });
  }
};
