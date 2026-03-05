import { useLocation, useNavigate } from "react-router-dom";
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
                            <button type="button" className="quiz-result-btn primary" onClick={() => navigate(-1)}>
                                ย้อนกลับ
                            </button>
                        </div>
                    </section>
                </main>
            </div>
        );
    }

    const {
        totalQuestions, correctCount, incorrectCount,
        progress, elapsedMinutes,
        careerName, stageName, careerSlug, stageId,
    } = result;

    const isPerfect = correctCount === totalQuestions;
    const headline = isPerfect ? "ยอดเยี่ยม! เก่งมาก! 🎉" : "ลองใหม่อีกครั้ง! 💪";
    const summary = `คุณทำข้อสอบได้ ${correctCount} จาก ${totalQuestions} ข้อ (${progress}%)`;
    const primaryButtonText = isPerfect ? "กลับไป Learning Path" : "ทำแบบทดสอบใหม่";

    const handlePrimaryAction = () => {
        if (isPerfect) {
            navigate(`/learningpath/${careerSlug || ""}`);
        } else {
            navigate(`/quiz/${encodeURIComponent(careerSlug || "general")}/${stageId}`, {
                state: { careerName, stageName, careerSlug, stageId },
            });
        }
    };

    return (
        <div className="quiz-result-page">
            <main className="quiz-result-main">
                {/* Breadcrumb */}
                <p style={{ fontSize: 13, color: "#888", marginBottom: 12 }}>
                    <span
                        style={{ color: "#ff6b00", cursor: "pointer", fontWeight: 600, textDecoration: "underline" }}
                        onClick={() => navigate(`/learningpath/${careerSlug || ""}`)}
                    >
                        {careerName || "Learning Path"}
                    </span>
                    {" › "}
                    <span>{stageName || "Quiz"}</span>
                    {" › "}
                    <span>ผลการทำแบบทดสอบ</span>
                </p>

                <header className="quiz-result-header">
                    <h1>ผลการทำแบบทดสอบ</h1>
                    <p>{stageName}</p>
                </header>

                <section className="quiz-result-card">
                    <div className="quiz-result-top">
                        <div className="quiz-result-icon">
                            <span style={{ fontSize: 40 }}>{isPerfect ? "🏆" : "📝"}</span>
                        </div>

                        <div className="quiz-result-overview">
                            <h2>{headline}</h2>
                            <p>{summary}</p>

                            <div className="quiz-progress-label-row">
                                <span>คะแนน</span>
                                <span>{progress}%</span>
                            </div>
                            <div className="quiz-progress-track">
                                <div className="quiz-progress-fill" style={{ width: `${progress}%` }} />
                            </div>
                        </div>
                    </div>

                    <div className="quiz-result-stats">
                        <div className="quiz-stat-item">
                            <div className="quiz-stat-icon" style={{ background: "#d1fae5", color: "#16a34a" }}>✓</div>
                            <div>
                                <p className="quiz-stat-value">{correctCount}</p>
                                <p className="quiz-stat-label">คำตอบถูก</p>
                            </div>
                        </div>
                        <div className="quiz-stat-item">
                            <div className="quiz-stat-icon" style={{ background: "#fee2e2", color: "#dc2626" }}>✗</div>
                            <div>
                                <p className="quiz-stat-value">{incorrectCount}</p>
                                <p className="quiz-stat-label">คำตอบผิด</p>
                            </div>
                        </div>
                        <div className="quiz-stat-item">
                            <div className="quiz-stat-icon">⏱</div>
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
                        <button
                            type="button"
                            className="quiz-result-btn ghost"
                            onClick={() => navigate(`/learningpath/${careerSlug || ""}`)}
                        >
                            กลับไป Learning Path
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default QuizResult;