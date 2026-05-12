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

interface Topic {
  title: string
  context: string
  keywords: string[]
}

// 연락처별 업무 주제 (친밀도 템플릿에 자연스럽게 결합되도록 설계)
const TOPICS: Record<string, Topic[]> = {
  c1: [
    {
      title: '배포 일정',
      context: '오늘 배포 일정을 공유드리려고 합니다',
      keywords: ['배포', '릴리즈', 'release', 'deploy', 'deployment', 'qa', '운영 반영'],
    },
    {
      title: '코드 리뷰',
      context: '이번 PR 코드 리뷰를 요청드리고자 합니다',
      keywords: ['코드 리뷰', '코드리뷰', '리뷰', 'pr', 'pull request', '머지', 'merge', '검토'],
    },
    {
      title: '스프린트 회의 일정',
      context: '이번 주 스프린트 회의 일정을 조율하고 싶습니다',
      keywords: ['스프린트', '회의', '일정', '미팅', '스크럼', 'sprint'],
    },
  ],
  c2: [
    {
      title: '디자인 시안 피드백',
      context: '전달해 주신 디자인 시안 피드백을 드리려고 합니다',
      keywords: ['디자인', '시안', '피드백', 'figma', '피그마', '수정'],
    },
    {
      title: '작업 파일 공유',
      context: '작업 파일 공유 관련하여 말씀드리고 싶습니다',
      keywords: ['파일', '공유', '전달', '링크', '자료', '첨부'],
    },
    {
      title: '미팅 일정',
      context: '이번 주 미팅 일정을 확인하고 싶습니다',
      keywords: ['미팅', '회의', '일정', '시간', '약속'],
    },
  ],
  c3: [
    {
      title: '이번 분기 성과 보고서',
      context: '이번 분기 성과 보고서 제출 건으로 연락드렸습니다',
      keywords: ['분기', '성과', '보고서', '지표', '매출', 'kpi'],
    },
    {
      title: '임원 회의 안건',
      context: '다음 주 임원 회의 안건을 공유드리려 합니다',
      keywords: ['임원', '회의', '안건', '논의', '아젠다'],
    },
    {
      title: '사업 계획서 검토',
      context: '사업 계획서 검토를 요청드리고자 합니다',
      keywords: ['사업', '계획서', '검토', '전략', '기획안'],
    },
  ],
  c4: [
    {
      title: '이번 캠페인 자료',
      context: '이번 캠페인 자료 관련하여 말씀드리고 싶습니다',
      keywords: ['캠페인', '행사', '런칭', '프로모션', '이벤트'],
    },
    {
      title: '마케팅 일정',
      context: '다음 달 마케팅 일정을 공유드리려 합니다',
      keywords: ['마케팅', '일정', '광고', '운영', '캘린더'],
    },
    {
      title: '콘텐츠 초안',
      context: '콘텐츠 초안 검토를 부탁드리고 싶습니다',
      keywords: ['콘텐츠', '초안', '카피', '문구', '게시물', '원고'],
    },
  ],
}

const DEFAULT_TOPIC: Topic = {
  title: '업무 관련 사항',
  context: '업무 관련 사항을 여쭤보고자 합니다',
  keywords: [],
}

function normalizeKeywordText(text: string) {
  return text.toLowerCase().replace(/\s+/g, '')
}

function getTopicScore(draft: string, topic: Topic) {
  const normalizedDraft = normalizeKeywordText(draft)
  const originalDraft = draft.toLowerCase()

  return topic.keywords.reduce((score, keyword) => {
    const normalizedKeyword = normalizeKeywordText(keyword)
    if (!normalizedKeyword) return score

    if (normalizedDraft.includes(normalizedKeyword) || originalDraft.includes(keyword.toLowerCase())) {
      return score + normalizedKeyword.length
    }

    return score
  }, 0)
}

function pickTopic(draft: string, contact: Contact) {
  const contactTopics = TOPICS[contact.id] ?? []
  const allTopics = Object.values(TOPICS).flat()
  const candidateTopics = contactTopics.length > 0 ? contactTopics : [DEFAULT_TOPIC]
  const matchedTopic = [...contactTopics, ...allTopics]
    .map((topic, index) => ({ topic, index, score: getTopicScore(draft, topic) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index)[0]?.topic

  return matchedTopic ?? candidateTopics[0] ?? DEFAULT_TOPIC
}

function applyNoteModifications(text: string, traits: string[]): string {
  if (traits.includes('#기분안좋음')) {
    if (!text.includes('죄송합니다')) {
      return `타이밍이 좋지 않을 수 있어 죄송합니다만,\n${text}`
    }
  }
  if (traits.includes('#피곤함')) {
    if (!text.includes('죄송합니다')) {
      return `피곤하실 텐데 죄송합니다. ${text}`
    }
  }
  if (traits.includes('#급함')) {
    const firstSentence = text.split('\n')[0].replace(/[!~]$/, '')
    return `${firstSentence}. 빠른 확인 부탁드립니다.`
  }
  if (traits.includes('#공손히') && !traits.includes('#격식중시') && !traits.includes('#결과지향')) {
    return text.replace(/!([\s]|$)/g, '.$1') + '\n감사합니다.'
  }
  return text
}

export function generateSingleMessage(
  _draft: string,
  intimacy: Intimacy,
  traits: string[],
  contact: Contact,
  variantIndex: number = 0
): string {
  const v = variantIndex % 3

  const matchedTopic = pickTopic(_draft, contact)
  const topic = matchedTopic.title
  const fullContext = matchedTopic.context
  const isBusy = traits.includes('#바쁨') || traits.includes('#답장짧음')
  const isFormal = traits.includes('#격식중시') || traits.includes('#결과지향') || traits.includes('#공손히')
  const name = contact.name

  let result: string

  if (intimacy === 0) {
    result = [
      `안녕하세요, ${name}님. 바쁘신 와중에 연락드려 죄송합니다.\n${fullContext}. 검토해 주시면 감사하겠습니다.`,
      `안녕하세요, ${name}님. ${topic} 관련하여 확인 부탁드리고자 연락드렸습니다.\n시간이 되실 때 회신 주시면 감사하겠습니다.`,
      `${name}님, 안녕하세요. ${fullContext}. 확인해 주시면 감사하겠습니다.`,
    ][v]
  } else if (intimacy === 1) {
    result = isFormal
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
  } else if (intimacy === 2) {
    result = isBusy
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
  } else if (intimacy === 3) {
    result = [
      `${name}님, ${topic} 관련해서 확인 부탁해요!`,
      `${name}님, ${topic} 혹시 확인됐나요? 알려주세요!`,
      `${name}님, ${fullContext}. 한 번 봐주실 수 있어요?`,
    ][v]
  } else {
    result = [
      `${name}님, ${topic} 관련해서 확인해줄 수 있어요? 감사해요!`,
      `${name}님, ${topic} 됐는지 알려줄 수 있어요?`,
      `${name}님, ${fullContext}. 부탁해요~!`,
    ][v]
  }

  return applyNoteModifications(result, traits)
}
