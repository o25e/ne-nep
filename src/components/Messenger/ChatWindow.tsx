import { useEffect, useRef, useState } from 'react'
import { Phone, Video, Search, MoreHorizontal } from 'lucide-react'
import { Contact, Message, chatRooms } from '../../data/mockData'
import MessageGroupRow, { buildGroups } from './MessageBubble'
import MessageInput from './MessageInput'

export default function ChatWindow({ contact }: { contact: Contact }) {
  const [messages, setMessages] = useState<Message[]>(chatRooms[contact.id] ?? [])
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => { setMessages(chatRooms[contact.id] ?? []) }, [contact.id])
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const handleSend = (text: string) => {
    setMessages((prev) => [...prev, {
      id: `m-${Date.now()}`, senderId: 'me', text, timestamp: '방금', isMe: true,
    }])
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden" style={{ background: '#F5F6F8' }}>
      <div
        className="flex items-center justify-between px-5 py-3 flex-shrink-0"
        style={{ background: '#FFFFFF', borderBottom: '1px solid #E5E5E5' }}
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: '#5B7FBA' }}>
              {contact.avatar}
            </div>
            {contact.isOnline && (
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white" />
            )}
          </div>
          <div>
            <div className="text-[13px] font-bold text-gray-900 leading-tight">{contact.name}</div>
            <div className="text-[11px] text-gray-500">{contact.role}</div>
          </div>
        </div>
        <div className="flex items-center gap-0.5">
          {[<Phone size={17} />, <Video size={17} />, <Search size={17} />, <MoreHorizontal size={17} />].map((icon, i) => (
            <button key={i} className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors">
              {icon}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center py-3">
        <div className="text-[11px] text-gray-500 px-3 py-1 rounded-full" style={{ background: 'rgba(0,0,0,0.06)' }}>
          오늘
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scroll-light pb-2">
        <div className="space-y-0.5 pt-1">
          {buildGroups(messages, contact).map((g) => <MessageGroupRow key={g.key} group={g} />)}
        </div>
        <div ref={bottomRef} />
      </div>

      <MessageInput contact={contact} onSend={handleSend} />
    </div>
  )
}
