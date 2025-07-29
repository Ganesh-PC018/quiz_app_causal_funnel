import React from 'react';

const Sidebar = ({ questions, answers, current, setCurrent }) => {
  return (
    <div className="card shadow-sm p-3 h-100">
      <h5 className="text-center fw-light border-bottom pb-2">
        <i className="bi bi-list-ol"></i> Question Palette
      </h5>
      <div className="d-flex flex-wrap gap-2 justify-content-center mt-3">
        {questions.map((q, idx) => {
          let btnClass = 'btn-outline-secondary';
          if (answers[q.id]) btnClass = 'btn-success'; // Answered
          if (current === idx) btnClass = 'btn-warning'; // Current

          return (
            <button
              key={idx}
              className={`btn btn-sm rounded-circle ${btnClass}`}
              style={{ width: '40px', height: '40px' }}
              onClick={() => setCurrent(idx)}
              title={`Question ${idx + 1}`}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;