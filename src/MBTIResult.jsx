import "./MBTIResult.css";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { mbtiData } from "./data/mbtiData";

/* ===== IMPORT ICON IMAGES ===== */
import overviewImg from "./assets/overview.webp";
import strengthsImg from "./assets/strengths.png";
import weaknessImg from "./assets/weakness.png";
import traitsImg from "./assets/traits.webp";

export default function MBTIResult() {
  const { type } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const upperType = type?.toUpperCase();
  const data = mbtiData[upperType];
  const score = location.state?.score;

  if (!data) {
    return <h1 style={{ textAlign: "center" }}>ไม่พบประเภท MBTI</h1>;
  }

  /* ================= CALCULATE TRAITS % ================= */

  const calculatePercent = (main, opposite) => {
    if (!score) return 50;

    const total = score[main] + score[opposite];
    if (!total) return 50;

    return Math.round((score[main] / total) * 100);
  };

  /* ================= DYNAMIC TRAITS ================= */

  const traitPairs = {
    E: ["E", "I"],
    I: ["I", "E"],
    S: ["S", "N"],
    N: ["N", "S"],
    T: ["T", "F"],
    F: ["F", "T"],
    J: ["J", "P"],
    P: ["P", "J"],
  };

  const traitLabels = {
    E: "Extraversion (E)",
    I: "Introversion (I)",
    S: "Sensing (S)",
    N: "Intuition (N)",
    T: "Thinking (T)",
    F: "Feeling (F)",
    J: "Judging (J)",
    P: "Perceiving (P)",
  };

  const traits = upperType.split("").map((letter) => {
    const [main, opposite] = traitPairs[letter];

    return {
      label: traitLabels[letter],
      value: calculatePercent(main, opposite),
    };
  });

  return (
    <div
      className="result-container"
      style={{ background: data.gradient }}
    >
      {/* HERO */}
      <div className="result-hero">
        <div className="hero-image-wrapper">
          <img src={data.image} alt={upperType} />
        </div>

        <h1>
          {upperType} - {data.title}
        </h1>

        <p className="subtitle">{data.subtitle}</p>
      </div>

      {/* OVERVIEW */}
      <div className="card">
        <div className="section-title">
          <img src={overviewImg} alt="overview" className="section-icon" />
          <h2>ภาพรวมบุคลิก</h2>
        </div>
        <p>{data.description}</p>
      </div>

      {/* STRENGTH & WEAKNESS */}
      <div className="grid-2">
        <div className="card">
          <div className="section-title">
            <img src={strengthsImg} alt="strengths" className="section-icon" />
            <h3>จุดเด่น</h3>
          </div>
          <ul>
            {data.strengths.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="card">
          <div className="section-title">
            <img src={weaknessImg} alt="weakness" className="section-icon" />
            <h3>สิ่งที่ควรระวัง</h3>
          </div>
          <ul>
            {data.weaknesses.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* TRAITS */}
      <div className="card">
        <div className="section-title">
          <img src={traitsImg} alt="traits" className="section-icon" />
          <h2>บุคลิกภาพของคุณ</h2>
        </div>

        {traits.map((trait, index) => (
          <div key={index} className="trait">
            <span>{trait.label}</span>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${trait.value}%`,
                  background: data.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* BUTTONS */}
      <div className="button-group">
        <button
          className="btn-outline"
          onClick={() => navigate("/formmbti")}
        >
          ทำแบบทดสอบใหม่
        </button>

        <button
          className="btn-primary"
          onClick={() => navigate("/Home")}
        >
          เสร็จสิ้น
        </button>
      </div>
    </div>
  );
}