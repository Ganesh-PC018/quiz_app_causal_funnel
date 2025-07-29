import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './pages/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import QuizPage from './pages/QuizPage';
import ResultPage from './pages/ResultPage';

const customStyles = `
  .bg-gradient-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  }
  
  .bg-gradient-success {
    background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%) !important;
  }
  
  .bg-gradient-info {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  }
  
  .bg-gradient-warning {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%) !important;
  }
  
  .quiz-card {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  
  .quiz-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.15) !important;
  }
  
  .shadow-2xl {
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
  }
  
  @media (max-width: 768px) {
    .display-1 { font-size: 3rem !important; }
    .display-4 { font-size: 1.5rem !important; }
  }
`;

function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [resultData, setResultData] = useState(null);

  const startQuiz = () => {
    setQuizStarted(true);
    setQuizSubmitted(false);
    setResultData(null);
  };

  const submitQuiz = (data) => {
    setResultData(data);
    setQuizSubmitted(true);
    setQuizStarted(false);
  };

  const restartQuiz = () => {
    setQuizStarted(false);
    setQuizSubmitted(false);
    setResultData(null);
  };

  return (
    <AuthProvider>
      <Router>
        <style>{customStyles}</style>
        <Toaster 
          position="top-center" 
          reverseOrder={false}
          toastOptions={{
            duration: 4000,
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          }}
        />
        
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          <Route path="/" element={
            <ProtectedRoute>
              {!quizStarted && !quizSubmitted && (
                <Dashboard startQuiz={startQuiz} />
              )}
              {quizStarted && !quizSubmitted && (
                <QuizPage submitQuiz={submitQuiz} />
              )}
              {quizSubmitted && resultData && (
                <ResultPage resultData={resultData} restartQuiz={restartQuiz} />
              )}
            </ProtectedRoute>
          } />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
