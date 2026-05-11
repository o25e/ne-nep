export type Intimacy = 0 | 1 | 2 | 3 | 4

export interface Contact {
  id: string
  name: string
  role: string
  avatar: string
  intimacy: Intimacy
  traits: string[]
  lastSeen: string
  isOnline: boolean
}

export interface Message {
  id: string
  senderId: string
  text: string
  timestamp: string
  isMe: boolean
}

export const INTIMACY_LABELS: Record<Intimacy, string> = {
  0: '거의 모르는 사이',
  1: '조금 아는 사이',
  2: '적당한 사이',
  3: '편한 사이',
  4: '친한 사이',
}

export const ME = { name: '김현아', avatar: '김' }

export const contacts: Contact[] = [
  {
    id: 'c1',
    name: '박지훈 팀장',
    role: '개발팀 팀장',
    avatar: '박',
    intimacy: 2,
    traits: ['#무뚝뚝함', '#두괄식', '#답장짧음', '#바쁨'],
    lastSeen: '방금',
    isOnline: true,
  },
  {
    id: 'c2',
    name: '이수연',
    role: '디자인팀',
    avatar: '이',
    intimacy: 4,
    traits: ['#친절함', '#상세설명선호', '#이모티콘많음', '#꼼꼼함'],
    lastSeen: '5분 전',
    isOnline: true,
  },
  {
    id: 'c3',
    name: '김대표',
    role: 'CEO',
    avatar: '김',
    intimacy: 0,
    traits: ['#격식중시', '#요점중심', '#빠른결정', '#결과지향'],
    lastSeen: '1시간 전',
    isOnline: false,
  },
  {
    id: 'c4',
    name: '최민준',
    role: '마케팅팀',
    avatar: '최',
    intimacy: 3,
    traits: ['#유머있음', '#빠른답장', '#트렌드민감', '#외향적'],
    lastSeen: '30분 전',
    isOnline: true,
  },
]

export const chatRooms: Record<string, Message[]> = {
  c1: [
    { id: 'm1', senderId: 'c1', text: '오늘 배포 일정 어떻게 됩니까', timestamp: '오전 10:02', isMe: false },
    { id: 'm2', senderId: 'me', text: '오후 3시로 잡았습니다', timestamp: '오전 10:03', isMe: true },
    { id: 'm3', senderId: 'c1', text: '알겠습니다', timestamp: '오전 10:04', isMe: false },
    { id: 'm4', senderId: 'c1', text: 'QA는요', timestamp: '오전 10:04', isMe: false },
    { id: 'm5', senderId: 'me', text: '오전 중으로 완료 예정입니다', timestamp: '오전 10:06', isMe: true },
    { id: 'm6', senderId: 'c1', text: '확인했습니다', timestamp: '오전 10:07', isMe: false },
  ],
  c2: [
    { id: 'm1', senderId: 'c2', text: '안녕하세요! 오늘 디자인 시안 공유드릴게요 😊', timestamp: '오전 9:30', isMe: false },
    { id: 'm2', senderId: 'me', text: '네 감사합니다!', timestamp: '오전 9:31', isMe: true },
    { id: 'm3', senderId: 'c2', text: '피드백은 오늘 오후까지 주시면 좋을 것 같아요 ✨', timestamp: '오전 9:32', isMe: false },
    { id: 'm4', senderId: 'c2', text: '시안 링크 올려드릴게요~', timestamp: '오전 9:32', isMe: false },
  ],
  c3: [
    { id: 'm1', senderId: 'c3', text: '이번 분기 지표 정리해서 보고해주세요.', timestamp: '어제 오후 4:00', isMe: false },
    { id: 'm2', senderId: 'me', text: '네, 알겠습니다.', timestamp: '어제 오후 4:05', isMe: true },
  ],
  c4: [
    { id: 'm1', senderId: 'c4', text: '어제 런칭 행사 진짜 잘 됐죠 ㅋㅋ', timestamp: '오전 11:00', isMe: false },
    { id: 'm2', senderId: 'me', text: '네 덕분에 잘 마무리됐어요!', timestamp: '오전 11:01', isMe: true },
    { id: 'm3', senderId: 'c4', text: '다음 캠페인도 같이 해봐요!', timestamp: '오전 11:02', isMe: false },
  ],
}

