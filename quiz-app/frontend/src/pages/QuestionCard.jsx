import React from 'react';

const QuestionCard = ({ data, selected, onAnswer }) => {
  return (
    <div className="card shadow-sm p-3 rounded-0 rounded-bottom">
      <h5 className="fw-normal" dangerouslySetInnerHTML={{ __html: `Q${data.id + 1}. ${data.question}` }} />
      <hr />
      <div className="mt-2 d-grid gap-2">
        {data.options.map((opt, idx) => (
          <button
            key={idx}
            className={`btn text-start ${
              selected === opt ? 'btn-primary' : 'btn-outline-secondary'
            }`}
            onClick={() => onAnswer(data.id, opt)}
            dangerouslySetInnerHTML={{ __html: opt }}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;