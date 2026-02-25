import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mbtiQuestions } from "./data/mbtiQuestions";
import "./FormMbti.css";

export default function FormMbti() {
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const handleChange = (qid, value) => {
    setAnswers((prev) => ({ ...prev, [qid]: value }));
  };

  const calculateMbti = () => {
    const score = {
      E: 0, I: 0,
      S: 0, N: 0,
      T: 0, F: 0,
      J: 0, P: 0,
    };

    Object.values(answers).forEach((v) => score[v]++);

    const type =
      (score.E >= score.I ? "E" : "I") +
      (score.S >= score.N ? "S" : "N") +
      (score.T >= score.F ? "T" : "F") +
      (score.J >= score.P ? "J" : "P");

    return { type, score };
  };

  const handleSubmit = () => {
    const result = calculateMbti();

    navigate(`/mbti/${result.type.toLowerCase()}`, {
      state: { score: result.score },
    });
  };

  return (
    <div className="mbti-container">
      <div className="mbti-header">
        <h1 className="mbti-title">แบบสอบถามบุคลิกภาพ MBTI</h1>
        <p className="mbti-subtitle">
          โปรดเลือกคำตอบที่ตรงกับตัวคุณมากที่สุด ไม่มีถูกหรือผิด
        </p>
      </div>

      {mbtiQuestions.map((q, index) => (
        <div key={q.id} className="question-card">
          <p className="question-title">
            {index + 1}. {q.text}
          </p>

          {q.options.map((opt) => (
            <label key={opt.value} className="option">
              <input
                type="radio"
                name={`q-${q.id}`}
                checked={answers[q.id] === opt.value}
                onChange={() => handleChange(q.id, opt.value)}
              />
              {opt.label}
            </label>
          ))}
        </div>
      ))}

      <button
        className="submit-btn"
        disabled={Object.keys(answers).length < mbtiQuestions.length}
        onClick={handleSubmit}
      >
        ดูผลลัพธ์
      </button>
    </div>
  );
}