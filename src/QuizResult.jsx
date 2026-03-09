import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./QuizResult.css";

const API_BASE = "http://localhost:4546/api";

function QuizResult() {
    const location = useLocation();
    const navigate = useNavigate();
    const [completing, setCompleting] = useState(false);

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
        isLastStage, totalStages,
        passed, passScore,
    } = result;

    // ใช้ passed (≥8/10) แทน isPerfect (10/10)
    const hasPassed = passed ?? (correctCount === totalQuestions);
    const requiredPass = passScore ?? 8;

    const headline = hasPassed
        ? "ยอดเยี่ยม! ผ่านแล้ว! 🎉"
        : `ยังไม่ผ่าน ต้องได้ ${requiredPass}/${totalQuestions} ข้อขึ้นไป 💪`;

    const summary = `คุณตอบถูก ${correctCount} จาก ${totalQuestions} ข้อ (${progress}%)`;

    const primaryButtonText = hasPassed
        ? (isLastStage ? "เสร็จสมบูรณ์ 🎉" : "ไปด่านต่อไป 🚀")
        : "ทำแบบทดสอบใหม่";

    const handlePrimaryAction = async () => {
        if (hasPassed) {
            const storedUser = localStorage.getItem("user");
            const parsedUser = storedUser ? JSON.parse(storedUser) : null;
            const userId = parsedUser?.id || localStorage.getItem("user_id");

            if (userId && stageId) {
                try {
                    setCompleting(true);
                    await fetch(`${API_BASE}/learning-path/complete-stage`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            user_id: userId,
                            stage_id: stageId,
                            career_name: careerName || decodeURIComponent(careerSlug || ""),
                        }),
                    });
                } catch (_) {
                    // ถ้า API ล้มเหลว ยังคง navigate ได้
                } finally {
                    setCompleting(false);
                }
            }

            if (isLastStage) {
                navigate("/congratulation", { state: { careerName, careerSlug } });
            } else {
                navigate(`/learningpath/${careerSlug || ""}`);
            }
        } else {
            // Retry quiz — navigate back to quiz (backend will generate new questions)
            navigate(`/quiz/${encodeURIComponent(careerSlug || "general")}/${stageId}`, {
                state: { careerName, stageName, careerSlug, stageId, isLastStage, totalStages },
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
                            <span style={{ fontSize: 40 }}>{hasPassed ? "🏆" : "📝"}</span>
                        </div>

                        <div className="quiz-result-overview">
                            <h2>{headline}</h2>
                            <p>{summary}</p>

                            {/* Pass threshold indicator */}
                            <div className="quiz-pass-threshold">
                                <span
                                    className={`quiz-pass-badge-result ${hasPassed ? "pass" : "fail"}`}
                                >
                                    {hasPassed
                                        ? `✅ ผ่านเกณฑ์ (${correctCount}/${totalQuestions})`
                                        : `❌ ไม่ผ่านเกณฑ์ — ต้องได้ ${requiredPass}/${totalQuestions} ขึ้นไป`}
                                </span>
                            </div>

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
                        <button
                            type="button"
                            className="quiz-result-btn primary"
                            onClick={handlePrimaryAction}
                            disabled={completing}
                        >
                            {completing ? "กำลังบันทึก..." : primaryButtonText}
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