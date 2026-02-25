import INFJ from "../assets/INFJ.png";
import INFP from "../assets/INFP.png";
import ENFJ from "../assets/ENFJ.png";
import ENFP from "../assets/ENFP.png";

import INTJ from "../assets/INTJ.png";
import INTP from "../assets/INTP.png";
import ENTJ from "../assets/ENTJ.png";
import ENTP from "../assets/ENTP.png";

import ISTJ from "../assets/ISTJ.png";
import ISFJ from "../assets/ISFJ.png";
import ESTJ from "../assets/ESTJ.png";
import ESFJ from "../assets/ESFJ.png";

import ISTP from "../assets/ISTP.png";
import ISFP from "../assets/ISFP.png";
import ESTP from "../assets/ESTP.png";
import ESFP from "../assets/ESFP.png";

export const mbtiData = {

  /* ================= NF – GREEN TEAL ================= */

  INFJ: {
    title: "The Advocate",
    subtitle: "ผู้สนับสนุน ผู้มีอุดมการณ์และวิสัยทัศน์",
    description:
      "มีความลึกซึ้ง เข้าใจอารมณ์ผู้อื่น และมุ่งมั่นสร้างความเปลี่ยนแปลงที่ดีต่อสังคม",
    strengths: ["เข้าใจผู้อื่นลึกซึ้ง", "มีวิสัยทัศน์", "ยึดมั่นในคุณค่า"],
    weaknesses: ["คิดมาก", "เก็บความรู้สึก", "คาดหวังสูงกับตัวเอง"],
    color: "#2e7d6b",
    gradient: "linear-gradient(135deg,#2e7d6b,#14b8a6)",
    image: INFJ,
  },

  INFP: {
    title: "The Mediator",
    subtitle: "นักไกล่เกลี่ย ผู้ยึดมั่นในคุณค่า",
    description:
      "มีจินตนาการสูง ซื่อสัตย์ต่อตัวเอง และแสวงหาความหมายของชีวิต",
    strengths: ["มีความคิดสร้างสรรค์", "เห็นอกเห็นใจ", "ซื่อสัตย์ต่อคุณค่า"],
    weaknesses: ["อ่อนไหว", "หลีกเลี่ยงความขัดแย้ง"],
    color: "#2e7d6b",
    gradient: "linear-gradient(135deg,#2e7d6b,#14b8a6)",
    image: INFP,
  },

  ENFJ: {
    title: "The Protagonist",
    subtitle: "ผู้นำที่สร้างแรงบันดาลใจ",
    description:
      "เป็นผู้นำโดยธรรมชาติ เข้าใจคนรอบข้าง และกระตุ้นให้ผู้อื่นเติบโต",
    strengths: ["สื่อสารเก่ง", "สร้างแรงบันดาลใจ", "เห็นอกเห็นใจ"],
    weaknesses: ["แบกรับอารมณ์คนอื่นมากเกินไป"],
    color: "#2e7d6b",
    gradient: "linear-gradient(135deg,#2e7d6b,#14b8a6)",
    image: ENFJ,
  },

  ENFP: {
    title: "The Campaigner",
    subtitle: "นักรณรงค์ ผู้เต็มไปด้วยพลัง",
    description:
      "กระตือรือร้น มีไอเดียหลากหลาย และรักการเชื่อมโยงกับผู้คน",
    strengths: ["พลังสูง", "คิดสร้างสรรค์", "ปรับตัวเก่ง"],
    weaknesses: ["วอกแวกง่าย", "ไม่ชอบงานจำเจ"],
    color: "#2e7d6b",
    gradient: "linear-gradient(135deg,#2e7d6b,#14b8a6)",
    image: ENFP,
  },

  /* ================= NT – PURPLE ================= */

  INTJ: {
    title: "The Architect",
    subtitle: "นักวางกลยุทธ์ผู้มีเหตุผล",
    description:
      "คิดวิเคราะห์เก่ง วางแผนระยะยาว และรักความเป็นอิสระ",
    strengths: ["วางกลยุทธ์เก่ง", "คิดเป็นระบบ", "มุ่งมั่น"],
    weaknesses: ["ดูห่างเหิน", "วิจารณ์สูง"],
    color: "#6d28d9",
    gradient: "linear-gradient(135deg,#6d28d9,#a78bfa)",
    image: INTJ,
  },

  INTP: {
    title: "The Logician",
    subtitle: "นักตรรกะ ผู้ชอบตั้งคำถาม",
    description:
      "รักการวิเคราะห์และสำรวจแนวคิดใหม่ ๆ",
    strengths: ["คิดเชิงตรรกะ", "รักการเรียนรู้"],
    weaknesses: ["ไม่สนใจรายละเอียดปลีกย่อย"],
    color: "#6d28d9",
    gradient: "linear-gradient(135deg,#6d28d9,#a78bfa)",
    image: INTP,
  },

  ENTJ: {
    title: "The Commander",
    subtitle: "ผู้นำผู้เด็ดขาด",
    description:
      "มีความมั่นใจ วางแผนเก่ง และผลักดันเป้าหมายอย่างจริงจัง",
    strengths: ["เป็นผู้นำ", "ตัดสินใจเร็ว"],
    weaknesses: ["ใจร้อน", "เข้มงวดเกินไป"],
    color: "#6d28d9",
    gradient: "linear-gradient(135deg,#6d28d9,#a78bfa)",
    image: ENTJ,
  },

  ENTP: {
    title: "The Debater",
    subtitle: "นักโต้แย้ง ผู้ชอบไอเดียใหม่",
    description:
      "ชอบถกเถียงอย่างสร้างสรรค์ และมองเห็นโอกาสใหม่ ๆ",
    strengths: ["คิดนอกกรอบ", "ช่างตั้งคำถาม"],
    weaknesses: ["เบื่อง่าย"],
    color: "#6d28d9",
    gradient: "linear-gradient(135deg,#6d28d9,#a78bfa)",
    image: ENTP,
  },

  /* ================= SJ – BLUE ================= */

  ISTJ: {
    title: "The Logistician",
    subtitle: "ผู้ปฏิบัติงานที่มีระเบียบ",
    description:
      "รับผิดชอบสูง ยึดหลักการ และทำงานอย่างมีระบบ",
    strengths: ["มีวินัย", "เชื่อถือได้"],
    weaknesses: ["ยืดหยุ่นน้อย"],
    color: "#2563eb",
    gradient: "linear-gradient(135deg,#2563eb,#93c5fd)",
    image: ISTJ,
  },

  ISFJ: {
    title: "The Defender",
    subtitle: "ผู้ปกป้องที่อ่อนโยน",
    description:
      "ใส่ใจรายละเอียด และดูแลผู้อื่นอย่างจริงใจ",
    strengths: ["เอาใจใส่", "รับผิดชอบ"],
    weaknesses: ["ไม่ค่อยแสดงออก"],
    color: "#2563eb",
    gradient: "linear-gradient(135deg,#2563eb,#93c5fd)",
    image: ISFJ,
  },

  ESTJ: {
    title: "The Executive",
    subtitle: "นักบริหารผู้เด็ดขาด",
    description:
      "จัดการเก่ง มุ่งผลลัพธ์ และทำงานตามระบบชัดเจน",
    strengths: ["บริหารเก่ง", "ชัดเจน"],
    weaknesses: ["เข้มงวดเกินไป"],
    color: "#2563eb",
    gradient: "linear-gradient(135deg,#2563eb,#93c5fd)",
    image: ESTJ,
  },

  ESFJ: {
    title: "The Consul",
    subtitle: "ผู้สนับสนุนสังคม",
    description:
      "ชอบช่วยเหลือผู้อื่น และให้ความสำคัญกับความกลมเกลียว",
    strengths: ["เข้าสังคมเก่ง", "อบอุ่น"],
    weaknesses: ["กังวลภาพลักษณ์"],
    color: "#2563eb",
    gradient: "linear-gradient(135deg,#2563eb,#93c5fd)",
    image: ESFJ,
  },

  /* ================= SP – YELLOW ================= */

  ISTP: {
    title: "The Virtuoso",
    subtitle: "นักทดลอง ผู้แก้ปัญหาเฉพาะหน้า",
    description:
      "รักอิสระ ชอบลงมือทำ และแก้ปัญหาอย่างเป็นรูปธรรม",
    strengths: ["แก้ปัญหาเก่ง", "อิสระ"],
    weaknesses: ["ไม่ชอบผูกมัด"],
    color: "#d4a017",
    gradient: "linear-gradient(135deg,#d4a017,#fde68a)",
    image: ISTP,
  },

  ISFP: {
    title: "The Adventurer",
    subtitle: "นักผจญภัย ผู้รักอิสระ",
    description:
      "อ่อนไหวต่อความงาม และใช้ชีวิตตามจังหวะของตนเอง",
    strengths: ["ศิลปะ", "ยืดหยุ่น"],
    weaknesses: ["วางแผนระยะยาวยาก"],
    color: "#d4a017",
    gradient: "linear-gradient(135deg,#d4a017,#fde68a)",
    image: ISFP,
  },

  ESTP: {
    title: "The Entrepreneur",
    subtitle: "นักลงมือทำ ผู้ชอบความท้าทาย",
    description:
      "พลังสูง กล้าเสี่ยง และตอบสนองสถานการณ์ได้เร็ว",
    strengths: ["ตัดสินใจเร็ว", "มั่นใจ"],
    weaknesses: ["เบื่อง่าย"],
    color: "#d4a017",
    gradient: "linear-gradient(135deg,#d4a017,#fde68a)",
    image: ESTP,
  },

  ESFP: {
    title: "The Entertainer",
    subtitle: "นักสร้างสีสัน",
    description:
      "ร่าเริง ชอบเข้าสังคม และสร้างบรรยากาศที่สนุกสนาน",
    strengths: ["เป็นมิตร", "พลังบวก"],
    weaknesses: ["ไม่ชอบงานซ้ำ ๆ"],
    color: "#d4a017",
    gradient: "linear-gradient(135deg,#d4a017,#fde68a)",
    image: ESFP,
  },

};