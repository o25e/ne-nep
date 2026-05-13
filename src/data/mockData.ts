export type Intimacy = 0 | 1 | 2 | 3 | 4;

export interface Contact {
  id: string;
  name: string;
  role: string;
  avatar: string;
  intimacy: Intimacy;
  traits: string[];
  lastSeen: string;
  isOnline: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isMe: boolean;
}

export const INTIMACY_LABELS: Record<Intimacy, string> = {
  0: '거의 모르는 사이',
  1: '조금 아는 사이',
  2: '적당한 사이',
  3: '편한 사이',
  4: '친한 사이',
};

export const ME = { name: '김현아', avatar: '김' };

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
];

export const chatRooms: Record<string, Message[]> = {
  c1: [
    {
      id: 'm1',
      senderId: 'me',
      text: '안녕하세요, 팀장님. 마케팅 팀 이지은 사원입니다. 지난주 회의 시 언급 주신 메타 광고 CTR 데이터 관련하여 지금 확인 가능하실지 문의드립니다. 검토해보시고 이상 없으시면 리포트에 반영하도록 하겠습니다. ',
      timestamp: '오전 10:02',
      isMe: true,
    },
    {
      id: 'm2',
      senderId: 'c1',
      text: '확인했어요. 이대로 진행하면 됩니다.',
      timestamp: '오전 10:05',
      isMe: false,
    },
    {
      id: 'm3',
      senderId: 'me',
      text: '확인해주셔서 감사합니다, 팀장님. 말씀 주신 내용 기준으로 수정 진행하겠습니다. 금일 퇴근 전까지 반영 완료 후 다시 공유드리겠습니다.',
      timestamp: '오전 10:07',
      isMe: true,
    },
    {
      id: 'm4',
      senderId: 'c1',
      text: '그래요, 수고해요.',
      timestamp: '오전 10:08',
      isMe: false,
    },
  ],
  c2: [
    {
      id: 'm1',
      senderId: 'c2',
      text: '안녕하세요! 오늘 디자인 시안 공유드릴게요 😊',
      timestamp: '오전 9:30',
      isMe: false,
    },
    {
      id: 'm2',
      senderId: 'me',
      text: '네 감사합니다!',
      timestamp: '오전 9:31',
      isMe: true,
    },
    {
      id: 'm3',
      senderId: 'c2',
      text: '피드백은 오늘 오후까지 주시면 좋을 것 같아요 ✨',
      timestamp: '오전 9:32',
      isMe: false,
    },
    {
      id: 'm4',
      senderId: 'c2',
      text: '시안 링크 올려드릴게요~',
      timestamp: '오전 9:32',
      isMe: false,
    },
  ],
  c3: [
    {
      id: 'm1',
      senderId: 'c3',
      text: '이번 분기 지표 정리해서 보고해주세요.',
      timestamp: '어제 오후 4:00',
      isMe: false,
    },
    {
      id: 'm2',
      senderId: 'me',
      text: '네, 알겠습니다.',
      timestamp: '어제 오후 4:05',
      isMe: true,
    },
  ],
  c4: [
    {
      id: 'm1',
      senderId: 'c4',
      text: '어제 런칭 행사 진짜 잘 됐죠 ㅋㅋ',
      timestamp: '오전 11:00',
      isMe: false,
    },
    {
      id: 'm2',
      senderId: 'me',
      text: '네 덕분에 잘 마무리됐어요!',
      timestamp: '오전 11:01',
      isMe: true,
    },
    {
      id: 'm3',
      senderId: 'c4',
      text: '다음 캠페인도 같이 해봐요!',
      timestamp: '오전 11:02',
      isMe: false,
    },
  ],
};

export function generateSingleMessage(
  draft: string,
  intimacy: Intimacy,
  traits: string[],
  contact: Contact,
  _userNotes = '',
): string {
  const base =
    draft.trim() ||
    '지난주 회의 때 메타 광고 CTR 확인 가능한지, 검토 후 괜찮으면 진행';

  const name = contact.name;
  const isBusy = traits.includes('#바쁨') || traits.includes('#답장짧음');

  const transforms: Record<Intimacy, (text: string) => string> = {
    0: (text) =>
      `안녕하세요, ${name}님. 바쁘신 와중에 연락드려 죄송합니다.\n${text}\n확인해 주시면 감사하겠습니다.`,
    1: (text) => `${name}님, ${text}\n검토해 주시면 감사하겠습니다.`,
    2: (text) =>
      isBusy
        ? `${name}님, 바쁘신 중에 죄송한데 ${text} 확인해 주실 수 있을까요?`
        : `${name}님, ${text} 확인 부탁드릴게요!`,
    3: (text) => `${name}님, ${text} 한번 봐주실 수 있어요?`,
    4: (text) => `${name}님, ${text} 확인해줄 수 있어요? ㅎㅎ`,
  };

  return transforms[intimacy](draft);
}
