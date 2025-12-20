import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' // เรียกแค่ App ก็พอ
import './index.css' // หรือไฟล์ css หลักของคุณ

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)