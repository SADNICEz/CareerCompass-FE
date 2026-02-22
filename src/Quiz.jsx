import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Quiz.css";

const quizData = [
  {
    question: "Python คืออะไร?",
    options: ["ภาษาโปรแกรมมิ่ง", "ฐานข้อมูล", "ระบบปฏิบัติการ", "เว็บเบราว์เซอร์"],
    answer: "ภาษาโปรแกรมมิ่ง",
  },
  {
    question: "Machine Learning คืออะไร?",
    options: ["การเรียนรู้ของเครื่องจักร", "การสอนคอมพิวเตอร์", "ระบบปฏิบัติการ", "โปรแกรมคำนวณ"],
    answer: "การเรียนรู้ของเครื่องจักร",
  },
  {
    question: "Vscode คืออะไร?",
    options: ["การเรียนรู้ของเครื่องจักร", "การสอนคอมพิวเตอร์", "ระบบปฏิบัติการ", "Code editor"],
    answer: "Code editor",
  },
];

function Quiz() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [message, setMessage] = useState("");
  const startedAtRef = useRef(Date.now());

  const handleChange = (questionIdx, value) => {
    setAnswers((prev) => ({ ...prev, [questionIdx]: value }));
    setMessage("");
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < quizData.length) {
      setMessage("กรุณาตอบคำถามให้ครบทุกข้อ");
      return;
    }

    const totalQuestions = quizData.length;
    const correctCount = quizData.reduce((count, item, idx) => {
      if (answers[idx] === item.answer) {
        return count + 1;
      }
      return count;
    }, 0);
    const incorrectCount = totalQuestions - correctCount;
    const progress = Math.round((correctCount / totalQuestions) * 100);
    const elapsedMinutes = Math.max(1, Math.round((Date.now() - startedAtRef.current) / 60000));

    navigate("/quiz/result", {
      state: {
        totalQuestions,
        correctCount,
        incorrectCount,
        progress,
        elapsedMinutes,
      },
    });
  };

  return (
    <div className="quiz-page">
      <main className="quiz-main">
        <h1 className="quiz-title">แบบทดสอบความรู้</h1>

        <section className="quiz-card">
          <h3 className="quiz-card-title">Foundations Stage Quiz</h3>
          <p className="quiz-card-subtitle">เริ่มต้นสร้างพื้นฐานที่แข็งแกร่ง</p>

          {quizData.map((item, idx) => (
            <div key={idx} className="quiz-question-block">
              <p className="quiz-question-text">
                {idx + 1}. {item.question}
              </p>

              <div className="quiz-options-grid">
                {item.options.map((option) => (
                  <label key={option} className="quiz-option">
                    <input
                      type="radio"
                      name={`question-${idx}`}
                      value={option}
                      checked={answers[idx] === option}
                      onChange={() => handleChange(idx, option)}
                    />
                    <span className="quiz-option-label">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          {message && <p className="quiz-message error">{message}</p>}

          <div className="quiz-actions">
            <button type="button" className="quiz-submit-btn" onClick={handleSubmit}>
              เสร็จสิ้น
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Quiz;

