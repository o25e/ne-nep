import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react'
import { Contact, Intimacy, INTIMACY_LABELS, generateSingleMessage } from '../../data/mockData'

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
  const [intimacy, setIntimacy] = useState<Intimacy>(contact.intimacy)
  const [userNotes, setUserNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(0)

  useEffect(() => {
    const msg = generateSingleMessage(draft, contact.intimacy, contact.traits, contact)
    setHistory([msg])
    setHistoryIndex(0)
  }, [])

  const doGenerate = (targetIntimacy: Intimacy, notes: string) => {
    setLoading(true)
    setTimeout(() => {
      const msg = generateSingleMessage(draft, targetIntimacy, contact.traits, contact, notes)
      setHistory((prev) => [...prev, msg])
      setHistoryIndex((prev) => prev + 1)
      setLoading(false)
    }, 720)
  }

  const currentText = history[historyIndex] ?? ''
  const trackPct = (intimacy / 4) * 100

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
              <div className="flex-1">
                <input
                  type="range"
                  min={0}
                  max={4}
                  step={1}
                  value={intimacy}
                  onChange={(e) => {
                    const val = Number(e.target.value) as Intimacy
                    setIntimacy(val)
                    doGenerate(val, userNotes)
                  }}
                  className="w-full"
                  style={{ background: `linear-gradient(to right, #E57373 ${trackPct}%, #FECACA ${trackPct}%)` }}
                />
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
              value={userNotes}
              onChange={(e) => setUserNotes(e.target.value)}
              placeholder={'상대방 특이사항 입력\n(예: 요즘 바빠 보임,\n두괄식 선호)'}
              className="flex-1 w-full rounded-lg px-2.5 py-2 text-[11px] text-gray-600 placeholder-gray-300 outline-none resize-none leading-relaxed border border-gray-100 focus:border-gray-300 transition-colors"
              style={{ background: '#FAFAFA', minHeight: '72px' }}
            />

            <div className="flex items-center justify-between mt-2.5">
              <button
                onClick={() => doGenerate(intimacy, userNotes)}
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
