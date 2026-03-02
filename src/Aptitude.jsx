import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./context/UserContext";
import "./Aptitude.css";

import formIcon from "./assets/form.png";
import aiIcon from "./assets/ai.png";
import learningIcon from "./assets/learning.png";


const questions = [
  // -------- A : Analytical --------
  {
    id: 1,
    question: "เมื่อเจอปัญหาซับซ้อน คุณมักจะ…",
    options: [
      { text: "วิเคราะห์ปัญหาเป็นขั้นตอน", type: "A" },
      { text: "คิดไอเดียใหม่ ๆ", type: "C" },
      { text: "ปรึกษาคนรอบข้าง", type: "S" },
      { text: "ลองใช้เครื่องมือช่วย", type: "T" },
    ],
  },
  {
    id: 2,
    question: "คุณตัดสินใจเรื่องสำคัญโดย…",
    options: [
      { text: "ดูข้อมูลและเหตุผล", type: "A" },
      { text: "ใช้ความคิดสร้างสรรค์", type: "C" },
      { text: "ฟังความคิดเห็นคนอื่น", type: "S" },
      { text: "เลือกวิธีที่ทำได้จริง", type: "T" },
    ],
  },
  {
    id: 3,
    question: "งานแบบไหนที่คุณถนัด?",
    options: [
      { text: "วิเคราะห์ข้อมูล", type: "A" },
      { text: "ออกแบบหรือคิดไอเดีย", type: "C" },
      { text: "สื่อสารกับคน", type: "S" },
      { text: "แก้ปัญหาทางเทคนิค", type: "T" },
    ],
  },
  {
    id: 4,
    question: "คุณรู้สึกภูมิใจเมื่อ…",
    options: [
      { text: "แก้ปัญหายากได้", type: "A" },
      { text: "สร้างสิ่งใหม่", type: "C" },
      { text: "ช่วยเหลือผู้อื่น", type: "S" },
      { text: "ทำให้ระบบดีขึ้น", type: "T" },
    ],
  },

  // -------- C : Creative --------
  {
    id: 5,
    question: "งานแบบไหนที่ทำแล้วไม่เบื่อ?",
    options: [
      { text: "งานคิดวิเคราะห์", type: "A" },
      { text: "งานสร้างสรรค์", type: "C" },
      { text: "งานพบปะผู้คน", type: "S" },
      { text: "งานเทคโนโลยี", type: "T" },
    ],
  },
  {
    id: 6,
    question: "คุณมักมีไอเดียใหม่ ๆ เมื่อ…",
    options: [
      { text: "วิเคราะห์ปัญหา", type: "A" },
      { text: "ปล่อยความคิดอิสระ", type: "C" },
      { text: "คุยกับคนอื่น", type: "S" },
      { text: "ทดลองสิ่งใหม่", type: "T" },
    ],
  },
  {
    id: 7,
    question: "คุณมองตัวเองเป็นคนแบบไหน?",
    options: [
      { text: "มีเหตุผล", type: "A" },
      { text: "มีจินตนาการ", type: "C" },
      { text: "เป็นมิตร", type: "S" },
      { text: "รักเทคโนโลยี", type: "T" },
    ],
  },
  {
    id: 8,
    question: "ถ้าให้เลือกเรียนคอร์สเสริม คุณจะเลือก…",
    options: [
      { text: "Data / การคิดวิเคราะห์", type: "A" },
      { text: "Design / Creative", type: "C" },
      { text: "Communication", type: "S" },
      { text: "Programming", type: "T" },
    ],
  },

  // -------- T : Technical --------
  {
    id: 9,
    question: "เมื่อเจออุปกรณ์ใหม่ คุณจะ…",
    options: [
      { text: "ดูหลักการทำงาน", type: "A" },
      { text: "ดูดีไซน์", type: "C" },
      { text: "ดูคนอื่นใช้", type: "S" },
      { text: "ลองใช้งานทันที", type: "T" },
    ],
  },
  {
    id: 10,
    question: "คุณเรียนรู้ได้ดีที่สุดด้วยวิธีใด?",
    options: [
      { text: "อ่านและวิเคราะห์", type: "A" },
      { text: "ลงมือสร้าง", type: "C" },
      { text: "พูดคุยแลกเปลี่ยน", type: "S" },
      { text: "ทดลองทำจริง", type: "T" },
    ],
  },
  {
    id: 11,
    question: "เมื่อระบบมีปัญหา คุณจะ…",
    options: [
      { text: "หาสาเหตุ", type: "A" },
      { text: "คิดวิธีใหม่", type: "C" },
      { text: "ขอความช่วยเหลือ", type: "S" },
      { text: "ลงมือแก้ทันที", type: "T" },
    ],
  },
  {
    id: 12,
    question: "คุณสนุกกับงานแบบไหน?",
    options: [
      { text: "งานใช้เหตุผล", type: "A" },
      { text: "งานสร้างสรรค์", type: "C" },
      { text: "งานทีม", type: "S" },
      { text: "งานเทคโนโลยี", type: "T" },
    ],
  },

  // -------- S : Social --------
  {
    id: 13,
    question: "บทบาทที่คุณชอบในทีมคือ…",
    options: [
      { text: "วิเคราะห์แผน", type: "A" },
      { text: "เสนอไอเดีย", type: "C" },
      { text: "ประสานงาน", type: "S" },
      { text: "ดูแลระบบ", type: "T" },
    ],
  },
  {
    id: 14,
    question: "เพื่อนมักมาขอคำปรึกษาคุณเรื่อง…",
    options: [
      { text: "การตัดสินใจ", type: "A" },
      { text: "ไอเดีย", type: "C" },
      { text: "ปัญหาส่วนตัว", type: "S" },
      { text: "เทคนิค", type: "T" },
    ],
  },
  {
    id: 15,
    question: "คุณรู้สึกมีพลังเมื่อ…",
    options: [
      { text: "แก้ปัญหายาก", type: "A" },
      { text: "ได้สร้างสิ่งใหม่", type: "C" },
      { text: "ได้คุยกับคน", type: "S" },
      { text: "ได้ลองเทคโนโลยีใหม่", type: "T" },
    ],
  },
  {
    id: 16,
    question: "งานแบบไหนที่คุณไม่ชอบ?",
    options: [
      { text: "งานไร้เหตุผล", type: "A" },
      { text: "งานซ้ำ ๆ", type: "C" },
      { text: "ทำงานคนเดียวตลอด", type: "S" },
      { text: "ไม่ใช้เทคโนโลยี", type: "T" },
    ],
  },

  // -------- L : Leadership --------
  {
    id: 17,
    question: "เมื่อทำงานกลุ่ม คุณมักจะ…",
    options: [
      { text: "นำทีมและตัดสินใจ", type: "L" },
      { text: "ช่วยวิเคราะห์", type: "A" },
      { text: "คิดทิศทางใหม่", type: "C" },
      { text: "ดูแลความสัมพันธ์", type: "S" },
    ],
  },
  {
    id: 18,
    question: "ถ้าเกิดความเห็นไม่ตรงกัน คุณจะ…",
    options: [
      { text: "ตัดสินใจให้เดินต่อ", type: "L" },
      { text: "ชั่งน้ำหนักข้อดีข้อเสีย", type: "A" },
      { text: "เสนอทางเลือกใหม่", type: "C" },
      { text: "ช่วยไกล่เกลี่ย", type: "S" },
    ],
  },
  {
    id: 19,
    question: "คนมองว่าคุณเป็นคนแบบไหน?",
    options: [
      { text: "กล้ารับผิดชอบ", type: "L" },
      { text: "มีเหตุผล", type: "A" },
      { text: "มีวิสัยทัศน์", type: "C" },
      { text: "เข้าถึงง่าย", type: "S" },
    ],
  },
  {
    id: 20,
    question: "เมื่อเกิดปัญหาเร่งด่วน คุณจะ…",
    options: [
      { text: "สั่งการและแก้ปัญหา", type: "L" },
      { text: "วิเคราะห์ต้นเหตุ", type: "A" },
      { text: "คิดวิธีใหม่", type: "C" },
      { text: "ประสานทีม", type: "S" },
    ],
  },

  // -------- O : Organizational --------
  {
    id: 21,
    question: "ก่อนเริ่มงาน คุณจะ…",
    options: [
      { text: "วางแผนเป็นขั้นตอน", type: "O" },
      { text: "คิดภาพรวม", type: "C" },
      { text: "คุยกับทีม", type: "S" },
      { text: "เตรียมเครื่องมือ", type: "T" },
    ],
  },
  {
    id: 22,
    question: "คุณจัดการเวลายังไง?",
    options: [
      { text: "เรียงลำดับความสำคัญ", type: "O" },
      { text: "ทำตามอารมณ์", type: "C" },
      { text: "ปรับตามคนอื่น", type: "S" },
      { text: "ใช้แอปช่วย", type: "T" },
    ],
  },
  {
    id: 23,
    question: "งานแบบไหนที่คุณถนัด?",
    options: [
      { text: "งานมีโครงสร้าง", type: "O" },
      { text: "งานอิสระ", type: "C" },
      { text: "งานทีม", type: "S" },
      { text: "งานระบบ", type: "T" },
    ],
  },
  {
    id: 24,
    question: "จุดแข็งของคุณคือ…",
    options: [
      { text: "การจัดการและวางแผน", type: "O" },
      { text: "ความคิดสร้างสรรค์", type: "C" },
      { text: "การสื่อสาร", type: "S" },
      { text: "เทคโนโลยี", type: "T" },
    ],
  },
];

