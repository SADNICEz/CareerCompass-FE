import { useLocation, useNavigate } from "react-router-dom";
import formIcon from "./assets/form.png";
import "./QuizResult.css";

function QuizResult() {
  const location = useLocation();
  const navigate = useNavigate();

  const result = location.state;

  if (!result) {
    return (
      <div className="quiz-result-page">
        <main className="quiz-result-main">
          <section className="quiz-result-card">
            <h2 className="quiz-result-title">ยังไม่มีผลการทำแบบทดสอบ</h2>
            <p className="quiz-result-desc">กรุณาทำแบบทดสอบก่อนดูผลลัพธ์</p>
            <div className="quiz-result-actions">
              <button type="button" className="quiz-result-btn primary" onClick={() => navigate("/quiz")}>
                ไปทำแบบทดสอบ
              </button>
            </div>
          </section>
        </main>
      </div>
    );
  }

  const { totalQuestions, correctCount, incorrectCount, progress, elapsedMinutes } = result;
  const isPerfect = correctCount === totalQuestions;

  const headline = isPerfect ? "ยอดเยี่ยม! เก่งมาก!" : "ลองใหม่อีกครั้ง!";
  const summary = `คุณทำข้อสอบได้ ${correctCount} จาก ${totalQuestions} ข้อ (${progress}%)`;
  const primaryButtonText = isPerfect ? "ไป Stage ถัดไป" : "ทำแบบทดสอบใหม่อีกครั้ง";

  const handlePrimaryAction = () => {
    if (isPerfect) {
      navigate("/dashboard");
      return;
    }
    navigate("/quiz");
  };

  return (
    <div className="quiz-result-page">
      <main className="quiz-result-main">
        <header className="quiz-result-header">
          <h1>แบบทดสอบความรู้</h1>
          <p>ตรวจสอบความก้าวหน้าและทบทวนความรู้ของคุณ</p>
        </header>

        <section className="quiz-result-card">
          <div className="quiz-result-top">
            <div className="quiz-result-icon">
              <img src={formIcon} alt="Quiz" />
            </div>

            <div className="quiz-result-overview">
              <h2>{headline}</h2>
              <p>{summary}</p>

              <div className="quiz-progress-label-row">
                <span>ความคืบหน้า</span>
                <span>{progress}%</span>
              </div>

              <div className="quiz-progress-track">
                <div className="quiz-progress-fill" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </div>

          <div className="quiz-result-stats">
            <div className="quiz-stat-item">
              <div className="quiz-stat-icon">OK</div>
              <div>
                <p className="quiz-stat-value">{correctCount}</p>
                <p className="quiz-stat-label">คำตอบถูก</p>
              </div>
            </div>

            <div className="quiz-stat-item">
              <div className="quiz-stat-icon">X</div>
              <div>
                <p className="quiz-stat-value">{incorrectCount}</p>
                <p className="quiz-stat-label">คำตอบผิด</p>
              </div>
            </div>

            <div className="quiz-stat-item">
              <div className="quiz-stat-icon">TM</div>
              <div>
                <p className="quiz-stat-value">{elapsedMinutes} นาที</p>
                <p className="quiz-stat-label">เวลาที่ใช้</p>
              </div>
            </div>
          </div>

          <div className="quiz-result-actions">
            <button type="button" className="quiz-result-btn primary" onClick={handlePrimaryAction}>
              {primaryButtonText}
            </button>

            <button type="button" className="quiz-result-btn ghost" onClick={() => navigate("/dashboard")}>
              กลับไปยังหน้า Dashboard
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default QuizResult;
