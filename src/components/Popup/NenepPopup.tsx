import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { Contact, Intimacy, INTIMACY_LABELS } from '../../data/mockData';
import { generateSingleMessage } from '../../utils/generateSingleMessage';

const toNearestIntimacy = (value: number): Intimacy => {
  return Math.min(4, Math.max(0, Math.round(value))) as Intimacy;
};

const CHIPS = [
  { id: 'polite', label: '더 공손하게', trait: '#공손히' },
  { id: 'soft', label: '더 부드럽게', trait: '#부드럽게' },
  { id: 'concise', label: '더 간결하게', trait: '#간결하게' },
] as const;

type ChipId = (typeof CHIPS)[number]['id'];

export default function NenepPopup({
  draft,
  contact,
  onApply,
  onClose,
}: {
  draft: string;
  contact: Contact;
  onApply: (text: string) => void;
  onClose: () => void;
}) {
  const [sliderValue, setSliderValue] = useState<number>(contact.intimacy);
  const [selectedChip, setSelectedChip] = useState<ChipId | null>(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(0);

  useEffect(() => {
    setSliderValue(contact.intimacy);
    const msg = generateSingleMessage(contact);
    setHistory([msg]);
    setHistoryIndex(0);
    setLoading(false);
    setSelectedChip(null);
  }, [contact, draft]);

  const doGenerate = (targetIntimacy: Intimacy, extraTraits?: string[]) => {
    setLoading(true);
    setTimeout(() => {
      const nextIndex = history.length;
      const combinedTraits = [...contact.traits, ...(extraTraits ?? [])];
      const msg = generateSingleMessage(contact);
      setHistory((prev) => [...prev, msg]);
      setHistoryIndex(nextIndex);
      setLoading(false);
    }, 720);
  };

  const handleChipClick = (chipId: ChipId) => {
    if (selectedChip === chipId) {
      setSelectedChip(null);
      doGenerate(intimacy);
    } else {
      setSelectedChip(chipId);
      const chip = CHIPS.find((c) => c.id === chipId)!;
      doGenerate(intimacy, [chip.trait]);
    }
  };

  const currentText = history[historyIndex] ?? '';
  const intimacy = toNearestIntimacy(sliderValue);
  const trackPct = (sliderValue / 4) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      className="absolute bottom-[calc(100%+6px)] left-4 z-50 w-[92%] min-w-[520px] max-w-[820px]"
    >
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: '#FFF5F5',
          boxShadow: '0 4px 24px rgba(0,0,0,0.13), 0 1px 4px rgba(0,0,0,0.06)',
          border: '1px solid #FECACA',
        }}
      >
        <div
          className="m-2 rounded-xl bg-white overflow-hidden"
          style={{ border: '1px solid #e5e7eb' }}
        >
          <div className="px-4 py-3 flex flex-col gap-2.5">
            {/* 닫기 버튼 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 flex-1">
                <span className="text-[11px] font-semibold text-gray-400 flex-shrink-0 whitespace-nowrap">
                  관계온도
                </span>
                <span
                  className="text-[11px] font-bold flex-shrink-0 w-20"
                  style={{ color: '#E57373' }}
                >
                  {INTIMACY_LABELS[intimacy]}
                </span>
                <div className="flex-1 pt-3">
                  <input
                    type="range"
                    min={0}
                    max={4}
                    step={0.01}
                    value={sliderValue}
                    onChange={(e) => {
                      const nextValue = Number(e.target.value);
                      const nextIntimacy = toNearestIntimacy(nextValue);
                      setSliderValue(nextValue);
                      if (nextIntimacy !== intimacy) {
                        const chip = CHIPS.find((c) => c.id === selectedChip);
                        doGenerate(nextIntimacy, chip ? [chip.trait] : []);
                      }
                    }}
                    className="w-full intimacy-slider"
                    style={{
                      background: `linear-gradient(to right, #E57373 ${trackPct}%, #FECACA ${trackPct}%)`,
                    }}
                  />
                  <div className="relative mt-1.5 h-3 text-[10px] font-semibold text-gray-300">
                    {([0, 1, 2, 3, 4] as const).map((level) => (
                      <span
                        key={level}
                        className={`absolute top-0 -translate-x-1/2 whitespace-nowrap ${
                          level === intimacy ? 'text-[#E57373]' : ''
                        }`}
                        style={{ left: `${level * 25}%` }}
                      >
                        {INTIMACY_LABELS[level]}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="ml-3 mb-3 w-5 h-5 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 transition-colors flex-shrink-0"
              >
                <X size={11} />
              </button>
            </div>

            {/* 텍스트 */}
            <div>
              <div className="text-[11px] font-semibold text-gray-400 mb-1.5">
                텍스트
              </div>
              <div
                className="rounded-xl px-3.5 py-2.5 text-sm text-gray-700 leading-relaxed min-h-[64px] whitespace-pre-line"
                style={{ background: '#FDECEA' }}
              >
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-2 py-1"
                    >
                      <div
                        className="h-3 rounded animate-pulse w-11/12"
                        style={{ background: '#FECACA' }}
                      />
                      <div
                        className="h-3 rounded animate-pulse w-8/12"
                        style={{ background: '#FECACA' }}
                      />
                    </motion.div>
                  ) : (
                    <motion.span
                      key={historyIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.15 }}
                    >
                      {currentText}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* 하단 액션 버튼 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    const chip = CHIPS.find((c) => c.id === selectedChip);
                    doGenerate(intimacy, chip ? [chip.trait] : []);
                  }}
                  disabled={loading}
                  className="flex items-center gap-1 px-2 h-7 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-40"
                  style={{ color: '#E8875A' }}
                >
                  <RefreshCw
                    size={13}
                    className={loading ? 'animate-spin' : ''}
                  />
                </button>

                {CHIPS.map((chip) => {
                  const isActive = selectedChip === chip.id;
                  return (
                    <button
                      key={chip.id}
                      onClick={() => handleChipClick(chip.id)}
                      disabled={loading}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all disabled:opacity-40"
                      style={
                        isActive
                          ? {
                              background: '#FFF5F5',
                              color: '#E57373',
                              border: '1px solid #FECACA',
                            }
                          : {
                              background: '#F5F5F5',
                              color: '#9CA3AF',
                              border: '1px solid #E5E7EB',
                            }
                      }
                    >
                      {isActive && <span>✓</span>}
                      {chip.label}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-0.5">
                <button
                  onClick={() => setHistoryIndex((p) => p - 1)}
                  disabled={historyIndex <= 0}
                  className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 transition-colors disabled:opacity-30"
                >
                  <ChevronLeft size={14} />
                </button>
                <button
                  onClick={() => setHistoryIndex((p) => p + 1)}
                  disabled={historyIndex >= history.length - 1}
                  className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 transition-colors disabled:opacity-30"
                >
                  <ChevronRight size={14} />
                </button>
                <button
                  onClick={() => currentText && onApply(currentText)}
                  disabled={loading || !currentText}
                  className="ml-1 px-3 py-1.5 rounded-lg text-xs font-bold text-white transition-all disabled:opacity-40 shadow-sm"
                  style={{ background: '#E8875A' }}
                >
                  변환
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