/* ===============================
   Component
================================ */
function Aptitude() {
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();
  const { updateUserData } = useUser();

  const handleSelect = (qId, type) => {
    setAnswers((prev) => ({
      ...prev,
      [qId]: type,
    }));
  };

  const isCompleted = Object.keys(answers).length === questions.length;

  const handleNext = () => {
    if (!isCompleted) return;
    updateUserData("aptitudeScores", answers);
    navigate("/basicknowledge");
  };

  const handleBack = () => {
    navigate("/"); // หน้า Home
  };

  return (
    <div className="home-container">
      {/* ================= Hero ================= */}
      <h1 className="hero-title">
        ค้นหาอาชีพที่ใช่สำหรับคุณ <br />
        ด้วยเทคโนโลยี <span>AI</span>
      </h1>

      {/* ================= Progress ================= */}
      <div className="progress-container">
        <div className="progress-line" />

        <div className="progress-line-active">
          <div className="progress-fill progress-66" />
        </div>

        <div className="progress-step active">
          <div className="progress-circle">
            <img src={formIcon} alt="แบบสอบถาม" />
          </div>
          <span>แบบสอบถาม</span>
        </div>

        <div className="progress-step">
          <div className="progress-circle">
            <img src={aiIcon} alt="อาชีพที่ AI แนะนำ" />
          </div>
          <span>อาชีพที่ AI แนะนำ</span>
        </div>

        <div className="progress-step">
          <div className="progress-circle">
            <img src={learningIcon} alt="Learning Path" />
          </div>
          <span>Learning Path</span>
        </div>
      </div>

      {/* ================= Aptitude Card ================= */}
      <div className="aptitude-card">
        <h2>แบบสอบถามความถนัด</h2>

        {questions.map((q) => (
          <div key={q.id} className="question-box">
            <p className="question-title">
              {q.id}. {q.question}
            </p>

            <div className="options">
              {q.options.map((opt, i) => (
                <label key={i} className="option">
                  <input
                    type="radio"
                    name={`q-${q.id}`}
                    checked={answers[q.id] === opt.type}
                    onChange={() => handleSelect(q.id, opt.type)}
                  />
                  {opt.text}
                </label>
              ))}
            </div>
          </div>
        ))}

        {/* ================= Footer ================= */}
        <div className="aptitude-footer">
          {/* ปุ่มย้อนกลับ */}
         <button
            className="back-btn"
            onClick={() => navigate("/Home")}
          >
            ย้อนกลับ
          </button>
          {/* ปุ่มถัดไป */}
          <button
            className="next-btn"
            disabled={!isCompleted}
            onClick={handleNext}
          >
            ถัดไป
          </button>
        </div>
      </div>
    </div>
  );
}

export default Aptitude;