import { Search } from 'lucide-react'
import { contacts, Contact, INTIMACY_LABELS } from '../../data/mockData'

interface SidebarProps {
  selectedId: string
  onSelect: (id: string) => void
}

export default function Sidebar({ selectedId, onSelect }: SidebarProps) {
  return (
    <div
      className="w-[260px] flex-shrink-0 flex flex-col h-full"
      style={{ background: '#FFFFFF', borderRight: '1px solid #E5E5E5' }}
    >
      {/* Header */}
      <div className="px-4 pt-4 pb-3" style={{ borderBottom: '1px solid #EFEFEF' }}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-[13px] font-bold text-gray-800">메시지</span>
          <button className="text-[11px] text-gray-400 hover:text-gray-600 transition-colors">편집</button>
        </div>
        {/* Search */}
        <div className="relative">
          <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            className="w-full pl-7 pr-3 py-1.5 text-[12px] bg-gray-100 rounded-lg text-gray-700 placeholder-gray-400 outline-none"
            placeholder="검색"
          />
        </div>
      </div>

      {/* Contact list */}
      <div className="flex-1 overflow-y-auto scroll-light py-1">
        {contacts.map((contact) => (
          <ContactRow
            key={contact.id}
            contact={contact}
            selected={selectedId === contact.id}
            onClick={() => onSelect(contact.id)}
          />
        ))}
      </div>
    </div>
  )
}

function ContactRow({
  contact,
  selected,
  onClick,
}: {
  contact: Contact
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
        selected ? 'bg-red-50' : 'hover:bg-gray-50'
      }`}
    >
      <div className="relative flex-shrink-0">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold"
          style={{ background: '#5B7FBA' }}
        >
          {contact.avatar}
        </div>
        {contact.isOnline && (
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span
            className={`text-[13px] font-semibold truncate ${
              selected ? 'text-[#8B1A1A]' : 'text-gray-800'
            }`}
          >
            {contact.name}
          </span>
          <span className="text-[10px] text-gray-400 flex-shrink-0 ml-1">{contact.lastSeen}</span>
        </div>
        <div className="flex items-center gap-1 mt-0.5">
          <span className="text-[11px] text-gray-400 truncate">{contact.role}</span>
          <span className="text-gray-300 text-[10px]">·</span>
          <span className="text-[10px] text-blue-500 font-medium flex-shrink-0">
            {INTIMACY_LABELS[contact.intimacy]}
          </span>
        </div>
      </div>
    </button>
  )
}
