export type Intimacy = 0 | 1 | 2 | 3 | 4;

export interface Contact {
  id: string;
  name: string;
  role: string;
  avatar: string;
  intimacy: Intimacy;
  inputGuide: string;
  traits: string[];
  lastSeen: string;
  isOnline: boolean;
  scenario: ScenarioType;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isMe: boolean;
}

export const INTIMACY_LABELS: Record<Intimacy, string> = {
  0: '공식적',
  1: '정중한',
  2: '보통',
  3: '편한',
  4: '친근한',
};

export type ScenarioType =
  | 'marketing_report'
  | 'design_feedback'
  | 'client_report'
  | 'casual_team';

export const ME = { name: '김현아', avatar: '김' };

export const contacts: Contact[] = [
  {
    id: 'c1',
    name: '박지훈 팀장',
    role: '마케팅팀 팀장',
    avatar: '박',
    intimacy: 2,
    //deck용: inputGuide: '혹시 회의 자료 위치를 여쭤봐도 될까요? 바쁘신 와중에 죄송합니다 팀장님 ㅠㅠ',
    //inputGuide: '지난주 회의 때 메타 광고 CTR 지금 확인 가능한지, 검토 후 괜찮으면 진행',
    inputGuide: '혹시 지난주 회의 때 말씀하셨던 메타 광고 CTR 데이터 있으실까요? 아 제가 지금 리포트 작업 중인데 반영을 해야 할 것 같아서요.. 근데 혹시 지금 바쁘시면 나중에 여쭤봐도 되는데 가능하시면 지금 확인 부탁드려도 될까요? 죄송합니다ㅠ',
    traits: ['#무뚝뚝함', '#두괄식', '#답장짧음', '#바쁨'],
    lastSeen: '방금',
    isOnline: true,
    scenario: 'marketing_report',
  },
  {
    id: 'c2',
    name: '이수연',
    role: '디자인팀',
    avatar: '이',
    intimacy: 4,
    //inputGuide: '공유받은 디자인 시안 CTA 버튼 컬러 대비 높이기, 클릭 유도 높이도록 수정 요청',
    inputGuide: '혹시 공유주셨던 디자인 시안 있잖아요..! 보니까 CTA 버튼 컬러가 조금 더 대비 있으면 클릭 유도가 더 잘 될 것 같아서요.!! 혹시 컬러 쪽 한 번만 수정 가능할지 여쭤봐도 될까요??',
    traits: ['#친절함', '#상세설명선호', '#이모티콘많음', '#꼼꼼함'],
    lastSeen: '5분 전',
    isOnline: true,
    scenario: 'design_feedback',
  },
  {
    id: 'c3',
    name: '송멋사',
    role: '외부 A사 주임',
    avatar: '안',
    intimacy: 0,
    //inputGuide: '지난 미팅 때 인플루언서 캠페인 작업 리스트 공유 요청, 다음 달 진행 예정',
    inputGuide: '주임님 혹시 지난 미팅 때 말씀 나왔던 인플루언서 캠페인 작업 리스트 혹시 공유 가능하실까요? 다음 달 진행 예정이라고 하셔서 미리 확인해두려고 합니다..!',
    traits: ['#격식중시', '#요점중심', '#빠른결정', '#결과지향'],
    lastSeen: '1시간 전',
    isOnline: false,
    scenario: 'client_report',
  },
  {
    id: 'c4',
    name: '오유진',
    role: '마케팅팀 인턴',
    avatar: '송',
    intimacy: 3,
    //inputGuide: '아까 말한 프린터 고장 건 기사님 오셨는지',
    inputGuide: '아까 프린터 고장났다고 들었는데, 기사님 혹시 오셨을까요!?',
    traits: ['#유머있음', '#빠른답장', '#트렌드민감', '#외향적'],
    lastSeen: '30분 전',
    isOnline: true,
    scenario: 'casual_team',
  },
  {
    id: 'c5',
    name: '한지수',
    role: '기획팀 주임',
    avatar: '한',
    intimacy: 1,
    inputGuide: '메시지를 작성해주세요.',
    traits: ['#신중함', '#꼼꼼함', '#전문적', '#체계적'],
    lastSeen: '방금',
    isOnline: true,
    scenario: 'marketing_report',
  },
];

export const chatRooms: Record<string, Message[]> = {
  c1: [
    {
      id: 'm1',
      senderId: 'me',
      text: '팀장님, 오늘 회의 5 회의실에서 진행 예정입니다.',
      timestamp: '오전 10:02',
      isMe: true,
    },
    {
      id: 'm2',
      senderId: 'c1',
      text: '오키 확인했어요.',
      timestamp: '오전 10:05',
      isMe: false,
    },
  ],
  c2: [
    {
      id: 'm1',
      senderId: 'c2',
      text: '안녕하세요 지은님! 디자인 시안 공유드릴게요 😊',
      timestamp: '오후 1:30',
      isMe: false,
    },

    {
      id: 'm2',
      senderId: 'me',
      text: '네 감사합니다!',
      timestamp: '오후 1:31',
      isMe: true,
    },
    {
      id: 'm3',
      senderId: 'c2',
      text: '피드백은 확인하시는대로 보내주세요~',
      timestamp: '오후 1:32',
      isMe: false,
    },
    {
      id: 'm4',
      senderId: 'c2',
      text: '시안 링크 올려드릴게요.',
      timestamp: '오후 1:32',
      isMe: false,
    },
  ],
  c3: [
    {
      id: 'm1',
      senderId: 'c3',
      text: '오늘 미팅 수고하셨습니다',
      timestamp: '어제 오후 4:00',
      isMe: false,
    },
    {
      id: 'm2',
      senderId: 'me',
      text: '수고하셨습니다, 대리님. 다음주 중으로 연락 드리겠습니다.',
      timestamp: '어제 오후 4:05',
      isMe: true,
    },
  ],
  c4: [
    {
      id: 'm1',
      senderId: 'c4',
      text: '사수님 오늘 말하신 파일 다 정리했습니다.',
      timestamp: '오후 5:10',
      isMe: false,
    },
    {
      id: 'm2',
      senderId: 'me',
      text: '수고했어요~ 근데 혹시',
      timestamp: '오후 5:11',
      isMe: true,
    },
  ],
  c5: [],
};
