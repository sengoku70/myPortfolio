import { useState, useEffect, useRef } from "react";


export default function App() {
  const [step, setStep] = useState(0);
  const [unit, setUnit] = useState(window.innerHeight / 4.5);
  const [widunit, setwidUnit] = useState(window.innerWidth / 9.5);
  const isScrolling = useRef(false);

  useEffect(() => {
    const handleResize = () => setUnit(window.innerHeight / 3.95);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🔥 12 layout states (each has 6 boxes)
  const layouts = [
    [
      { w: 2, h: 2, tx: 0, ty: 0 },
      { w: 2, h: 2, tx: 0, ty: 0 },
      { w: 5, h: 3, tx: 0, ty: 0 },
      { w: 6, h: 1, tx: 0, ty: 0 },
      { w: 2, h: 1, tx: -205, ty: 0 },
      { w: 2, h: 2, tx: -205, ty: 0 },
    ],
    // ... remainder preserved
    // Step 1
    [
      { w: 2, h: 1, tx: 0, ty: 0 },
      { w: 2, h: 2, tx: 0, ty: 0 },
      { w: 1, h: 1, tx: 0, ty: 0 },
      { w: 1, h: 2, tx: 0, ty: 0 },
      { w: 2, h: 1, tx: 0, ty: 0 },
      { w: 1, h: 1, tx: 0, ty: 0 },
    ],
    // Step 2
    [
      { w: 2, h: 1, tx: 0, ty: 0 },
      { w: 1, h: 2, tx: 0, ty: 0 },
      { w: 2, h: 2, tx: 0, ty: 0 },
      { w: 1, h: 1, tx: 0, ty: 0 },
      { w: 1, h: 1, tx: 0, ty: 0 },
      { w: 1, h: 1, tx: 0, ty: 0 },
    ],
    [
      { w: 2, h: 3, tx: 0, ty: 0 },
      { w: 1, h: 2, tx: 0, ty: 0 },
      { w: 2, h: 2, tx: 0, ty: 0 },
      { w: 1, h: 1, tx: 0, ty: 0 },
      { w: 1, h: 1, tx: 0, ty: 0 },
      { w: 1, h: 1, tx: 0, ty: 0 },
    ],
  ];

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      if (isScrolling.current) return;
      if (Math.abs(e.deltaY) < 40) return;
      isScrolling.current = true;
      if (e.deltaY > 0 && step < layouts.length - 1) {
        setStep(step + 1);
      } else if (e.deltaY < 0 && step > 0) {
        setStep(step - 1);
      }
      setTimeout(() => {
        isScrolling.current = false;
      }, 400);
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [step]);

  return (
    <div 
      className="p-8 flex flex-col flex-wrap w-screen overflow-x-auto overflow-y-hidden bg-[#050505]"
      style={{ 
        height: (4 * unit) + (3 * 16) + 64, // (Combined Height of 4) + (Gaps) + (Padding)
        alignContent: 'start' 
      }}
    >
      {layouts[step].map((box, i) => (
        <div
          key={i}
          className="bg-blue-500/90 border-2 m-1 border-blue-400/50 duration-700 rounded-[2.5rem] flex items-center justify-center text-white text-3xl font-black shadow-2xl shadow-blue-500/10 transition-all hover:scale-[0.98] cursor-pointer"
          style={{
            height: box.h * unit,
            width: box.w * widunit,
            transform: `translate(${box.tx}px, ${box.ty}px)`,
          }}
        >
          {i === 0 ? step : ""}
        </div>
      ))}
    </div>
  );
}
 