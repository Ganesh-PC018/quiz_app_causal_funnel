import React from 'react';

const ResultPage = ({ resultData, restartQuiz }) => {
  const correctCount = resultData.filter(
    (q) => q.userAnswer === q.correctAnswer
  ).length;
  const scorePercentage = ((correctCount / resultData.length) * 100).toFixed(2);

  const getResultIcon = () => {
    if (scorePercentage >= 80) return <i className="bi bi-trophy-fill text-warning"></i>;
    if (scorePercentage >= 50) return <i className="bi bi-patch-check-fill text-success"></i>;
    return <i className="bi bi-emoji-frown-fill text-danger"></i>;
  };

  const getScoreColor = () => {
    if (scorePercentage >= 80) return 'text-warning';
    if (scorePercentage >= 50) return 'text-success';
    return 'text-danger';
  };

  return (
    <div className="container py-4">
      {/* Result Header Card */}
      <div className="card border-0 shadow-lg mb-4">
        <div className="card-body text-center py-5">
          <div className="display-1 mb-3">
            {getResultIcon()}
          </div>
          <h2 className="mb-3">Quiz Completed!</h2>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="row">
                <div className="col-4">
                  <div className="display-4 fw-bold">{correctCount}</div>
                  <p className="mb-0">Correct</p>
                </div>
                <div className="col-4">
                  <div className="display-4 fw-bold">{resultData.length - correctCount}</div>
                  <p className="mb-0">Wrong</p>
                </div>
                <div className="col-4">
                  <div className={`display-4 fw-bold`}>{scorePercentage}%</div>
                  <p className="mb-0">Score</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Question Results - Flex Row Cards */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-header bg-white border-0 py-3">
          <h5 className="mb-0">
            <i className="bi bi-list-check text-primary me-2"></i>
            Detailed Results
          </h5>
        </div>
        <div className="card-body">
          <div className="row">
            {resultData.map((q, idx) => (
              <div key={idx} className="col-lg-6 col-xl-4 mb-3">
                <div className={`card h-100 border-0 shadow-sm ${
                  q.userAnswer === q.correctAnswer ? 'border-success' : 'border-danger'
                }`} style={{borderWidth: '2px !important'}}>
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <span className="badge bg-primary">Q{idx + 1}</span>
                      {q.userAnswer === q.correctAnswer ? 
                        <i className="bi bi-check-circle-fill text-success fs-5"></i> :
                        <i className="bi bi-x-circle-fill text-danger fs-5"></i>
                      }
                    </div>
                    
                    <p className="card-text fw-bold mb-3" 
                       dangerouslySetInnerHTML={{ __html: q.question }} 
                       style={{fontSize: '0.9rem'}} />
                    
                    <div className="mb-2">
                      <small className="text-muted d-block">Your Answer:</small>
                      <div className={`p-2 rounded small ${
                        q.userAnswer === q.correctAnswer ? 
                        'bg-success-subtle text-success-emphasis' : 
                        'bg-danger-subtle text-danger-emphasis'
                      }`}>
                        <span dangerouslySetInnerHTML={{ __html: q.userAnswer }}/>
                      </div>
                    </div>
                    
                    {q.userAnswer !== q.correctAnswer && (
                      <div>
                        <small className="text-muted d-block">Correct Answer:</small>
                        <div className="p-2 rounded small bg-success-subtle text-success-emphasis">
                          <span dangerouslySetInnerHTML={{ __html: q.correctAnswer }}/>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="text-center">
        <button className="btn btn-primary btn-lg px-5 me-3" onClick={restartQuiz}>
          <i className="bi bi-arrow-clockwise me-2"></i>
          Take Another Quiz
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
