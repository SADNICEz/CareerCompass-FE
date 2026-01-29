import React from 'react';
import { Link } from 'react-router-dom';
import './Landingpage.css';
import Navbar from './Navbar';

import img1 from './assets/Advocate_INFJ.png'; 
import img2 from './assets/Debater_ENTP.png';
import img3 from './assets/Logistician_ISTJ.png';
import playIcon from './assets/play-icon.png';

const Wave = ({ color, isFlip, isBottom }) => (
  <div className={`wave-wrapper ${isFlip ? 'flip' : ''} ${isBottom ? 'bottom' : 'top'}`}>
    <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
      <path 
        fill={color} 
        d="M0,64L60,64C120,64,240,64,360,96C480,128,600,192,720,208C840,224,960,192,1080,160C1200,128,1320,96,1380,80L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z">
      </path>
    </svg>
  </div>
);

function LandingPage() {
  return (
    <div className="landing-page">
      <Navbar />
      <section className="section bg-dark">
        <div className="content-wrapper">
          <div className="image-box"><img src={img1} /></div>
          <div className="text-box">
            <h2>รู้จักตัวเองหรือยัง?</h2>
            <p>ค้นพบตัวตนและบุคลิกภาพของคุณ พร้อมทั้งแบบทดสอบความถนัด เพื่อทดสอบความสามารถเบื้องต้นและค้นหาความถนัดในตัวคุณ</p>
            <Link to="/login">
              <img src={playIcon} className="play-img-btn" alt="play" />
            </Link>
          </div>
        </div>
        <Wave color="#fafafa" isBottom={true} isFlip={false} />
      </section>

      <section className="section bg-light">
        <div className="content-wrapper reverse">
          <div className="image-box"><img src={img2} /></div>
          <div className="text-box">
            <h2>ค้นหาเส้นทางชีวิตที่เหมาะกับคุณ <br /><span className="highlight">ด้วยพลังของ AI</span></h2>
            <p>ให้ AI ช่วยวิเคราะห์บุคลิกภาพ ความถนัด เพื่อแนะนำอาชีพที่เหมาะกับคุณ</p>
            <Link to="/login">
              <img src={playIcon} className="play-img-btn" alt="play" />
            </Link> 
          </div>
        </div>
        <Wave color="#143D60" isBottom={true} isFlip={false} />
      </section>
      
      <section className="section bg-dark">
        <div className="content-wrapper">
          <div className="image-box"><img src={img3} /></div>
          <div className="text-box">
            <h2>ก้าวแรกของการเรียนรู้</h2>
            <p>ให้ Learning Path นำทางคุณจากพื้นฐานสู่ความเชี่ยวชาญ</p>
            <Link to="/login">
              <img src={playIcon} className="play-img-btn" alt="play" />
            </Link>
          </div>
        </div>  
      </section>
    </div>
  );
}

export default LandingPage;