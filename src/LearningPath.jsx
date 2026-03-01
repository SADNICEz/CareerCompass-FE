import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LearningPath.css';

const API_BASE = 'http://localhost:4546/api';

const LearningPath = () => {
    const navigate = useNavigate();
    const [learningPath, setLearningPath] = useState(null);
    const [selectedStage, setSelectedStage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updatingProgress, setUpdatingProgress] = useState(false);

    // Get user_id from localStorage (ถ้ามีระบบ login)
    const userId = localStorage.getItem('user_id') || null;

    useEffect(() => {
        fetchLearningPath();
    }, []);

    const fetchLearningPath = async () => {
        try {
            setLoading(true);
            setError(null);
            const url = userId
                ? `${API_BASE}/learning-path/Data Scientist?user_id=${userId}`
                : `${API_BASE}/learning-path/Data Scientist`;
            const res = await fetch(encodeURI(url));
            if (!res.ok) throw new Error(`Server error: ${res.status}`);
            const data = await res.json();
            setLearningPath(data);
            // Auto-select first in-progress or first stage
            const firstActive = data.stages?.find(s => s.status === 'in-progress') || data.stages?.[0];
            if (firstActive) setSelectedStage(firstActive);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateProgress = async (stageId, newStatus) => {
        if (!userId) return;
        try {
            setUpdatingProgress(true);
            const res = await fetch(`${API_BASE}/learning-path/progress`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: userId,
                    stage_id: stageId,
                    status: newStatus,
                }),
            });
            if (!res.ok) throw new Error('Failed to update progress');
            await fetchLearningPath();
        } catch (err) {
            alert('ไม่สามารถอัปเดต progress ได้: ' + err.message);
        } finally {
            setUpdatingProgress(false);
        }
    };

    const getProgressPercent = () => {
        if (!learningPath) return 0;
        return Math.round((learningPath.completed_stages / learningPath.total_stages) * 100);
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case 'completed': return 'Completed ✓';
            case 'in-progress': return 'In Progress';
            default: return 'Locked';
        }
    };

    if (loading) {
        return (
            <div className="learning-path-container">
                <div className="lp-loading">
                    <div className="lp-spinner"></div>
                    <p>กำลังโหลดเส้นทางการเรียนรู้...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="learning-path-container">
                <div className="lp-error">
                    <div className="lp-error-icon">⚠️</div>
                    <h2>ไม่สามารถโหลดข้อมูลได้</h2>
                    <p>{error}</p>
                    <button className="lp-retry-btn" onClick={fetchLearningPath}>ลองใหม่</button>
                </div>
            </div>
        );
    }

    if (!learningPath) return null;

    return (
        <div className="learning-path-container">
            {/* Header */}
            <header className="learning-path-header">
                <h1 className="learning-path-title">{learningPath.career_name} Learning Path</h1>
                <p className="learning-path-desc">{learningPath.description}</p>
            </header>

            <div className="learning-path-content">
                {/* Progress Stats */}
                <div className="progress-stats">
                    <h2 className="progress-title">ความคืบหน้าโดยรวม</h2>
                    <div className="stats-grid">
                        <div className="stat-card">
                            <span className="stat-number">{learningPath.total_stages}</span>
                            <span className="stat-label">ด่านทั้งหมด</span>
                        </div>
                        <div className="stat-card">
                            <span className="stat-number">{learningPath.completed_stages}</span>
                            <span className="stat-label">ด่านที่เสร็จสิ้น</span>
                        </div>
                        <div className="stat-card stat-card-accent">
                            <span className="stat-number">{getProgressPercent()}%</span>
                            <span className="stat-label">ความสำเร็จ</span>
                        </div>
                    </div>
                    <div className="progress-bar-container">
                        <div className="progress-label">
                            <span>ความสำเร็จทั้งหมด</span>
                            <span>{getProgressPercent()}%</span>
                        </div>
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${getProgressPercent()}%` }}></div>
                        </div>
                    </div>
                </div>

                {/* Main Content: Path Visual + Courses */}
                <div className="lp-main-layout">
                    {/* Path Visual */}
                    <div className="path-visual">
                        <div className="stages-container">
                            {learningPath.stages.map((stage) => (
                                <div
                                    key={stage.id}
                                    className="stage-wrapper"
                                    style={{
                                        top: stage.position_top || undefined,
                                        left: stage.position_left || undefined,
                                        right: stage.position_right || undefined,
                                        bottom: stage.position_bottom || undefined,
                                        transform: stage.position_transform || undefined,
                                    }}
                                    onClick={() => setSelectedStage(stage)}
                                >
                                    <div className={`stage-node ${stage.status === 'in-progress' ? 'active' : stage.status === 'completed' ? 'done' : 'locked'} ${selectedStage?.id === stage.id ? 'selected' : ''}`}>
                                        <div className="stage-content">
                                            <h3 className="stage-title">{stage.title}</h3>
                                            <p className="stage-subtitle">{stage.subtitle}</p>
                                            <button className={`stage-button ${stage.status}`}>
                                                {getStatusLabel(stage.status)}
                                            </button>
                                        </div>
                                        {stage.status === 'locked' && (
                                            <div className="lock-icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        )}
                                        {stage.status === 'completed' && (
                                            <div className="done-icon">✓</div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Courses for selected stage */}
                    {selectedStage && (
                        <div className="courses-section">
                            <div className="courses-header">
                                <div>
                                    <h2 className="courses-title">{selectedStage.title}</h2>
                                    <p className="courses-subtitle">{selectedStage.subtitle}</p>
                                </div>
                                <span className={`courses-status-badge ${selectedStage.status}`}>
                                    {getStatusLabel(selectedStage.status)}
                                </span>
                            </div>

                            {/* Progress actions (only if user logged in) */}
                            {userId && (
                                <div className="progress-actions">
                                    {selectedStage.status === 'locked' && (
                                        <button
                                            className="action-btn start-btn"
                                            disabled={updatingProgress}
                                            onClick={() => handleUpdateProgress(selectedStage.id, 'in-progress')}
                                        >
                                            🚀 เริ่มเรียน
                                        </button>
                                    )}
                                    {selectedStage.status === 'in-progress' && (
                                        <button
                                            className="action-btn complete-btn"
                                            disabled={updatingProgress}
                                            onClick={() => handleUpdateProgress(selectedStage.id, 'completed')}
                                        >
                                            ✅ ทำเครื่องหมายว่าเสร็จแล้ว
                                        </button>
                                    )}
                                    {selectedStage.status === 'completed' && (
                                        <div className="completed-badge">🎉 เสร็จสิ้นแล้ว!</div>
                                    )}
                                </div>
                            )}

                            <div className="courses-grid">
                                {selectedStage.courses && selectedStage.courses.length > 0 ? (
                                    selectedStage.courses.map((course) => (
                                        <div key={course.id} className="course-card">
                                            <div className="course-content">
                                                <h3 className="course-title">{course.title}</h3>
                                                <p className="course-subtitle">{course.subtitle}</p>
                                                {course.url ? (
                                                    <a
                                                        href={course.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="course-button"
                                                    >
                                                        เริ่มลงเรียน
                                                    </a>
                                                ) : (
                                                    <button className="course-button course-button-disabled" disabled>
                                                        Coming Soon
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="no-courses">
                                        <p>ยังไม่มีคอร์สในด่านนี้</p>
                                    </div>
                                )}
                            </div>

                            <div className="courses-footer">
                                <button
                                    className="view-all-button"
                                    onClick={() => navigate('/home')}
                                >
                                    ← กลับหน้าหลัก
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LearningPath;
