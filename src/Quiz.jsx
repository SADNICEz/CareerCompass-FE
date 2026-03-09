import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./Quiz.css";

const API_BASE = "http://localhost:4546/api";
const PASS_SCORE = 8; // ต้องผ่าน 8/10 ข้อ

function Quiz() {
    const navigate = useNavigate();
    const { careerSlug, stageId } = useParams();
    const { state } = useLocation();

    const careerName = state?.careerName || decodeURIComponent(careerSlug || "General");
    const stageName = state?.stageName || `Stage ${stageId || ""}`;
    const stageSubtitle = state?.stageSubtitle || "";

    const [quizData, setQuizData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState("");
    const [answers, setAnswers] = useState({});
    const [message, setMessage] = useState("");
    const startedAtRef = useRef(Date.now());

    // ─── Fetch AI-generated questions every time the page loads ───────────
    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        setLoadError("");
        setAnswers({});
        setMessage("");
        startedAtRef.current = Date.now();

        (async () => {
            try {
                const res = await fetch(`${API_BASE}/quiz/generate`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        career_name: careerName,
                        stage_name: stageName,
                        career_slug: careerSlug || "",
                    }),
                });

                if (!res.ok) throw new Error(`Server responded ${res.status}`);

                const data = await res.json();
                if (!cancelled) {
                    if (data.questions && data.questions.length > 0) {
                        setQuizData(data.questions);
                    } else {
                        setLoadError("ไม่สามารถสร้างคำถามได้ กรุณาลองใหม่อีกครั้ง");
                    }
                }
            } catch (err) {
                if (!cancelled) {
                    console.error("Quiz generate error:", err);
                    setLoadError("เกิดข้อผิดพลาดในการสร้างคำถาม กรุณาตรวจสอบการเชื่อมต่อแล้วลองใหม่");
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();

        return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [careerSlug, stageId]);

    const handleChange = (idx, value) => {
        setAnswers((prev) => ({ ...prev, [idx]: value }));
        setMessage("");
    };

    const handleSubmit = () => {
        if (Object.keys(answers).length < quizData.length) {
            setMessage("กรุณาตอบคำถามให้ครบทุกข้อ");
            return;
        }

        const totalQuestions = quizData.length;
        const correctCount = quizData.reduce(
            (count, item, idx) => (answers[idx] === item.answer ? count + 1 : count),
            0
        );
        const incorrectCount = totalQuestions - correctCount;
        const progress = Math.round((correctCount / totalQuestions) * 100);
        const elapsedMinutes = Math.max(1, Math.round((Date.now() - startedAtRef.current) / 60000));
        const passed = correctCount >= PASS_SCORE;

        navigate("/quiz-result", {
            state: {
                totalQuestions,
                correctCount,
                incorrectCount,
                progress,
                elapsedMinutes,
                careerName,
                stageName,
                careerSlug,
                stageId,
                isLastStage: state?.isLastStage,
                totalStages: state?.totalStages,
                passed,
                passScore: PASS_SCORE,
            },
        });
    };

    // ─── Loading state ────────────────────────────────────────────────────
    if (loading) {
        return (
            <div className="quiz-page">
                <main className="quiz-main">
                    <section className="quiz-card quiz-loading-card">
                        <div className="quiz-loading-spinner" />
                        <p className="quiz-loading-text">
                            🤖 AI กำลังสร้างคำถามสำหรับ "{stageName}"…
                        </p>
                        <p className="quiz-loading-sub">อาจใช้เวลาสักครู่ กรุณารอ</p>
                    </section>
                </main>
            </div>
        );
    }

    // ─── Error state ──────────────────────────────────────────────────────
    if (loadError) {
        return (
            <div className="quiz-page">
                <main className="quiz-main">
                    <section className="quiz-card quiz-error-card">
                        <span style={{ fontSize: 48 }}>⚠️</span>
                        <p className="quiz-error-text">{loadError}</p>
                        <button
                            className="quiz-submit-btn"
                            onClick={() => {
                                setLoading(true);
                                setLoadError("");
                                window.location.reload();
                            }}
                        >
                            ลองใหม่
                        </button>
                    </section>
                </main>
            </div>
        );
    }

    return (
        <div className="quiz-page">
            <main className="quiz-main">
                {/* Breadcrumb */}
                <p className="quiz-breadcrumb">
                    <span onClick={() => navigate(`/learningpath/${careerSlug || ""}`)} className="quiz-breadcrumb-link">
                        {careerName}
                    </span>
                    {" › "}
                    <span>{stageName}</span>
                </p>

                <h1 className="quiz-title">แบบทดสอบความรู้</h1>
                
                {/* Pass criteria badge */}
                <div className="quiz-pass-badge">
                    🎯 ต้องตอบถูกอย่างน้อย {PASS_SCORE}/{quizData.length} ข้อ จึงจะผ่าน Stage นี้
                </div>

                <section className="quiz-card">
                    <h3 className="quiz-card-title">{stageName}</h3>
                    {stageSubtitle && <p className="quiz-card-subtitle">{stageSubtitle}</p>}

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

                    {/* Progress indicator */}
                    <div className="quiz-answer-progress">
                        <span>ตอบแล้ว {Object.keys(answers).length}/{quizData.length} ข้อ</span>
                        <div className="quiz-answer-track">
                            <div
                                className="quiz-answer-fill"
                                style={{ width: `${(Object.keys(answers).length / quizData.length) * 100}%` }}
                            />
                        </div>
                    </div>

                    {message && <p className="quiz-message error">{message}</p>}

                    <div className="quiz-actions">
                        <button
                            type="button"
                            className="quiz-back-btn"
                            onClick={() => navigate(`/learningpath/${careerSlug || ""}`)}
                        >
                            ← กลับ
                        </button>
                        <button type="button" className="quiz-submit-btn" onClick={handleSubmit}>
                            ส่งคำตอบ
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Quiz;
