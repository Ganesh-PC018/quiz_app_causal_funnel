import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api/quiz';

const Dashboard = ({ startQuiz }) => {
  const { user, logout } = useAuth();
  const [quizHistory, setQuizHistory] = useState([]);
  const [stats, setStats] = useState({
    totalQuizzes: 0,
    bestScore: 0,
    averageScore: 0,
    totalCorrect: 0,
    totalQuestions: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuizHistory();
  }, []);

  const fetchQuizHistory = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/report/${user.email}`);
      const history = response.data;
      setQuizHistory(history);
      calculateStats(history);
    } catch (error) {
      console.error('Error fetching quiz history:', error);
      toast.error('Failed to load quiz history');
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (history) => {
    if (history.length === 0) return;

    const scores = history.map(quiz => {
      const correct = quiz.response.filter(q => q.userAnswer === q.correctAnswer).length;
      const total = quiz.response.length;
      return (correct / total) * 100;
    });

    const totalCorrect = history.reduce((acc, quiz) => {
      return acc + quiz.response.filter(q => q.userAnswer === q.correctAnswer).length;
    }, 0);

    const totalQuestions = history.reduce((acc, quiz) => acc + quiz.response.length, 0);

    setStats({
      totalQuizzes: history.length,
      bestScore: Math.max(...scores),
      averageScore: scores.reduce((a, b) => a + b, 0) / scores.length,
      totalCorrect,
      totalQuestions
    });
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="h3 mb-0">
                <i className="bi bi-speedometer2 text-primary me-2"></i>
                Quiz Dashboard
              </h1>
              <p className="text-muted mb-0">Welcome back, {user.email}!</p>
            </div>
            <button 
              className="btn btn-outline-danger"
              onClick={logout}
            >
              <i className="bi bi-box-arrow-right me-2"></i>
              Logout
            </button>
          </div>
        </div>
      </div>

      
      <div className="row mb-4">
        
        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card border-0 shadow-sm h-100" style={{backgroundColor:'#ccc'}}>
            <div className="card-body text-center">
              <div className="display-4 text-primary mb-2">
                <i className="bi bi-trophy-fill"></i>
              </div>
              <h5 className="card-title">Best Score</h5>
              <h3 className="text-primary mb-0">
                {stats.bestScore ? `${stats.bestScore.toFixed(1)}%` : 'N/A'}
              </h3>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center" style={{backgroundColor:'#ccc', borderRadius:'5px'}}>
              <div className="display-4 text-success mb-2">
                <i className="bi bi-graph-up"></i>
              </div>
              <h5 className="card-title">Average Score</h5>
              <h3 className="text-success mb-0">
                {stats.averageScore ? `${stats.averageScore.toFixed(1)}%` : 'N/A'}
              </h3>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card border-0 shadow-sm h-100" style={{backgroundColor:'#ccc'}}>
            <div className="card-body text-center">
              <div className="display-4 text-info mb-2">
                <i className="bi bi-clipboard-check"></i>
              </div>
              <h5 className="card-title">Total Quizzes</h5>
              <h3 className="text-info mb-0">{stats.totalQuizzes}</h3>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card border-0 shadow-sm h-100 " style={{backgroundColor:'#ccc'}}>
            <div className="card-body text-center">
              <div className="display-4 text-warning mb-2">
                <i className="bi bi-check-circle-fill"></i>
              </div>
              <h5 className="card-title">Accuracy</h5>
              <h3 className="text-warning mb-0">
                {stats.totalQuestions ? 
                  `${((stats.totalCorrect / stats.totalQuestions) * 100).toFixed(1)}%` : 
                  'N/A'
                }
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-12">
          <div className="card border-0 shadow-sm bg-dark text-light">
            <div className="card-body text-center py-5">
              <i className="bi bi-play-circle display-1 mb-3"></i>
              <h2 className="card-title mb-3">Ready for a New Challenge?</h2>
              <p className="card-text mb-4 fs-5">
                Test your knowledge with our comprehensive quiz featuring 15 multiple-choice questions
              </p>
              <button 
                className="btn btn-primary btn-lg px-5"
                onClick={startQuiz}
              >
                <i className="bi bi-rocket-takeoff me-2"></i>
                Start New Quiz
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0 py-3">
              <h5 className="mb-0">
                <i className="bi bi-clock-history text-primary me-2"></i>
                Recent Quiz History
              </h5>
            </div>
            <div className="card-body">
              {quizHistory.length === 0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-inbox display-1 text-muted mb-3"></i>
                  <p className="text-muted">No quiz history found. Take your first quiz!</p>
                </div>
              ) : (
                <div className="row ">
                  {quizHistory.slice(0, 6).map((quiz, index) => {
                    const correct = quiz.response.filter(q => q.userAnswer === q.correctAnswer).length;
                    const total = quiz.response.length;
                    const percentage = ((correct / total) * 100).toFixed(1);
                    const date = new Date(quiz.submittedAt).toLocaleDateString();
                    return (
                      <div key={index} className="col-lg-4 col-md-6 mb-3">
                        <div className="card border-0 shadow-sm h-100" style={{backgroundColor:'#ccc'}}>
                          <div className="card-body">
                            <div className="d-flex justify-content-between align-items-start mb-2">
                              <span className="badge bg-primary">Quiz #{index + 1}</span>
                              <small className="text-muted">{date}</small>
                            </div>
                            <div className="row text-center">
                              <div className="col">
                                <div className="fs-4 fw-bold text-success">{correct}</div>
                                <small className="text-muted">Correct</small>
                              </div>
                              <div className="col">
                                <div className="fs-4 fw-bold text-danger">{total - correct}</div>
                                <small className="text-muted">Wrong</small>
                              </div>
                              <div className="col">
                                <div className="fs-4 fw-bold text-primary">{percentage}%</div>
                                <small className="text-muted">Score</small>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
