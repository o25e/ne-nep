import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

const QUESTIONS = [
  { label: 'Q1.', choices: ['넵', '네!'] },
  { label: 'Q2.', choices: ['수고하셨습니다', '오늘도 고생 많으셨어요 😊'] },
  { label: 'Q3.', choices: ['확인해보겠습니다', '확인해볼게요!'] },
];

interface OnboardingPopupProps {
  onComplete: () => void;
}

export default function OnboardingPopup({ onComplete }: OnboardingPopupProps) {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const current = QUESTIONS[step];

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);

    setTimeout(() => {
      if (step < QUESTIONS.length - 1) {
        setStep(step + 1);
        setSelected(null);
      } else {
        setDone(true);
        setTimeout(onComplete, 1200);
      }
    }, 480);
  };

  return (
    <AnimatePresence mode="wait">
      {done ? (
        <motion.div
          key="done"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl px-8 py-6 flex flex-col items-center gap-3"
          style={{
            background: '#FFFFFF',
            border: '1px solid #EDEDED',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          }}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ background: '#8B1A1A' }}
          >
            <Check size={22} color="white" strokeWidth={2.5} />
          </div>
          <div className="text-[14px] font-semibold text-gray-700">설정이 완료됐어요!</div>
          <div className="text-[12px] text-gray-400">이제 대화를 시작해보세요</div>
        </motion.div>
      ) : (
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -18 }}
          transition={{ duration: 0.22 }}
          className="w-full"
        >
          <div
            className="rounded-2xl px-8 py-8 flex flex-col items-center gap-5"
            style={{
              background: '#FFFFFF',
              border: '1px solid #EDEDED',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            }}
          >
            <div className="text-[11px] text-gray-400 tracking-wide">당신은?</div>
            <div className="text-[15px] font-bold text-gray-700">{current.label}</div>

            <div className="flex items-center gap-3 w-full justify-center">
              <button
                onClick={() => handleSelect(0)}
                className="flex-1 py-2.5 px-3 rounded-xl text-[13px] font-medium transition-all"
                style={{
                  background: selected === 0 ? '#8B1A1A' : '#FFF0EE',
                  color: selected === 0 ? '#FFFFFF' : selected !== null ? '#C9A0A0' : '#5A3030',
                  border: selected === 0 ? '1px solid #8B1A1A' : '1px solid #FDDBD5',
                }}
              >
                {current.choices[0]}
              </button>

              <span className="text-[11px] text-gray-400 font-medium flex-shrink-0">VS</span>

              <button
                onClick={() => handleSelect(1)}
                className="flex-1 py-2.5 px-3 rounded-xl text-[13px] font-medium transition-all"
                style={{
                  background: selected === 1 ? '#8B1A1A' : '#FFF0EE',
                  color: selected === 1 ? '#FFFFFF' : selected !== null ? '#C9A0A0' : '#5A3030',
                  border: selected === 1 ? '1px solid #8B1A1A' : '1px solid #FDDBD5',
                }}
              >
                {current.choices[1]}
              </button>
            </div>

            <div className="flex gap-2 mt-1">
              {QUESTIONS.map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                  style={{
                    background: i < step ? '#C77777' : i === step ? '#8B1A1A' : '#E0E0E0',
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
