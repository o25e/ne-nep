import { useState } from 'react'
import {
  Home, MessageSquare, Mail, Calendar, FileText,
  Package, Grid3X3, Bell, Users, HelpCircle, Settings,
} from 'lucide-react'
import Sidebar from './components/Messenger/Sidebar'
import ChatWindow from './components/Messenger/ChatWindow'
import { contacts } from './data/mockData'

export default function App() {
  const [selectedContactId, setSelectedContactId] = useState(contacts[0].id)

  const selectedContact = contacts.find((c) => c.id === selectedContactId)!

  return (
    <div className="h-screen flex bg-gray-200 overflow-hidden">
      {/* App shell — Naver Works style */}
      <div className="flex flex-1 m-2 rounded-xl overflow-hidden shadow-2xl">

        {/* Left nav — dark red, Naver Works style */}
        <div
          className="w-[54px] flex-shrink-0 flex flex-col items-center py-3 gap-0.5"
          style={{ background: '#8B1A1A' }}
        >
          {/* Logo area */}
          <div className="w-9 h-9 mb-3 flex items-center justify-center">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white text-[10px] font-black tracking-tight">
              THC
            </div>
          </div>

          <NavIcon icon={<Home size={18} />} />
          <NavIcon icon={<MessageSquare size={18} />} active />
          <NavIcon icon={<Mail size={18} />} />
          <NavIcon icon={<Calendar size={18} />} />
          <NavIcon icon={<FileText size={18} />} />
          <NavIcon icon={<Package size={18} />} />
          <NavIcon icon={<Grid3X3 size={18} />} />

          <div className="flex-1" />

          <NavIcon icon={<Bell size={18} />} badge />
          <NavIcon icon={<Users size={18} />} />
          <NavIcon icon={<HelpCircle size={18} />} />
          <NavIcon icon={<Settings size={18} />} />

          {/* My avatar */}
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold mt-2 cursor-pointer hover:bg-white/30 transition-colors">
            김
          </div>
        </div>

        {/* Messenger layout */}
        <div className="flex flex-1 overflow-hidden">
          <Sidebar selectedId={selectedContactId} onSelect={setSelectedContactId} />
          <ChatWindow key={selectedContactId} contact={selectedContact} />
        </div>
      </div>

    </div>
  )
}

function NavIcon({
  icon,
  active,
  badge,
}: {
  icon: React.ReactNode
  active?: boolean
  badge?: boolean
}) {
  return (
    <button
      className={`relative w-10 h-10 flex items-center justify-center rounded-xl transition-all ${
        active ? 'bg-white/20 text-white' : 'text-white/50 hover:text-white/80 hover:bg-white/10'
      }`}
    >
      {icon}
      {badge && (
        <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-300 rounded-full" />
      )}
    </button>
  )
}