// 연락처별 업무 주제 (친밀도 템플릿에 자연스럽게 결합되도록 설계)
const TOPICS: Record<string, string[][]> = {
  c1: [
    ['배포 일정', '오늘 배포 일정을 공유드리려고 합니다'],
    ['코드 리뷰', '이번 PR 코드 리뷰를 요청드리고자 합니다'],
    ['스프린트 회의 일정', '이번 주 스프린트 회의 일정을 조율하고 싶습니다'],
  ],
  c2: [
    ['디자인 시안 피드백', '전달해 주신 디자인 시안 피드백을 드리려고 합니다'],
    ['작업 파일 공유', '작업 파일 공유 관련하여 말씀드리고 싶습니다'],
    ['미팅 일정', '이번 주 미팅 일정을 확인하고 싶습니다'],
  ],
  c3: [
    ['이번 분기 성과 보고서', '이번 분기 성과 보고서 제출 건으로 연락드렸습니다'],
    ['임원 회의 안건', '다음 주 임원 회의 안건을 공유드리려 합니다'],
    ['사업 계획서 검토', '사업 계획서 검토를 요청드리고자 합니다'],
  ],
  c4: [
    ['이번 캠페인 자료', '이번 캠페인 자료 관련하여 말씀드리고 싶습니다'],
    ['마케팅 일정', '다음 달 마케팅 일정을 공유드리려 합니다'],
    ['콘텐츠 초안', '콘텐츠 초안 검토를 부탁드리고 싶습니다'],
  ],
}

let _variantCounter = 0

export function generateSingleMessage(
  _draft: string,
  intimacy: Intimacy,
  traits: string[],
  contact: Contact,
  _userNotes = ''
): string {
  const v = _variantCounter++ % 3
  const topicPool = TOPICS[contact.id] ?? [['업무 관련 사항', '업무 관련 사항을 여쭤보고자 합니다']]
  const [topic, fullContext] = topicPool[v]
  const isBusy = traits.includes('#바쁨') || traits.includes('#답장짧음')
  const isFormal = traits.includes('#격식중시') || traits.includes('#결과지향')
  const name = contact.name

  if (intimacy === 0) {
    return [
      `안녕하세요, ${name}님. 바쁘신 와중에 연락드려 죄송합니다.\n${fullContext}. 검토해 주시면 감사하겠습니다.`,
      `안녕하세요, ${name}님. ${topic} 관련하여 확인 부탁드리고자 연락드렸습니다.\n시간이 되실 때 회신 주시면 감사하겠습니다.`,
      `${name}님, 안녕하세요. ${fullContext}. 확인해 주시면 감사하겠습니다.`,
    ][v]
  }

  if (intimacy === 1) {
    return isFormal
      ? [
          `${name}님, ${topic} 관련하여 검토 부탁드립니다. 감사합니다.`,
          `${name}님, ${fullContext}. 확인해 주시면 감사하겠습니다.`,
          `${name}님, ${topic} 확인 부탁드리겠습니다. 감사합니다.`,
        ][v]
      : [
          `${name}님, ${topic} 관련하여 확인해 주시겠어요? 감사합니다.`,
          `${name}님, ${fullContext}. 검토 부탁드립니다.`,
          `${name}님, ${topic} 확인해 주시면 감사하겠습니다.`,
        ][v]
  }

  if (intimacy === 2) {
    return isBusy
      ? [
          `${name}님, ${topic} 확인 부탁드립니다!`,
          `${name}님, 바쁘신 중에 죄송한데 ${topic} 관련해서 확인해 주실 수 있을까요?`,
          `${name}님, ${topic} 관련하여 잠깐 봐주실 수 있을까요? 감사합니다!`,
        ][v]
      : [
          `${name}님, ${topic} 관련해서 확인 부탁드릴게요!`,
          `${name}님, ${fullContext}. 혹시 확인해 주실 수 있을까요?`,
          `${name}님, ${topic} 부탁드립니다. 감사합니다!`,
        ][v]
  }

  if (intimacy === 3) {
    return [
      `${name}님, ${topic} 관련해서 확인 부탁해요!`,
      `${name}님, ${topic} 혹시 확인됐나요? 알려주세요!`,
      `${name}님, ${fullContext}. 한 번 봐주실 수 있어요?`,
    ][v]
  }

  return [
    `${name}님, ${topic} 관련해서 확인해줄 수 있어요? 감사해요!`,
    `${name}님, ${topic} 됐는지 알려줄 수 있어요?`,
    `${name}님, ${fullContext}. 부탁해요~!`,
  ][v]
}
