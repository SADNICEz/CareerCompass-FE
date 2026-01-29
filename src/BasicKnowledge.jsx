import { useNavigate } from "react-router-dom";
import "./BasicKnowledge.css";

import formIcon from "./assets/form.png";
import aiIcon from "./assets/ai.png";
import learningIcon from "./assets/learning.png";

function BasicKnowledge() {
  const navigate = useNavigate();

  const skills = [
    "Hard Skill",
    "Soft Skill",
    "Creative Skill",
    "Technical Skill",
  ];

  return (
    <div className="home-container">
      {/* ================= Hero ================= */}
      <h1 className="hero-title">
        ค้นหาอาชีพที่ใช่สำหรับคุณ <br />
        ด้วยเทคโนโลยี <span>AI</span>
      </h1>

      {/* ================= Progress (ยังอยู่ Step แบบสอบถาม) ================= */}
      <div className="progress-container">
        <div className="progress-line">
          {/* ✅ ใกล้จบแบบสอบถาม แต่ยังไม่ข้าม step */}
          <div className="progress-line-fill progress-30" />
        </div>

        {/* Step 1 : แบบสอบถาม (ACTIVE) */}
        <div className="progress-step active">
          <div className="progress-circle">
            <img src={formIcon} alt="แบบสอบถาม" />
          </div>
          <span>แบบสอบถาม</span>
        </div>

        {/* Step 2 : อาชีพ AI */}
        <div className="progress-step">
          <div className="progress-circle">
            <img src={aiIcon} alt="AI Career" />
          </div>
          <span>อาชีพที่ AI แนะนำ</span>
        </div>

        {/* Step 3 : Learning Path */}
        <div className="progress-step">
          <div className="progress-circle">
            <img src={learningIcon} alt="Learning Path" />
          </div>
          <span>Learning Path</span>
        </div>
      </div>

      {/* ================= Knowledge Card ================= */}
      <div className="knowledge-card">
        <h2>แบบสอบถาม ความรู้พื้นฐาน</h2>
        <p className="subtitle">ความรู้พื้นฐานของคุณมีอะไรบ้าง</p>

        {/* Skill Tags */}
        <div className="skill-group">
          {skills.map((skill) => (
            <div key={skill} className="skill-box">
               {skill}
            </div>
            ))}
        </div>


        <textarea
          className="knowledge-textarea"
          placeholder="บอกเราเกี่ยวกับความรู้และทักษะที่คุณมี เช่น พื้นฐาน Python และ Data Analysis เคยใช้งาน Excel และ SQL หรือ สนใจด้าน AI และ Machine Learning"
        />

        <div className="knowledge-footer">
          <button
            className="back-btn"
            onClick={() => navigate("/Aptitude")}
          >
            ย้อนกลับ
          </button>

          <button
            className="confirm-btn"
            onClick={() => navigate("/ai-career")}
          >
            ยืนยัน
          </button>
        </div>
      </div>
    </div>
  );
}

export default BasicKnowledge;
