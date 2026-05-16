import { useRef, useState, useEffect, KeyboardEvent } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Paperclip, ImageIcon, Smile, Sparkles } from 'lucide-react';
import NenepPopup from '../Popup/NenepPopup';
import { Contact } from '../../data/mockData';

export default function MessageInput({
  contact,
  onSend,
}: {
  contact: Contact;
  onSend: (text: string) => void;
}) {
  const [value, setValue] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const placeholder = `${contact.inputGuide} — ALT+L 로 다듬기`;

  useEffect(() => {
    const handler = (e: globalThis.KeyboardEvent) => {
      if (e.altKey && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        setShowPopup(true);
      }
      if (e.key === 'Escape') setShowPopup(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [value]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!value.trim()) return;
      onSend(value.trim());
      setValue('');
      setShowPopup(false);
    }
  };

  const handleApply = (text: string) => {
    setValue(text);
    setShowPopup(false);
    setTimeout(() => textareaRef.current?.focus(), 50);
  };

  return (
    <div
      className="relative px-4 pb-4 pt-2 flex-shrink-0"
      style={{ background: '#F5F6F8' }}
    >
      <AnimatePresence>
        {showPopup && (
          <NenepPopup
            draft={value}
            contact={contact}
            onApply={handleApply}
            onClose={() => setShowPopup(false)}
          />
        )}
      </AnimatePresence>

      <div
        className="rounded-2xl overflow-hidden bg-white"
        style={{
          border: '1px solid #DCDCDC',
          boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
        }}
      >
        <div className="px-4 pt-3 pb-2">
          <div className="relative">
            {/* 회색 가이드 문장 */}
            {!value && (
              <div
                className="
                absolute inset-0
                pointer-events-none
                text-[13px]
                leading-relaxed
                whitespace-pre-wrap
                break-words
                transition-all
                duration-200
                font-medium
                select-none
              "
              >
                <span className="text-gray-400">{placeholder}</span>
              </div>
            )}

            {/* 실제 입력창 */}
            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              className="
              relative
              w-full
              bg-transparent
              text-[13px]
              text-gray-800
              outline-none
              resize-none
              leading-relaxed
            "
              style={{
                minHeight: '44px',
                maxHeight: '120px',
                fontFamily: 'inherit',
                letterSpacing: '0px',
              }}
            />
          </div>
        </div>
        <div className="flex items-center justify-between px-3 pb-2.5"></div>

        <div className="flex items-center justify-between px-3 pb-2.5">
          <div className="flex items-center gap-0.5">
            {[
              <Paperclip size={16} />,
              <ImageIcon size={16} />,
              <Smile size={16} />,
            ].map((icon, i) => (
              <button
                key={i}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                {icon}
              </button>
            ))}
            <button
              onClick={() => value.trim() && setShowPopup(true)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ml-1 ${
                value.trim()
                  ? 'text-[#E57373] bg-red-50 hover:bg-red-100'
                  : 'text-gray-300 cursor-not-allowed'
              }`}
              title="Alt+L"
            >
              <Sparkles size={11} />
              네넵
            </button>
          </div>
          <button
            onClick={() => {
              if (!value.trim()) return;
              onSend(value.trim());
              setValue('');
            }}
            disabled={!value.trim()}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold transition-all disabled:opacity-30"
            style={{ background: value.trim() ? '#8B1A1A' : '#CCCCCC' }}
          >
            ↑
          </button>
        </div>
      </div>
    </div>
  );
}
