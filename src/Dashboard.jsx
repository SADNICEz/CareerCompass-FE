import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const lessons = [
  {
    title: "Introduction to Programming",
    desc: "เรียนรู้พื้นฐานการเขียนโปรแกรม",
  },
  {
    title: "Mathematics basics (Algebra, Calculus concept)",
    desc: "เรียนรู้พื้นฐานคณิต",
  },
  {
    title: "Statistics fundamentals",
    desc: "เรียนรู้พื้นฐานสถิติ",
  },
];

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-page">
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>Dashboard</h1>
          <p>แผนการเรียนของฉัน</p>
        </header>

        <section className="stage-card">
          <h2>Foundations Stage</h2>
          <p className="stage-subtitle">เริ่มต้นสร้างพื้นฐานที่แข็งแกร่ง</p>

          <div className="dashboard-progress-meta">
            <span>ความคืบหน้าในด้านนี้</span>
            <span>50%</span>
          </div>
          <div className="dashboard-progress-track">
            <div className="dashboard-progress-fill" style={{ width: "50%" }} />
          </div>

          <p className="recommend-title">แนะนำคอร์สสำหรับแบบทดสอบ</p>
          <div className="lesson-grid">
            {lessons.map((lesson) => (
              <article key={lesson.title} className="lesson-card">
                <h3>{lesson.title}</h3>
                <p>{lesson.desc}</p>
                <button type="button">เริ่มลงเรียน</button>
              </article>
            ))}
          </div>

          <section className="quiz-ready-card">
            <h3>พร้อมทำแบบทดสอบแล้ว!</h3>
            <p>คุณลงคอร์สใน Stage นี้แล้ว สามารถเรียนต่อหรือทำแบบทดสอบเพื่อปลดล็อก Stage ถัดไปได้</p>
            <button type="button" onClick={() => navigate("/quiz")}>ทำแบบทดสอบ</button>
          </section>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
