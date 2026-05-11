import { Message, Contact, ME } from '../../data/mockData'

export interface MessageGroup {
  key: string
  isMe: boolean
  senderId: string
  senderName: string
  avatar: string
  timestamp: string
  messages: Pick<Message, 'id' | 'text'>[]
}

export function buildGroups(messages: Message[], contact: Contact): MessageGroup[] {
  const groups: MessageGroup[] = []
  for (const msg of messages) {
    const last = groups[groups.length - 1]
    if (last && last.senderId === msg.senderId) {
      last.messages.push({ id: msg.id, text: msg.text })
      last.timestamp = msg.timestamp
    } else {
      groups.push({
        key: msg.id,
        isMe: msg.isMe,
        senderId: msg.senderId,
        senderName: msg.isMe ? ME.name : contact.name,
        avatar: msg.isMe ? ME.avatar : contact.avatar,
        timestamp: msg.timestamp,
        messages: [{ id: msg.id, text: msg.text }],
      })
    }
  }
  return groups
}

export default function MessageGroupRow({ group }: { group: MessageGroup }) {
  if (group.isMe) {
    return (
      <div className="flex justify-end items-end gap-1.5 px-4 mb-1">
        <span className="text-[10px] text-gray-400 self-end mb-0.5 flex-shrink-0">
          {group.timestamp}
        </span>
        <div className="flex flex-col items-end gap-0.5 max-w-[62%]">
          {group.messages.map((m) => (
            <div
              key={m.id}
              className="px-3.5 py-2 text-[13px] leading-relaxed text-white break-words"
              style={{ background: '#8B1A1A', borderRadius: '14px 4px 14px 14px' }}
            >
              {m.text}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-end gap-2 px-4 mb-1">
      <div
        className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold self-end"
        style={{ background: '#5B7FBA' }}
      >
        {group.avatar}
      </div>
      <div className="flex flex-col gap-0.5 max-w-[62%]">
        <span className="text-[11px] text-gray-500 font-medium ml-0.5 mb-0.5">{group.senderName}</span>
        {group.messages.map((m) => (
          <div
            key={m.id}
            className="px-3.5 py-2 text-[13px] leading-relaxed text-gray-800 break-words"
            style={{
              background: '#FFFFFF',
              borderRadius: '4px 14px 14px 14px',
              border: '1px solid #E8E8E8',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
            }}
          >
            {m.text}
          </div>
        ))}
      </div>
      <span className="text-[10px] text-gray-400 self-end mb-0.5 flex-shrink-0">
        {group.timestamp}
      </span>
    </div>
  )
}
