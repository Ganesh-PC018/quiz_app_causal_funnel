import express from 'express';
import {saveEmail,submitQuiz,getReportByEmail} from '../controllers/quizController.js';

const router = express.Router();
router.post('/save-email',saveEmail);
router.post('/submit-quiz',submitQuiz);
router.get('/report/:email',getReportByEmail);

export default router;
