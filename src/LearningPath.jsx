import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LearningPath.css';

const LearningPath = () => {
    const navigate = useNavigate();

    const stages = [
        {
            id: 1,
            title: "Foundation Stage",
            subtitle: "พื้นฐาน",
            status: "in-progress",
            position: { top: "1%", left: "62%", transform: "translateX(-50%)" },
        },
        {
            id: 2,
            title: "Core Knowledge Stage",
            subtitle: "องค์ความรู้หลัก",
            status: "locked",
            position: { top: "17%", right: "55%" },
        },
        {
            id: 3,
            title: "Essential Skills Stage",
            subtitle: "ทักษะหลัก",
            status: "locked",
            position: { top: "26%", right: "15%" },
        },
        {
            id: 4,
            title: "Specialized Stage",
            subtitle: "ทักษะเฉพาะทาง",
            status: "locked",
            position: { top: "38%", left: "23%" },
        },
        {
            id: 5,
            title: "Portfolio & Project Stage",
            subtitle: "โครงงานและผลงาน",
            status: "locked",
            position: { bottom: "33%", right: "23%" },
        },
        {
            id: 6,
            title: "Career Launch Stage",
            subtitle: "เริ่มต้นอาชีพ",
            status: "locked",
            position: { bottom: "3%", left: "25%" },
        }
    ];

    const courses = [
        { title: "Introduction to Programming", subtitle: "เรียนรู้พื้นฐานการเขียนโปรแกรม", action: "เริ่มลงเรียน" },
        { title: "Mathematics basics (Algebra, Calculus concept)", subtitle: "เรียนรู้พื้นฐานการเขียนโปรแกรม", action: "เริ่มลงเรียน" },
        { title: "Statistics fundamentals", subtitle: "เรียนรู้พื้นฐานสถิติ", action: "เริ่มลงเรียน" },
        { title: "Basic English for the Workplace", subtitle: "เรียนรู้พื้นฐานภาษาอังกฤษ", action: "เริ่มลงเรียน" },
        { title: "Math for Machine Learning - Basics", subtitle: "เรียนรู้พื้นฐานคณิตสำหรับ ML", action: "เริ่มลงเรียน" },
        { title: "Excel for data", subtitle: "เรียนรู้การใช้ Excel สำหรับ Data", action: "เริ่มลงเรียน" },
        { title: "Introduction to Foundations of Cybersecurity", subtitle: "เรียนรู้พื้นฐาน Cyber", action: "เริ่มลงเรียน" },
        { title: "Introduction to Foundations of Database and Sql", subtitle: "เรียนรู้พื้นฐาน Database and Sql", action: "เริ่มลงเรียน" },
        { title: "Introduction to Data Analysis", subtitle: "เรียนรู้พื้นฐาน Data Analysis", action: "เริ่มลงเรียน" },
    ];

    return (
        <div className="learning-path-container">
            {/* Header Title */}
            <header className="learning-path-header">
                <h1 className="learning-path-title">Data Scientist Learning Path</h1>
            </header>

            {/* Progress Stats */}
            <div className="learning-path-content">
                <div className="progress-stats">
                    <h2 className="progress-title">ความคืบหน้าโดยรวม Stage</h2>

                    <div className="stats-grid">
                        <div className="stat-card">
                            <span className="stat-number">6</span>
                            <span className="stat-label">ด่านทั้งหมด</span>
                        </div>
                        <div className="stat-card">
                            <span className="stat-number">0</span>
                            <span className="stat-label">จำนวนด่านที่เสร็จสิ้น</span>
                        </div>
                    </div>

                    <div className="progress-bar-container">
                        <div className="progress-label">
                            <span>ความสำเร็จทั้งหมด</span>
                            <span>0%</span>
                        </div>
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: '0%' }}></div>
                        </div>
                    </div>
                </div>

                {/* Main Path Visual */}
                <div className="path-visual">
                    <div className="stages-container">
                        {stages.map((stage, index) => (
                            <div key={stage.id} className="stage-wrapper" style={stage.position}>
                                {index < stages.length - 1 && (
                                    <div className="connector-line"></div>
                                )}

                                <div className={`stage-node ${stage.status === 'in-progress' ? 'active' : 'locked'}`}>
                                    <div className="stage-content">
                                        <h3 className="stage-title">{stage.title}</h3>
                                        <p className="stage-subtitle">{stage.subtitle}</p>
                                        <button className={`stage-button ${stage.status === 'in-progress' ? 'active' : 'locked'}`}>
                                            {stage.status === 'in-progress' ? 'In Progress' : 'Locked'}
                                        </button>
                                    </div>
                                    {stage.status === 'locked' && (
                                        <div className="lock-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Courses Section */}
                <div className="courses-section">
                    <div className="courses-header">
                        <h2 className="courses-title">Courses in this Stage</h2>
                        <div className="scroll-indicator"></div>
                    </div>

                    <div className="courses-grid">
                        {courses.map((course, index) => (
                            <div key={index} className="course-card">
                                <div className="course-content">
                                    <h3 className="course-title">{course.title}</h3>
                                    <p className="course-subtitle">{course.subtitle}</p>
                                    <button className="course-button">
                                        {course.action}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="courses-footer">
                        <button className="view-all-button">
                            ยกเลิกเส้นทาง
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LearningPath;
