import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // สร้าง State กลางสำหรับเก็บข้อมูลทั้งหมด
  const [userData, setUserData] = useState({
    mbti: "",
    aptitudeScores: {}, // เก็บเป็น { 1: "A", 2: "C" ... }
    basicKnowledge: "",
  });

  // ฟังก์ชันสำหรับอัปเดตข้อมูลทีละส่วน
  const updateUserData = (key, value) => {
    setUserData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <UserContext.Provider value={{ userData, updateUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);