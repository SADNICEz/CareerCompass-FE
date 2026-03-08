import { useRef, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./Quiz.css";

// ── Quiz bank per stage (fallback to general if no match) ────────────
const quizBank = {
    default: [
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
            question: "VS Code คืออะไร?",
            options: ["ระบบปฏิบัติการ", "โปรแกรมแอนตี้ไวรัส", "Code editor", "ฐานข้อมูล"],
            answer: "Code editor",
        },
    ],
    foundations: [
        {
            question: "อัลกอริทึม (Algorithm) คืออะไร?",
            options: ["ชุดคำสั่งที่กำหนดขั้นตอนการแก้ปัญหา", "ภาษาโปรแกรม", "ฮาร์ดแวร์คอมพิวเตอร์", "ระบบปฏิบัติการ"],
            answer: "ชุดคำสั่งที่กำหนดขั้นตอนการแก้ปัญหา",
        },
        {
            question: "ตัวแปร (Variable) ในโปรแกรมมิ่งคืออะไร?",
            options: ["ที่เก็บข้อมูลชั่วคราวในหน่วยความจำ", "ฟังก์ชัน", "ลูป", "คลาส"],
            answer: "ที่เก็บข้อมูลชั่วคราวในหน่วยความจำ",
        },
        {
            question: "Loop ใช้สำหรับอะไร?",
            options: ["ทำซ้ำชุดคำสั่ง", "ประกาศตัวแปร", "Import library", "สร้าง Database"],
            answer: "ทำซ้ำชุดคำสั่ง",
        },
    ],
    "data-analysis": [
        {
            question: "Pandas ใน Python ใช้สำหรับอะไร?",
            options: ["จัดการข้อมูลเชิงตาราง", "สร้าง UI", "เขียน API", "เชื่อมต่อ Database"],
            answer: "จัดการข้อมูลเชิงตาราง",
        },
        {
            question: "Mean (ค่าเฉลี่ย) คำนวณอย่างไร?",
            options: ["ผลรวมทั้งหมด ÷ จำนวน", "ค่าที่เกิดบ่อยที่สุด", "ค่ากลางของข้อมูล", "ค่าสูงสุด - ค่าต่ำสุด"],
            answer: "ผลรวมทั้งหมด ÷ จำนวน",
        },
        {
            question: "Outlier คืออะไร?",
            options: ["ค่าผิดปกติที่อยู่ห่างจากกลุ่มข้อมูล", "ค่าเฉลี่ย", "ค่ามัธยฐาน", "ค่าฐานนิยม"],
            answer: "ค่าผิดปกติที่อยู่ห่างจากกลุ่มข้อมูล",
        },
    ],
    "machine-learning": [
        {
            question: "Supervised Learning คืออะไร?",
            options: ["การเรียนรู้จากข้อมูลที่มี label", "การเรียนรู้โดยไม่มี label", "การเรียนรู้จากรางวัล", "การเรียนรู้แบบลึก"],
            answer: "การเรียนรู้จากข้อมูลที่มี label",
        },
        {
            question: "Overfitting คืออะไร?",
            options: ["โมเดลจำข้อมูล train มากเกินไป", "โมเดลที่ดี", "ข้อมูลไม่พอ", "Learning rate สูงเกิน"],
            answer: "โมเดลจำข้อมูล train มากเกินไป",
        },
        {
            question: "Feature ในบริบท ML คืออะไร?",
            options: ["คุณลักษณะ/ตัวแปร input ของโมเดล", "ผลลัพธ์ของโมเดล", "ฟังก์ชัน activation", "จำนวน layer"],
            answer: "คุณลักษณะ/ตัวแปร input ของโมเดล",
        },
    ],
    "web-development": [
        {
            question: "HTML ย่อมาจากอะไร?",
            options: ["HyperText Markup Language", "High Transfer Markup Language", "Hyperlink Text Machine Language", "HyperText Machine Language"],
            answer: "HyperText Markup Language",
        },
        {
            question: "CSS ใช้สำหรับอะไร?",
            options: ["จัดรูปแบบและตกแต่งหน้าเว็บ", "สร้าง Database", "เขียน Logic", "จัดการ Server"],
            answer: "จัดรูปแบบและตกแต่งหน้าเว็บ",
        },
        {
            question: "REST API คืออะไร?",
            options: ["รูปแบบสถาปัตยกรรม API ที่ใช้ HTTP", "Database", "Framework CSS", "Testing tool"],
            answer: "รูปแบบสถาปัตยกรรม API ที่ใช้ HTTP",
        },
    ],
};

// เลือก quiz ที่ตรงกับ stage/career มากที่สุด
function pickQuiz(careerSlug, stageName) {
    const slug = (careerSlug || "").toLowerCase();
    const stage = (stageName || "").toLowerCase();

    if (stage.includes("foundation") || stage.includes("พื้นฐาน")) return quizBank.foundations;
    if (stage.includes("data") || slug.includes("data")) return quizBank["data-analysis"];
    if (stage.includes("machine") || slug.includes("machine")) return quizBank["machine-learning"];
    if (stage.includes("web") || slug.includes("web")) return quizBank["web-development"];
    return quizBank.default;
}

function Quiz() {
    const navigate = useNavigate();
    const { careerSlug, stageId } = useParams();
    const { state } = useLocation();

    // ข้อมูล stage จาก location state (ส่งมาจาก LearningPath)
    const careerName = state?.careerName || decodeURIComponent(careerSlug || "General");
    const stageName = state?.stageName || `Stage ${stageId || ""}`;
    const stageSubtitle = state?.stageSubtitle || "";

    const quizData = pickQuiz(careerSlug, stageName);

    const [answers, setAnswers] = useState({});
    const [message, setMessage] = useState("");
    const startedAtRef = useRef(Date.now());

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
            },
        });
    };

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
