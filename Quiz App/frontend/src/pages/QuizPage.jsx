import React, { useEffect, useState } from 'react';
import QuestionCard from './QuestionCard';
import Sidebar from './Sidebar';
import { useAuth } from '../context/AuthContext'; // ✅ Add this
import axios from 'axios';
import { toast } from 'react-hot-toast';
const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api/quiz';
const QuizPage = ({submitQuiz }) => {
  const { user } = useAuth();           
  const email = user?.email;   
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(1800); // 30 min = 1800 seconds
  const [current, setCurrent] = useState(0);
  if (!email) {
  toast.error("User not logged in. Please login again.");
  return;
}

  useEffect(() => {
    axios
      .get('https://opentdb.com/api.php?amount=15&type=multiple')
      .then((res) => {
        const formatted = res.data.results.map((q, index) => ({
          ...q,
          id: index,
          options: [...q.incorrect_answers, q.correct_answer].sort(
            () => Math.random() - 0.5
          ),
        }));
        setQuestions(formatted);
      })
      .catch(() => toast.error('Failed to load questions.'));
  }, []);

  const handleSubmit = async () => {
    const report = questions.map((q) => ({
      question: q.question,
      userAnswer: answers[q.id] || 'Unanswered',
      correctAnswer: q.correct_answer,
    }));
    // console.log(report);
    try{
      await axios.post(`${BASE_URL}/submit-quiz`,{
        email:email,
        response:report,
      });
      submitQuiz(report);
      // console.log(report);
      toast.success("Quiz submitted successfully.");
    }catch(error){
      toast.error('Failed to submit Quiz.Please try again.');
    }
    
  };

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [answers, questions]); // Rerun effect dependency to include handleSubmit context

  const handleAnswer = (id, answer) => {
    setAnswers({ ...answers, [id]: answer });
  };

  const formatTime = () => {
    const min = Math.floor(timeLeft / 60);
    const sec = timeLeft % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const goToNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    }
  };

  const goToPrev = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  if (questions.length === 0) {
    return (
      <div className="text-center p-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading Questions...</p>
      </div>
    );
  }

  return (
    <div className="row">
      <div className="col-lg-3 mb-3 mb-lg-0">
        <Sidebar
          questions={questions}
          answers={answers}
          current={current}
          setCurrent={setCurrent}
        />
      </div>
      <div className="col-lg-9">
        <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded-top">
          <h5 className="mb-0">
            <i className="bi bi-clock-history text-danger"></i> {formatTime()}
          </h5>
          <button className="btn btn-sm btn-danger" onClick={handleSubmit}>
            Submit Quiz <i className="bi bi-check2-circle"></i>
          </button>
        </div>
        <QuestionCard
          data={questions[current]}
          selected={answers[questions[current].id]}
          onAnswer={handleAnswer}
        />
        <div className="d-flex justify-content-between mt-3">
          <button className="btn btn-secondary" onClick={goToPrev} disabled={current === 0}>
            <i className="bi bi-arrow-left"></i> Previous
          </button>
          <button
            className="btn btn-primary"
            onClick={goToNext}
            disabled={current === questions.length - 1}
          >
            Next <i className="bi bi-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;