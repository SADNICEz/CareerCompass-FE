import { createContext, useContext } from "react";
import { useLocation } from "react-router-dom";

const ProgressContext = createContext();

export function ProgressProvider({ children }) {
  const location = useLocation();

  // logical progress ตามหน้า
  let logicalProgress = 0;

  switch (location.pathname) {
    case "/Home": // MBTI
      logicalProgress = 50;
      break;
    case "/aptitude":
      logicalProgress = 66;
      break;
    case "/basicknowledge":
      logicalProgress = 99;
      break;
    case "/ai-career": // อาชีพ AI
      logicalProgress = 100;
      break;
    default:
      logicalProgress = 0;
  }

  // map logical → visual (แบบสอบถาม = 33%)
  const SURVEY_SECTION = 33;
  const visualProgress =
    logicalProgress <= 99
      ? (logicalProgress / 100) * SURVEY_SECTION
      : 100;

  return (
    <ProgressContext.Provider
      value={{ logicalProgress, visualProgress }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  return useContext(ProgressContext);
}
