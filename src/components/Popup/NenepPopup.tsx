import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react'
import { Contact, Intimacy, INTIMACY_LABELS, generateSingleMessage } from '../../data/mockData'

const toNearestIntimacy = (value: number): Intimacy => {
  return Math.min(4, Math.max(0, Math.round(value))) as Intimacy
}

const NOTE_KEYWORDS: [string[], string][] = [
  [['바빠', '바쁜', '바쁨', '바빠보', '바쁘'], '#바쁨'],
  [['기분', '안좋', '힘들어보', '우울', '예민'], '#기분안좋음'],
  [['급해', '급한', '급함', '긴급', '빨리'], '#급함'],
  [['공손', '정중', '격식', '조심스'], '#공손히'],
  [['친절해보', '상냥'], '#친절함'],
  [['피곤', '지쳐보', '피로'], '#피곤함'],
  [['두괄식', '핵심만', '요점만', '짧게'], '#두괄식'],
]

function parseNotesToHashtags(notes: string): string[] {
  const found = new Set<string>()
  const lower = notes.toLowerCase()
  for (const [keywords, tag] of NOTE_KEYWORDS) {
    if (keywords.some((k) => lower.includes(k))) found.add(tag)
  }
  if (found.size === 0 && notes.trim()) {
    notes
      .trim()
      .split(/[,，\s]+/)
      .filter((w) => w.length > 0)
      .forEach((w) => found.add(`#${w}`))
  }
  return [...found]
}

export default function NenepPopup({
  draft,
  contact,
  onApply,
  onClose,
}: {
  draft: string
  contact: Contact
  onApply: (text: string) => void
  onClose: () => void
}) {
  const [sliderValue, setSliderValue] = useState<number>(contact.intimacy)
  const [noteInput, setNoteInput] = useState('')
  const [noteHashtags, setNoteHashtags] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(0)

  useEffect(() => {
    setSliderValue(contact.intimacy)
    const msg = generateSingleMessage(draft, contact.intimacy, contact.traits, contact)
    setHistory([msg])
    setHistoryIndex(0)
    setLoading(false)
    setNoteInput('')
    setNoteHashtags([])
  }, [contact, draft])

  const doGenerate = (targetIntimacy: Intimacy, extraTraits?: string[]) => {
    setLoading(true)
    setTimeout(() => {
      const nextIndex = history.length
      const combinedTraits = [...contact.traits, ...(extraTraits ?? noteHashtags)]
      const msg = generateSingleMessage(draft, targetIntimacy, combinedTraits, contact, nextIndex)
      setHistory((prev) => [...prev, msg])
      setHistoryIndex(nextIndex)
      setLoading(false)
    }, 720)
  }

  const handleNoteConfirm = () => {
    if (noteInput.trim()) {
      const tags = parseNotesToHashtags(noteInput)
      setNoteHashtags(tags)
      doGenerate(intimacy, tags)
    } else {
      doGenerate(intimacy)
    }
  }

  const currentText = history[historyIndex] ?? ''
  const intimacy = toNearestIntimacy(sliderValue)
  const trackPct = (sliderValue / 4) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      className="absolute bottom-[calc(100%+6px)] left-0 right-0 z-50"
    >
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: '#FFF5F5',
          boxShadow: '0 4px 24px rgba(0,0,0,0.13), 0 1px 4px rgba(0,0,0,0.06)',
          border: '1px solid #FECACA',
        }}
      >
        <div className="m-2 rounded-xl bg-white flex overflow-hidden" style={{ border: '1px solid #e5e7eb' }}>
          <div className="flex-1 px-4 py-3 min-w-0 flex flex-col gap-2.5">
            <div className="flex items-center gap-2.5">
              <span className="text-[11px] font-semibold text-gray-400 flex-shrink-0 w-10">친밀도</span>
              <span className="text-[11px] font-bold flex-shrink-0 w-20" style={{ color: '#E57373' }}>
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
                    const nextValue = Number(e.target.value)
                    const nextIntimacy = toNearestIntimacy(nextValue)
                    setSliderValue(nextValue)

                    if (nextIntimacy !== intimacy) {
                      doGenerate(nextIntimacy)
                    }
                  }}
                  className="w-full intimacy-slider"
                  style={{ background: `linear-gradient(to right, #E57373 ${trackPct}%, #FECACA ${trackPct}%)` }}
                />
                <div className="relative mt-1.5 h-3 text-[10px] font-semibold text-gray-300">
                  {['0%', '25%', '50%', '75%', '100%'].map((mark, index) => (
                    <span
                      key={mark}
                      className={`absolute top-0 -translate-x-1/2 whitespace-nowrap ${
                        index === intimacy ? 'text-[#E57373]' : ''
                      }`}
                      style={{ left: `${index * 25}%` }}
                    >
                      {mark}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="text-[11px] font-semibold text-gray-400 mb-1.5">텍스트</div>
              <div
                className="rounded-xl px-3.5 py-2.5 text-sm text-gray-700 leading-relaxed min-h-[64px] whitespace-pre-line"
                style={{ background: '#FDECEA' }}
              >
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-2 py-1">
                      <div className="h-3 rounded animate-pulse w-11/12" style={{ background: '#FECACA' }} />
                      <div className="h-3 rounded animate-pulse w-8/12" style={{ background: '#FECACA' }} />
                    </motion.div>
                  ) : (
                    <motion.span key={historyIndex} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.15 }}>
                      {currentText}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="w-px bg-gray-100 my-3" />

          <div className="w-44 flex-shrink-0 px-3 py-3 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-gray-400">특이사항</span>
              <button onClick={onClose} className="w-5 h-5 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 transition-colors">
                <X size={11} />
              </button>
            </div>

            <textarea
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleNoteConfirm()
                }
              }}
              placeholder={'특이사항 입력 후 Enter\n(예: 오늘 바빠보임,\n기분 안좋아보임)'}
              className="w-full rounded-lg px-2.5 py-2 text-[11px] text-gray-600 placeholder-gray-300 outline-none resize-none leading-relaxed border border-gray-100 focus:border-gray-300 transition-colors"
              style={{ background: '#FAFAFA', minHeight: '60px' }}
            />

            {noteHashtags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1.5">
                {noteHashtags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-1.5 py-0.5 rounded-full font-semibold"
                    style={{ background: '#FFF5F5', color: '#E57373', border: '1px solid #FECACA' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between mt-2.5">
              <button
                onClick={handleNoteConfirm}
                disabled={loading}
                className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 transition-colors disabled:opacity-40"
              >
                <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
              </button>

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
  )
}
