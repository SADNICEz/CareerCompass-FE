import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import confetti from 'canvas-confetti';
import './Congratulation.css';

const Congratulation = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { careerName } = location.state || { careerName: "เส้นทางการเรียนรู้" };

    useEffect(() => {
        // Trigger confetti on mount
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            // since particles fall down, start a bit higher than random
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="congrats-page">
            <div className="congrats-overlay"></div>
            <main className="congrats-main">
                <div className="congrats-card">
                    <div className="congrats-icon-container">
                        <div className="congrats-icon">🏆</div>
                    </div>
                    <h1 className="congrats-title">ยินดีด้วย! คุณเก่งมาก</h1>
                    <p className="congrats-desc">
                        คุณได้เรียนรู้องค์ความรู้พื้นฐานและผ่านการทดสอบทั้งหมดของสายอาชีพ 
                        <span className="career-highlight"> {careerName} </span>
                        เรียบร้อยแล้ว!
                    </p>
                    <div className="congrats-stats">
                        <div className="congrats-stat">
                            <span className="stat-icon">🎓</span>
                            <span className="stat-text">เรียนรู้ครบทุกบทเรียน</span>
                        </div>
                        <div className="congrats-stat">
                            <span className="stat-icon">✅</span>
                            <span className="stat-text">ผ่านการทดสอบทุกด่าน</span>
                        </div>
                    </div>
                    <div className="congrats-actions">
                        <button className="congrats-btn primary" onClick={() => navigate('/dashboard')}>
                            ไปที่แดชบอร์ด
                        </button>
                        <button className="congrats-btn secondary" onClick={() => navigate('/home')}>
                            กลับหน้าหลัก
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Congratulation;
