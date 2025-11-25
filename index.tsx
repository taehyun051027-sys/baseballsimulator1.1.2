import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleGenAI } from "@google/genai";
import { 
  Smartphone, 
  MessageSquare, 
  User, 
  Activity, 
  Calendar, 
  Settings, 
  Save, 
  Power, 
  Send, 
  Menu,
  Trophy,
  TrendingUp,
  Newspaper,
  ChevronRight,
  AlertCircle,
  MapPin,
  Briefcase,
  School,
  ArrowRight,
  Check,
  BarChart2,
  List,
  Radar,
  Globe,
  Users,
  X,
  Grid,
  Target,
  Zap,
  Key,
  Users2,
  Download,
  Trash2,
  Disc,
  ExternalLink,
  RotateCcw,
  AlertTriangle,
  Heart,
  Gift,
  Coffee
} from 'lucide-react';

// --- ROSTER DATA 2026 (UPDATED PER REQUEST) ---
const KBO_ROSTERS_2026 = `
[KT 위즈]
투수조:
- 선발: 고영표, 소형준, 오원석, 배제성, 문용익
- 불펜: 우규민, 김민수, 주권, 전용주, 이상동, 원상현
- 셋업: 손동현
- 마무리: 박영현
- 2군: 박건우, 김재원, 강건, 이채호, 임준형, 조이현
야수조:
- 포수: 장성우, 강현우
- 1루수: 황재균, 문상철
- 2루수: 김상수, 권동진
- 3루수: 허경민, 류현인
- 유격수: 장준원
- 외야수: 김민혁(좌), 배정대(중), 안현민(우), 장진혁, 이정훈
- 2군: 조대현, 이강민, 오서진, 오윤석, 윤준혁, 안치영, 유준규

[삼성 라이온즈]
투수조:
- 선발: 원태인, 최원태, 양창섭, 배찬승, 좌승현
- 불펜: 김무신, 최지광, 이승민, 백정현, 임기영, 이재익
- 셋업: 이호성
- 마무리: 김재윤
- 2군: 정민성, 김대호, 육선엽, 최하늘
야수조:
- 포수: 이병헌, 김재성
- 1루수: 전병우
- 2루수: 류지혁
- 3루수: 김영웅
- 유격수: 이재현
- 외야수: 구자욱(좌), 김성윤(중), 박승규(우), 김헌곤, 이성규
- 벤치: 김지찬, 김태훈, 심재훈
- 2군: 이창용, 양우현, 김재혁, 함수호

[SSG 랜더스]
투수조:
- 선발: 김광현, 김건우, 문승원, 송영진, 최민준
- 불펜: 이로운, 김민, 박시후, 전영준, 김택형, 한두솔
- 셋업: 노경은
- 마무리: 조병현
- 2군: 박종훈, 윤태현, 서진용, 박기호, 조요한, 장지훈, 백승건
야수조:
- 포수: 조형우, 이지영, 김민식(2군)
- 1루수: 고명준, 전의산
- 2루수: 정준재, 안상현
- 3루수: 최정, 최준우
- 유격수: 박성한, 박지환
- 외야수: 오태곤(좌), 최지훈(중), 한유섬(우), 김성욱, 하재훈(2군), 이정범(2군)
- 지타: 류효승
- 2군: 이율예, 현원회, 석정우, 이승민, 김창평

[한화 이글스]
투수조:
- 선발: 류현진, 문동주, 엄상백, 김민우
- 불펜: 조동욱, 황준서, 김종수, 정우주, 박상원, 김범수
- 셋업: 한승혁
- 마무리: 김서현
- 2군: 박준영, 강재민, 윤산흠, 주현상, 권민규
야수조:
- 포수: 최재훈, 허인서
- 1루수: 채은성
- 2루수: 하주석, 황영묵
- 3루수: 노시환, 김태연
- 유격수: 심우준, 이도윤
- 외야수: 문현빈(좌), 이원석(중), 강백호(우), 이진영, 최인호, 임종찬(2군)
- 지타: 손아섭
- 신인: 오재원(19세)
- 2군: 장규현, 박정현

[키움 히어로즈]
투수조:
- 선발: 안우진, 하영민, 정현우, 김윤하, 박정훈
- 불펜: 원종현, 박윤성, 오석주, 김선기, 윤석원, 이준우
- 셋업: 조영건
- 마무리: 주승우
- 2군: 김서준, 최현우, 윤현, 손힘찬, 박주성
야수조:
- 포수: 김건희, 김동헌
- 1루수: 최주환
- 2루수: 김태진, 오선진
- 3루수: 송성문
- 유격수: 어준서
- 외야수: 임지열(좌), 이주형(중), 박주홍(우), 박수종, 이형종, 임병욱, 전태현
- 지타: 주성원
- 2군: 박준형, 김리안, 염승원, 이명기, 이용규, 장재영

[NC 다이노스]
투수조:
- 선발: 신민혁(27), 구창모(29), 김녹원(23), 이재학(36), 목지훈(22)
- 불펜: 김영규(26), 배재환(31), 손주환(24), 전사민(27), 하준영(27), 김재열(30)
- 셋업: 김진호(28)
- 마무리: 류진욱(29)
- 2군: 신영우, 임지민, 김태경, 최성영, 이준혁, 최우석, 김태훈, 임정호
야수조:
- 포수: 김형준(27), 박세혁(36), 안중열(2군)
- 1루수: 오영수(26)
- 2루수: 박민우(33), 최정원(26)
- 3루수: 김휘집(24), 서호철(30), 신재인(2군)
- 유격수: 김주원(24), 김한별(25), 홍종표(2군)
- 외야수: 권희동(좌), 최원준(중/잔류), 박건우(우), 천재환, 이우성, 고준휘(2군)

[LG 트윈스]
투수조:
- 선발: 임찬규(34/FA예정), 손주영(27), 송승기(24), 이민호(25), 김윤식(26)
- 불펜: 김영우(21), 함덕주(31), 이정용(29), 장현식(31), 박명근(22), 이지강(27)
- 셋업: 김진성(41)
- 마무리: 유영찬(29)
- 2군: 정우영, 백승현, 최채흥, 박시원
야수조:
- 포수: 박동원(36), 이재원(27), 이주헌(23), 김준태(2군)
- 1루수: 송찬의(27)
- 2루수: 신민재(30)
- 3루수: 문보경(26)
- 유격수: 오지환(36)
- 외야수: 문성주(좌), 박해민(중), 홍창기(우), 김현수(지타), 최원영(2군), 박관우(2군)
- 벤치: 구본혁, 이영빈, 천성호, 손용준(2군)

[롯데 자이언츠]
투수조:
- 선발: 박세웅, 나균안, 이민석, 김진욱, 홍민기
- 불펜: 김강현, 정현수, 최준용, 윤성빈, 박진, 박준우
- 셋업: 정철원
- 마무리: 김원중
- 2군: 김상수, 구승민, 송재영, 김태현, 한현희, 심재민
야수조:
- 포수: 유강남, 손성빈, 정보근(2군)
- 1루수: 나승엽
- 2루수: 고승민
- 3루수: 한동희
- 유격수: 전민재, 박승욱(2군), 노진혁(2군)
- 외야수: 황성빈(좌), 장두성(중), 윤동희(우), 김민성(2군), 조세진(2군)
- 지타: 전준우, 정훈(2군)
- 벤치: 한태양, 이호준, 박찬형, 손호영, 김동혁

[두산 베어스]
투수조:
- 선발: 곽빈, 최승용, 최민석, 윤태호, 최준호
- 불펜: 이영하, 박신지, 이병헌, 최지강, 양재훈, 최원준
- 셋업: 박치국
- 마무리: 김택연
- 2군: 서준오, 홍민규, 김유성, 김정우, 이교훈
야수조:
- 포수: 양의지, 김기연, 윤준호(2군), 류현준(2군)
- 1루수: 양석환
- 2루수: 박준순, 이유찬(2군)
- 3루수: 안재석
- 유격수: 박찬호, 박계범(2군)
- 외야수: 김인태(좌), 정수빈(중), 김대한(우), 조수행, 홍성호(2군), 전다민(2군), 김동준(2군)
- 지타: 김재환
- 벤치: 박지훈, 오명진, 임종성, 강승호

[KIA 타이거즈]
투수조:
- 선발: 양현종(37), 이의리(24), 김도현(26), 김태형(20), 황동하(24)
- 불펜: 김기훈(26), 성영탁(22), 한재승(25), 최지민(23), 조상우(32), 이준영(34)
- 셋업: 전상현(30)
- 마무리: 정해영(25)
- 2군: 김현수, 김건국, 이도현, 김시훈, 윤중현, 김대유
야수조:
- 포수: 한준수(27), 김태군(37), 주효상(29/2군)
- 1루수: 오선우(30), 황대인(2군)
- 2루수: 김선빈(37)
- 3루수: 윤도현(23), 변우혁(26)
- 유격수: 김도영(23), 박민(25)
- 외야수: 김석환(좌), 김호령(중), 나성범(우), 박정우, 이창진, 고종욱(2군)
- 지타: 최형우(43)
- 2군: 정현창, 정해원, 박재현
`;

// --- SYSTEM PROMPT ---

const SYSTEM_PROMPT_CORE = `
# 역할 정의
너는 초현실 야구 커리어 시뮬레이터 **[나만의 야구 선수 키우기]**의 전담 게임 마스터(GM)다.
플레이어는 **“야구선수 1명”**의 인생을 플레이한다.

# 세계관 및 데이터베이스 (엄격 준수)
1. **2026 KBO 로스터**: 아래 데이터를 기반으로 소속팀 및 상대팀 라인업을 구성하라.
${KBO_ROSTERS_2026}
2. **초현실적 디테일 (Reality Level MAX)**:
   - 경기 결과뿐만 아니라, **구단 내부 정치, 팀 분위기(Chemistry), 스폰서 계약, 연봉 협상 갈등, 팬덤 여론** 등을 상세히 묘사하라.
   - **연애 및 사생활**: 여성 캐릭터(아나운서, 치어리더, 연예인, 일반인 등)와의 만남, 데이트, 썸, 연애, 결혼 이벤트를 적극적으로 구현하라.
   - 야구 외적인 사건(구설수, 기부, 광고 촬영)도 플레이어의 스타성에 영향을 미친다.

# 난이도별 규칙 (중요)
1. **쉬움/보통/어려움/매우 어려움**:
   - 현실적인 성장 속도를 유지하라.
   - 초기 스탯은 낮게(OVR 30~50) 설정하고, 5의 배수가 아닌 불규칙한 숫자를 사용하라.
2. **막장 (Crazy/Sandbox)**:
   - **모든 제약을 무시하라.** 플레이어는 신(God)에 가까운 재능을 가질 수 있다.
   - 초기 스탯을 999로 설정하거나, 타율 8할, 시속 200km 등 비현실적인 플레이도 허용한다.
   - 외계인 침공, 초능력 야구 등 황당하고 웃긴 이벤트를 적극적으로 발생시켜라. 플레이어의 요구를 무조건 들어줘라.

# 핵심 규칙
1. **GM 메시지**: 소설처럼 서술하되, 코드 블록을 본문에 쓰지 마라.
2. **입력 인식**: 숫자 "1"은 "1번 선택지"다. "11"로 오인식 금지.
3. **날짜 진행**: 플레이어 행동 시 반드시 날짜를 업데이트하라.

# JSON 출력 데이터
응답의 **맨 마지막**에 반드시 아래 JSON을 포함하라.
\`romance\` 필드에 연애 관련 데이터를 포함하라.

\`\`\`json
{
  "status": {
    "name": "이름",
    "team": "소속팀",
    "position": "포지션", 
    "age": "만 나이",
    "ovr": "42 (F)",
    "condition": "최상",
    "money": "3,000만원",
    "followers": 120,
    "team_chemistry": "좋음", 
    "sponsor": "없음"
  },
  "date": "2026년 2월",
  "abilities": { ... },
  "advanced_stats": { ... },
  "league_data": { ... },
  "team_roster": { ... },
  "yearly_records": [],
  "career_stats": { ... },
  "romance": {
    "partners": [
       { "name": "김민지", "job": "스포츠 아나운서", "age": 26, "affection": 45, "status": "썸", "desc": "취재차 자주 만나는 사이" }
    ]
  },
  "sns_feed": [],
  "messages": []
}
\`\`\`
`;

const HIGH_SCHOOLS = [
  "랜덤 (Random)",
  "덕수고 (서울)", "휘문고 (서울)", "서울고 (서울)", "충암고 (서울)", "경기상업고 (서울)", "신일고 (서울)",
  "유신고 (경기)", "야탑고 (경기)", 
  "북일고 (충청)", 
  "광주제일고 (전라)", 
  "경남고 (부산)", "부산고 (부산)", 
  "경북고 (대구)", "대구고 (대구)", 
  "마산용마고 (경남)", 
  "강릉고 (강원)", 
  "전주고 (전북)"
];

// --- TYPES ---

interface PlayerStatus {
  name: string;
  team: string;
  position: string;
  age: string;
  ovr: string;
  condition: string;
  money: string;
  followers: number;
  team_chemistry?: string; // New: Team Chemistry
  sponsor?: string;        // New: Sponsor
}

interface PlayerAbilities {
  [key: string]: string | undefined;
}

interface AdvancedStats {
  [key: string]: string | undefined;
}

interface TeamStanding {
  rank: number;
  team: string;
  w: number;
  l: number;
  d: number;
  gb: string;
}

interface LeaderboardItem {
  name: string;
  team: string;
  val: string;
}

interface LeagueData {
  league_name: string;
  standings: TeamStanding[];
  leaderboards: {
    [key: string]: LeaderboardItem[];
  };
}

interface TeamRoster {
    pitchers: string[];
    batters: string[];
}

interface YearlyRecord {
  year: number;
  team: string;
  [key: string]: any;
}

interface CareerStats {
  g: string;
  [key: string]: any;
}

interface SNSPost {
  type: 'SNS' | 'COMMUNITY' | 'NEWS';
  user: string;
  content: string;
  likes: number;
}

interface Message {
  from: string;
  content: string;
}

// New Romance Type
interface RomancePartner {
    name: string;
    job: string;
    age: number;
    affection: number; // 0-100
    status: string; // 지인, 썸, 연인, 부부 등
    desc: string;
}

interface RomanceData {
    partners: RomancePartner[];
}

interface DashboardData {
  status: PlayerStatus;
  date: string;
  abilities: PlayerAbilities;
  advanced_stats: AdvancedStats;
  league_data: LeagueData;
  team_roster?: TeamRoster;
  yearly_records: YearlyRecord[];
  career_stats: CareerStats;
  sns_feed: SNSPost[];
  messages: Message[];
  romance?: RomanceData; // New Field
}

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

// Game Creation Types
type GameStage = 'API_KEY_INPUT' | 'START' | 'ROUTE_SELECT' | 'DIFFICULTY_SELECT' | 'PLAYER_FORM' | 'GAME';
type RouteType = 'HIGHSCHOOL_2024' | 'PRO_2026';
type DifficultyType = '쉬움' | '보통' | '어려움' | '매우 어려움' | '막장'; // Added '막장'
type ViewMode = 'CHAT' | 'STATS' | 'RECORDS' | 'LEAGUE' | 'TEAM' | 'LOVE'; // Added 'LOVE'

interface PlayerFormData {
  name: string;
  position: string;
  role: string;
  team: string;
  style: string;
  school: string;
}

interface SaveSlot {
    id: number;
    data: any | null;
}

// --- HELPER FUNCTION ---
const getPositionType = (pos: string = ''): 'PITCHER' | 'BATTER' | 'TWOWAY' => {
  if (pos.includes('투타') || pos.includes('겸업')) return 'TWOWAY';
  if (pos.includes('투수')) return 'PITCHER';
  return 'BATTER';
};

// --- INITIAL STATE CONSTANT ---
const INITIAL_DASHBOARD: DashboardData = {
  status: { name: '-', team: '-', position: '-', age: '-', ovr: '-', condition: '-', money: '0', followers: 0 },
  date: '게임 시작 전',
  abilities: {},
  advanced_stats: {},
  league_data: { league_name: '-', standings: [], leaderboards: {} },
  yearly_records: [],
  career_stats: { g: '-' },
  sns_feed: [],
  messages: [],
  team_roster: { pitchers: [], batters: [] },
  romance: { partners: [] }
};

// --- APP COMPONENT ---

const App = () => {
  const [userApiKey, setUserApiKey] = useState('');
  const [gameStage, setGameStage] = useState<GameStage>('API_KEY_INPUT');
  
  // Game Setup State
  const [selectedRoute, setSelectedRoute] = useState<RouteType | null>(null);
  const [difficulty, setDifficulty] = useState<DifficultyType>('보통');
  const [playerForm, setPlayerForm] = useState<PlayerFormData>({
    name: '',
    position: '투수',
    role: '우투우타',
    team: '랜덤',
    style: '밸런스형',
    school: '랜덤 (Random)'
  });

  // Main Game State
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [showPhone, setShowPhone] = useState(false);
  const [phoneApp, setPhoneApp] = useState<'HOME' | 'SNS' | 'MSG'>('HOME');
  const [currentView, setCurrentView] = useState<ViewMode>('CHAT');
  
  // Records View Tab State
  const [recordTab, setRecordTab] = useState<'SEASON' | 'YEARLY' | 'CAREER'>('SEASON');

  // Save/Load State
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [isSaveMode, setIsSaveMode] = useState(false);
  const [saveSlots, setSaveSlots] = useState<SaveSlot[]>([]);

  // Confirmation Modal State
  const [confirmModal, setConfirmModal] = useState<{ type: 'EXIT' | 'LOAD' | 'DELETE', slotId?: number } | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (currentView === 'CHAT') {
      setTimeout(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, isLoading, currentView]);

  // Load API Key from local storage if available
  useEffect(() => {
    const storedKey = localStorage.getItem('gemini_api_key');
    if (storedKey) {
        setUserApiKey(storedKey);
        setGameStage('START');
    }
  }, []);

  // Effect to refresh slots whenever modal opens
  useEffect(() => {
    if (showSaveModal) {
      refreshSaveSlots();
    }
  }, [showSaveModal]);

  const refreshSaveSlots = () => {
    const slots: SaveSlot[] = [];
    for(let i=1; i<=3; i++) {
        try {
            const saved = localStorage.getItem(`baseball_save_slot_${i}`);
            slots.push({ id: i, data: saved ? JSON.parse(saved) : null });
        } catch (e) {
            console.error(`Error loading slot ${i}`, e);
            slots.push({ id: i, data: null });
        }
    }
    setSaveSlots(slots);
  };

  const handleSave = (slotId: number) => {
    // Current state check
    if (!dashboardData || chatHistory.length === 0) {
        alert("저장할 게임 데이터가 없습니다.");
        return;
    }

    const saveObj = {
        chatHistory,
        dashboardData,
        playerForm,
        selectedRoute,
        difficulty,
        savedAt: new Date().toLocaleString()
    };
    
    try {
        localStorage.setItem(`baseball_save_slot_${slotId}`, JSON.stringify(saveObj));
        refreshSaveSlots();
        alert(`${slotId}번 슬롯에 저장되었습니다.`);
    } catch (e) {
        console.error(e);
        alert("저장에 실패했습니다. 저장 공간(5MB)이 부족할 수 있습니다. 불필요한 슬롯을 삭제해주세요.");
    }
  };

  const handleLoadRequest = (slotId: number) => {
    const slot = saveSlots.find(s => s.id === slotId);
    if (!slot || !slot.data) {
        alert("데이터가 없는 슬롯입니다.");
        return;
    }
    setConfirmModal({ type: 'LOAD', slotId });
  };

  const executeLoad = (slotId: number) => {
    const slot = saveSlots.find(s => s.id === slotId);
    if (!slot || !slot.data) return;

    try {
        const { chatHistory: savedHistory, dashboardData: savedDashboard, playerForm: savedForm, selectedRoute: savedRoute, difficulty: savedDiff } = slot.data;
        
        if (!savedHistory || !savedDashboard) {
            throw new Error("필수 데이터가 누락되었습니다.");
        }

        // Robust data merging
        const mergedDashboard = {
            ...INITIAL_DASHBOARD,
            ...savedDashboard,
            status: { ...INITIAL_DASHBOARD.status, ...savedDashboard.status },
            abilities: { ...INITIAL_DASHBOARD.abilities, ...savedDashboard.abilities },
            league_data: { ...INITIAL_DASHBOARD.league_data, ...savedDashboard.league_data },
            romance: { ...INITIAL_DASHBOARD.romance, ...savedDashboard.romance }, // Merge romance
        };

        // Batch updates
        setChatHistory(savedHistory);
        setDashboardData(mergedDashboard);
        setPlayerForm(savedForm || { name: 'Unknown', position: '투수', role: '우투우타', team: '무소속', style: 'Unknown', school: 'Unknown' });
        setSelectedRoute(savedRoute || 'PRO_2026');
        setDifficulty(savedDiff || '보통');
        
        // Finalize
        setTimeout(() => {
            setGameStage('GAME');
            setCurrentView('CHAT');
            setShowSaveModal(false);
            setConfirmModal(null);
        }, 50);

    } catch (e) {
        console.error("Load Error:", e);
        alert("저장된 데이터를 불러오는 중 오류가 발생했습니다.");
    }
  };

  const handleDeleteRequest = (slotId: number, e: React.MouseEvent) => {
      e.stopPropagation();
      setConfirmModal({ type: 'DELETE', slotId });
  };

  const executeDelete = (slotId: number) => {
      localStorage.removeItem(`baseball_save_slot_${slotId}`);
      refreshSaveSlots();
      setConfirmModal(null);
  };

  const handleExitRequest = () => {
      setConfirmModal({ type: 'EXIT' });
  }

  const executeExit = () => {
      setGameStage('START');
      setConfirmModal(null);
      setDashboardData(INITIAL_DASHBOARD); // Clear current data
      setChatHistory([]);
  }

  const handleApiKeySubmit = () => {
    if (userApiKey.trim().length > 10) {
      localStorage.setItem('gemini_api_key', userApiKey);
      setGameStage('START');
    } else {
      alert("유효한 API Key를 입력해주세요.");
    }
  };

  const handleInitialStart = () => {
    // Reset all game state for a new game
    setChatHistory([]);
    setDashboardData(INITIAL_DASHBOARD);
    setGameStage('ROUTE_SELECT');
  };

  const handleRouteSelect = (route: RouteType) => {
    setSelectedRoute(route);
    setGameStage('DIFFICULTY_SELECT');
  };

  const handleDifficultySelect = (diff: DifficultyType) => {
    setDifficulty(diff);
    setGameStage('PLAYER_FORM');
  };

  const handleGameLaunch = async () => {
    if (!playerForm.name.trim()) {
      alert("이름을 입력해주세요.");
      return;
    }

    setGameStage('GAME');
    setChatHistory([]);
    
    // Initial empty data
    setDashboardData({
      ...INITIAL_DASHBOARD,
      status: { ...INITIAL_DASHBOARD.status, name: playerForm.name, position: playerForm.position, team: '-' },
      date: '게임 생성 중...'
    });

    const routeDesc = selectedRoute === 'HIGHSCHOOL_2024' ? "2024년 고교 1학년" : "2026년 KBO 신인 1년차";
    const startDate = selectedRoute === 'HIGHSCHOOL_2024' ? "2024년 1월" : "2026년 1월";
    
    let schoolInfo = "";
    if (selectedRoute === 'HIGHSCHOOL_2024') {
        schoolInfo = `- 소속 고교: ${playerForm.school}\n   - 선호(응원) 구단: ${playerForm.team}`;
    } else {
        schoolInfo = `- 소속 구단(드래프트/입단): ${playerForm.team}`;
    }

    // Crazy Mode special prompt injection
    const crazyModeInstruction = difficulty === '막장' 
      ? `\n[!!!막장 모드 활성화!!!]\n- 이 모드는 'Sandbox/Crazy' 모드다.\n- 현실성을 무시하고 플레이어에게 압도적인 재능(초기 능력치 999 등)을 부여하거나, 비현실적인 재미를 추구하라.\n- 외계인, 마법, 초능력 야구 등 무엇이든 가능하다.`
      : ``;

    const initialPrompt = `
[시스템: 플레이어 초기 설정]
1. 루트: ${routeDesc} (${startDate} 시작)
2. 난이도: ${difficulty} (초기 스탯 및 성장 난이도, 이벤트 빈도 적용)
3. 정보:
   - 이름: ${playerForm.name}
   - 포지션: ${playerForm.position} (${playerForm.role})
   ${schoolInfo}
   - 스타일: ${playerForm.style}
${crazyModeInstruction}

위 설정을 바탕으로 오프닝을 진행하라. 
JSON 데이터를 출력하고, '막장' 난이도가 아니라면 초기 스탯은 신인임을 감안하여 **매우 낮고 현실적**으로(OVR 30~50) 설정하라.
`;
    
    await sendMessage(initialPrompt, true);
  };

  const parseResponse = (text: string) => {
    const jsonRegex = /```json\s*([\s\S]*?)\s*```/;
    const match = text.match(jsonRegex);
    let cleanText = text;
    
    if (match) {
      try {
        const jsonStr = match[1];
        const data = JSON.parse(jsonStr);
        setDashboardData(prev => {
           // Safe merge with previous state
           const safePrev = prev || INITIAL_DASHBOARD;
           return {
             ...safePrev,
             ...data,
             status: { ...safePrev.status, ...data.status },
             abilities: { ...safePrev.abilities, ...data.abilities },
             advanced_stats: { ...safePrev.advanced_stats, ...data.advanced_stats },
             league_data: { ...safePrev.league_data, ...data.league_data },
             team_roster: data.team_roster || safePrev.team_roster,
             yearly_records: data.yearly_records || safePrev.yearly_records,
             career_stats: data.career_stats || safePrev.career_stats,
             sns_feed: data.sns_feed || safePrev.sns_feed,
             messages: data.messages || safePrev.messages,
             romance: data.romance || safePrev.romance, // Merge romance data
           } as DashboardData;
        });
        // Remove the JSON block from the text shown to user
        cleanText = text.replace(match[0], '').trim();
      } catch (e) {
        console.error("JSON Parse Error", e);
      }
    }
    return cleanText;
  };

  const sendMessage = async (text: string, isSystemInit = false) => {
    if (!text.trim() && !isLoading) return;
    
    // STRICT input handling for numbers to avoid "1" -> "11" confusion
    let processedInput = text;
    const digitMatch = text.trim().match(/^(\d+)$/);
    if (digitMatch) {
      const selectedNum = digitMatch[1];
      processedInput = `[선택: ${selectedNum}] (유저가 ${selectedNum}번을 선택했습니다. 11번, 21번 등 다른 숫자와 혼동하지 마세요.)`;
    }

    let newHistory = [...chatHistory];
    if (!isSystemInit) {
      newHistory.push({ role: 'user', text: processedInput, timestamp: Date.now() });
      setChatHistory(newHistory);
      setInput('');
    }
    
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: userApiKey });
      const chat = ai.chats.create({
        model: "gemini-2.5-flash",
        config: {
          systemInstruction: SYSTEM_PROMPT_CORE,
          temperature: difficulty === '막장' ? 0.9 : 0.7, // Higher creativity for Crazy mode
        },
        history: newHistory.map(h => ({
          role: h.role,
          parts: [{ text: h.text }]
        }))
      });

      const response = await chat.sendMessage({ message: isSystemInit ? text : processedInput });
      const responseText = response.text || ""; 
      const displayText = parseResponse(responseText); // strips JSON

      setChatHistory(prev => [...prev, { role: 'model', text: displayText, timestamp: Date.now() }]);

    } catch (error: any) {
      console.error("API Error:", error);
      let errorMsg = "오류가 발생했습니다.";
      if (error.message && error.message.includes("API key")) {
          errorMsg = "API Key 오류. 키를 확인하세요.";
      }
      setChatHistory(prev => [...prev, { role: 'model', text: `[시스템 오류] ${errorMsg}`, timestamp: Date.now() }]);
    } finally {
      setIsLoading(false);
    }
  };

  // --- RENDERING HELPERS ---
  const posType = getPositionType(dashboardData?.status.position || playerForm.position);

  // --- SAVE/LOAD MODAL ---
  if (showSaveModal) {
      return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
              <div className="bg-slate-800 rounded-2xl w-full max-w-lg border border-slate-700 shadow-2xl overflow-hidden relative">
                  {/* CONFIRMATION OVERLAY */}
                  {confirmModal && (
                      <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-sm p-6 animate-in fade-in duration-200">
                          <div className="bg-slate-800 border border-slate-600 p-6 rounded-2xl shadow-2xl max-w-sm w-full text-center">
                              <AlertTriangle size={48} className="text-yellow-500 mx-auto mb-4"/>
                              <h3 className="text-xl font-bold text-white mb-2">
                                  {confirmModal.type === 'LOAD' && '게임을 불러오시겠습니까?'}
                                  {confirmModal.type === 'DELETE' && '정말 삭제하시겠습니까?'}
                              </h3>
                              <p className="text-gray-400 mb-6 text-sm">
                                  {confirmModal.type === 'LOAD' && '현재 진행 중인 게임 내용은 저장하지 않으면 사라집니다.'}
                                  {confirmModal.type === 'DELETE' && '삭제된 데이터는 복구할 수 없습니다.'}
                              </p>
                              <div className="flex gap-3 justify-center">
                                  <button onClick={() => setConfirmModal(null)} className="px-5 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-bold transition">취소</button>
                                  <button 
                                    onClick={() => {
                                        if (confirmModal.type === 'LOAD' && confirmModal.slotId) executeLoad(confirmModal.slotId);
                                        if (confirmModal.type === 'DELETE' && confirmModal.slotId) executeDelete(confirmModal.slotId);
                                    }} 
                                    className="px-5 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white font-bold transition flex items-center gap-2"
                                  >
                                      <Check size={16}/> 확인
                                  </button>
                              </div>
                          </div>
                      </div>
                  )}

                  <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-slate-900">
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                          {isSaveMode ? <Save size={20} className="text-green-500"/> : <Download size={20} className="text-blue-500"/>}
                          {isSaveMode ? '게임 저장' : '게임 불러오기'}
                      </h3>
                      <button onClick={() => setShowSaveModal(false)}><X size={24} className="text-gray-400 hover:text-white"/></button>
                  </div>
                  <div className="p-4 space-y-3">
                      {saveSlots.map((slot) => (
                          <div key={slot.id} 
                               onClick={() => {
                                 if (isSaveMode) handleSave(slot.id);
                                 else if (slot.data) handleLoadRequest(slot.id);
                               }}
                               className={`group p-4 rounded-xl border transition cursor-pointer relative flex flex-col gap-1 
                                 ${slot.data ? 'bg-slate-750 border-slate-600 hover:bg-slate-700' : 'bg-slate-800/50 border-slate-700 border-dashed hover:bg-slate-700/50'}
                                 ${!slot.data && !isSaveMode ? 'opacity-50 cursor-not-allowed' : ''}
                               `}
                          >
                              <div className="flex justify-between items-center">
                                  <span className={`font-bold text-lg ${slot.data ? 'text-green-400' : 'text-gray-600'}`}>SLOT {slot.id}</span>
                                  {slot.data && (
                                      <button onClick={(e) => handleDeleteRequest(slot.id, e)} className="p-2 bg-slate-800 rounded-full hover:bg-red-900/50 text-gray-500 hover:text-red-400 transition z-10">
                                          <Trash2 size={16}/>
                                      </button>
                                  )}
                              </div>
                              {slot.data ? (
                                  <>
                                      <div className="text-white font-medium flex items-center gap-2">
                                        {slot.data.playerForm?.name || 'Unknown'} 
                                        <span className="text-xs px-1.5 py-0.5 bg-slate-800 rounded text-gray-400">{slot.data.playerForm?.team || '-'}</span>
                                      </div>
                                      <div className="text-xs text-gray-400">{slot.data.savedAt}</div>
                                      <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                                        <span>{slot.data.selectedRoute === 'HIGHSCHOOL_2024' ? '고교 육성' : '프로 데뷔'}</span>
                                        <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                                        <span>{slot.data.difficulty}</span>
                                      </div>
                                  </>
                              ) : (
                                  <div className="text-gray-500 py-4 text-center flex flex-col items-center gap-1">
                                    <span>비어 있음</span>
                                    {isSaveMode && <span className="text-xs text-green-600 font-bold opacity-0 group-hover:opacity-100 transition">클릭하여 저장</span>}
                                  </div>
                              )}
                          </div>
                      ))}
                  </div>
              </div>
          </div>
      );
  }

  // --- CONFIRM EXIT MODAL ---
  const renderExitModal = () => {
    if (confirmModal && confirmModal.type === 'EXIT') {
        return (
            <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                <div className="bg-slate-800 border border-slate-600 p-8 rounded-2xl shadow-2xl max-w-sm w-full text-center">
                    <AlertTriangle size={48} className="text-red-500 mx-auto mb-6"/>
                    <h3 className="text-2xl font-bold text-white mb-2">게임 종료</h3>
                    <p className="text-gray-400 mb-8">
                        저장하지 않은 진행 상황은 모두 사라집니다.<br/>정말 메인 화면으로 돌아가시겠습니까?
                    </p>
                    <div className="flex gap-4 justify-center">
                        <button onClick={() => setConfirmModal(null)} className="px-6 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold transition">취소</button>
                        <button onClick={executeExit} className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold transition flex items-center gap-2">
                            <Power size={18}/> 종료하기
                        </button>
                    </div>
                </div>
            </div>
        )
    }
    return null;
  };

  // --- RENDERING VIEWS ---

  if (gameStage === 'API_KEY_INPUT') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-6">
        <div className="bg-slate-800 p-8 rounded-2xl w-full max-w-md shadow-2xl border border-slate-700 text-center">
            <div className="flex justify-center mb-6">
                <div className="bg-green-600 p-4 rounded-full shadow-lg">
                    <Key size={32} className="text-white" />
                </div>
            </div>
            <h2 className="text-2xl font-bold mb-4 text-white">API Key 입력</h2>
            <p className="text-gray-400 mb-6 text-sm">
                게임을 시작하려면 Google Gemini API Key가 필요합니다.<br/>
                <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-green-400 underline hover:text-green-300 flex items-center justify-center gap-1 mt-2">
                    <ExternalLink size={12}/> API Key 발급받기
                </a>
            </p>
            <input 
                type="password" 
                value={userApiKey} 
                onChange={(e) => setUserApiKey(e.target.value)} 
                placeholder="Google AI Studio API Key" 
                className="w-full bg-slate-950 border border-slate-600 rounded-lg p-3 text-white mb-4 focus:border-green-500 outline-none font-mono text-sm"
            />
            <button onClick={handleApiKeySubmit} className="w-full py-3 bg-green-600 hover:bg-green-500 rounded-lg font-bold text-white transition flex items-center justify-center gap-2">
                확인 및 시작 <ArrowRight size={18}/>
            </button>
        </div>
      </div>
    );
  }

  if (gameStage === 'START') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white bg-[url('https://images.unsplash.com/photo-1516731537543-b4aa4eb6a3da?q=80&w=2541&auto=format&fit=crop')] bg-cover bg-center bg-blend-multiply py-10 overflow-y-auto">
        {showSaveModal && showSaveModal} 
        
        <div className="bg-black/70 p-12 rounded-2xl backdrop-blur-sm border border-slate-700 text-center shadow-2xl max-w-lg w-full mx-4 relative">
          <h1 className="text-5xl font-extrabold mb-2 text-green-400 font-mono tracking-tighter drop-shadow-lg">BASEBALL LIFE</h1>
          <p className="text-2xl text-gray-200 mb-8 font-extrabold tracking-wide drop-shadow-md">나만의 야구 선수 키우기 v2.0</p>
          
          <div className="space-y-4 flex flex-col w-full max-w-xs mx-auto">
            <button onClick={handleInitialStart} className="px-6 py-4 bg-green-600 hover:bg-green-500 text-white rounded-lg font-bold transition flex items-center justify-center gap-3 shadow-lg hover:translate-y-[-2px]">
              <Power size={20} /> 새로 시작하기
            </button>
            <button onClick={() => { setIsSaveMode(false); setShowSaveModal(true); refreshSaveSlots(); }} className="px-6 py-4 bg-slate-700 hover:bg-slate-600 text-gray-200 rounded-lg font-bold transition flex items-center justify-center gap-3 shadow-lg hover:translate-y-[-2px]">
              <Disc size={20} /> 이어하기
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-700 flex flex-col items-center gap-2">
             <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition">
                 <Key size={12}/> API Key 발급 / 재설정
             </a>
             <div className="text-[10px] text-gray-600 font-mono">2026 Season Real Roster Updated | Powered by Gemini 2.5</div>
          </div>
        </div>
      </div>
    );
  }

  if (gameStage === 'ROUTE_SELECT') {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-4 py-10 overflow-y-auto">
          <h2 className="text-3xl font-bold mb-6 text-green-400 text-center">커리어 시작 시점</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl w-full">
            <button onClick={() => handleRouteSelect('HIGHSCHOOL_2024')} className="bg-slate-800 hover:bg-slate-700 border-2 border-slate-700 hover:border-green-500 rounded-xl p-6 text-left transition-all h-[250px] flex flex-col">
              <div className="flex justify-between mb-4"><School size={32} className="text-green-500"/><span className="bg-slate-900 px-2 py-1 rounded text-xs text-gray-400">3년 육성</span></div>
              <h3 className="text-xl font-bold text-white">2024 고교 1학년</h3>
              <p className="text-gray-400 text-sm mt-2">전국대회 우승과 청소년 대표팀을 목표로 성장합니다.</p>
            </button>
            <button onClick={() => handleRouteSelect('PRO_2026')} className="bg-slate-800 hover:bg-slate-700 border-2 border-slate-700 hover:border-blue-500 rounded-xl p-6 text-left transition-all h-[250px] flex flex-col">
               <div className="flex justify-between mb-4"><Briefcase size={32} className="text-blue-500"/><span className="bg-slate-900 px-2 py-1 rounded text-xs text-gray-400">즉시 전력</span></div>
              <h3 className="text-xl font-bold text-white">2026 KBO 신인</h3>
              <p className="text-gray-400 text-sm mt-2">최신 2026 로스터가 적용된 KBO 리그에서 데뷔합니다.</p>
            </button>
          </div>
          <button onClick={() => setGameStage('START')} className="mt-8 text-gray-500 underline text-sm">뒤로 가기</button>
        </div>
      );
  }

  if (gameStage === 'DIFFICULTY_SELECT') {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-6">
            <h2 className="text-2xl font-bold mb-6 text-green-400">난이도 설정</h2>
            <div className="flex flex-col gap-3 w-full max-w-md">
                {['쉬움', '보통', '어려움', '매우 어려움'].map((d) => (
                    <button key={d} onClick={() => handleDifficultySelect(d as DifficultyType)} className="p-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-left font-bold transition">
                        {d}
                    </button>
                ))}
                {/* Crazy Mode Button */}
                <button onClick={() => handleDifficultySelect('막장')} className="p-4 bg-purple-900/50 hover:bg-purple-800/50 border border-purple-500 rounded-lg text-left font-bold transition flex items-center justify-between group">
                    <span className="text-purple-300 group-hover:text-white">막장 (Crazy/Sandbox)</span>
                    <span className="text-[10px] bg-purple-600 text-white px-2 py-1 rounded">제약 없음</span>
                </button>
                <p className="text-xs text-center text-gray-500 mt-2">* 막장 모드는 현실성을 무시하고 자유로운 플레이(에디터 급 능력치, 황당한 사건)가 가능합니다.</p>
            </div>
            <button onClick={() => setGameStage('ROUTE_SELECT')} className="mt-8 text-gray-500 underline text-sm">뒤로 가기</button>
        </div>
    );
  }

  if (gameStage === 'PLAYER_FORM') {
      return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-6 py-10 overflow-y-auto">
              <div className="bg-slate-800 p-8 rounded-2xl w-full max-w-lg shadow-2xl border border-slate-700">
                  <h2 className="text-2xl font-bold mb-6 text-center text-green-400 flex items-center justify-center gap-2">
                      <User size={28}/> 선수 정보 생성
                  </h2>
                  <div className="space-y-4">
                      <div>
                          <label className="block text-sm font-bold text-gray-400 mb-1">이름</label>
                          <input type="text" value={playerForm.name} onChange={(e) => setPlayerForm({...playerForm, name: e.target.value})} className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:border-green-500 outline-none" placeholder="선수 이름"/>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                          <div>
                              <label className="block text-sm font-bold text-gray-400 mb-1">포지션</label>
                              <select value={playerForm.position} onChange={(e) => setPlayerForm({...playerForm, position: e.target.value})} className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white outline-none">
                                  <option>투수</option><option>포수</option><option>1루수</option><option>2루수</option><option>3루수</option><option>유격수</option><option>좌익수</option><option>중견수</option><option>우익수</option><option>투타겸업</option>
                              </select>
                          </div>
                          <div>
                              <label className="block text-sm font-bold text-gray-400 mb-1">유형</label>
                              <select value={playerForm.role} onChange={(e) => setPlayerForm({...playerForm, role: e.target.value})} className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white outline-none">
                                  <option>우투우타</option><option>우투좌타</option><option>좌투좌타</option><option>좌투우타</option>
                              </select>
                          </div>
                      </div>
                      <div>
                          <label className="block text-sm font-bold text-gray-400 mb-1">소속/선호 구단</label>
                          <select value={playerForm.team} onChange={(e) => setPlayerForm({...playerForm, team: e.target.value})} className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white outline-none">
                            <option value="랜덤">랜덤 (Random)</option>
                            <option>삼성 라이온즈</option><option>KIA 타이거즈</option><option>LG 트윈스</option><option>두산 베어스</option><option>KT 위즈</option><option>SSG 랜더스</option><option>롯데 자이언츠</option><option>한화 이글스</option><option>NC 다이노스</option><option>키움 히어로즈</option>
                          </select>
                      </div>
                      {selectedRoute === 'HIGHSCHOOL_2024' && (
                          <div>
                              <label className="block text-sm font-bold text-gray-400 mb-1">고교</label>
                              <select value={playerForm.school} onChange={(e) => setPlayerForm({...playerForm, school: e.target.value})} className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white outline-none">
                                {HIGH_SCHOOLS.map(s => <option key={s} value={s}>{s}</option>)}
                              </select>
                          </div>
                      )}
                      <div>
                          <label className="block text-sm font-bold text-gray-400 mb-1">플레이 스타일</label>
                          <input type="text" value={playerForm.style} onChange={(e) => setPlayerForm({...playerForm, style: e.target.value})} placeholder="예: 강속구형, 컨택형" className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white outline-none"/>
                      </div>
                  </div>
                  <div className="flex gap-2 mt-8">
                     <button onClick={() => setGameStage('DIFFICULTY_SELECT')} className="px-4 py-4 bg-slate-700 hover:bg-slate-600 rounded-xl font-bold text-gray-300 transition">이전</button>
                     <button onClick={handleGameLaunch} className="flex-1 py-4 bg-green-600 hover:bg-green-500 rounded-xl font-bold text-lg transition shadow-lg flex items-center justify-center gap-2">게임 시작 <ArrowRight/></button>
                  </div>
              </div>
          </div>
      )
  }

  // --- GAME DASHBOARD UI ---

  return (
    <div className="flex h-[100dvh] bg-[#0f172a] text-gray-100 font-sans overflow-hidden">
      {/* Global Modals */}
      {renderExitModal()}
      
      {/* LEFT SIDEBAR */}
      <div className="hidden md:flex w-80 bg-slate-900 border-r border-slate-800 flex-col shadow-xl z-10 shrink-0">
        <div className="p-6 border-b border-slate-800 flex flex-col items-center bg-slate-800/50">
          <div className="w-24 h-24 bg-slate-700 rounded-full mb-4 flex items-center justify-center border-4 border-slate-800 shadow-inner relative overflow-hidden group">
            <User size={40} className="text-slate-400 group-hover:scale-110 transition" />
            <div className="absolute inset-0 border-2 border-green-500/30 rounded-full"></div>
          </div>
          <h2 className="text-xl font-bold text-white text-center">{dashboardData?.status.name || playerForm.name}</h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs px-2 py-0.5 bg-green-900 text-green-300 rounded font-mono border border-green-800">{dashboardData?.status.position}</span>
            <span className="text-xs text-gray-400">{dashboardData?.status.team}</span>
          </div>
        </div>
        <div className="p-5 flex-1 overflow-y-auto custom-scrollbar">
          <div className="space-y-4">
            <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50 space-y-1">
               <StatRow label="나이" value={dashboardData?.status.age} icon={<Calendar size={14} />} />
               <StatRow label="컨디션" value={dashboardData?.status.condition} icon={<Activity size={14} />} />
               <StatRow label="자산" value={dashboardData?.status.money} icon={<Trophy size={14} />} />
               {/* Enhanced Realism Fields */}
               {dashboardData?.status.team_chemistry && <StatRow label="팀 케미" value={dashboardData.status.team_chemistry} icon={<Users2 size={14} />} />}
               {dashboardData?.status.sponsor && <StatRow label="스폰서" value={dashboardData.status.sponsor} icon={<Briefcase size={14} />} />}
            </div>
            <div className="flex items-center justify-between bg-gradient-to-r from-slate-800 to-slate-900 p-3 rounded-lg border border-slate-700">
                <span className="text-sm text-gray-400">종합 OVR</span>
                <span className="text-xl font-bold text-green-400 font-mono">{dashboardData?.status.ovr}</span>
            </div>
            
            {/* Core Stats */}
            <div className="mt-6">
              <h3 className="text-xs font-bold text-slate-500 uppercase mb-3 flex items-center gap-2"><TrendingUp size={12} /> 시즌 요약</h3>
              <div className="grid grid-cols-2 gap-2">
                {(posType === 'BATTER') && (
                  <>
                    <BoxStat label="AVG" value={dashboardData?.advanced_stats.avg} />
                    <BoxStat label="HR" value={dashboardData?.advanced_stats.hr} />
                    <BoxStat label="OPS" value={dashboardData?.advanced_stats.ops} />
                    <BoxStat label="WAR" value={dashboardData?.advanced_stats.war_bat} />
                  </>
                )}
                {(posType === 'PITCHER') && (
                  <>
                    <BoxStat label="ERA" value={dashboardData?.advanced_stats.era} />
                    <BoxStat label="WIN" value={dashboardData?.advanced_stats.w} />
                    <BoxStat label="SO" value={dashboardData?.advanced_stats.so} />
                    <BoxStat label="WHIP" value={dashboardData?.advanced_stats.whip} />
                  </>
                )}
                {(posType === 'TWOWAY') && (
                  <>
                    <BoxStat label="AVG" value={dashboardData?.advanced_stats.avg} />
                    <BoxStat label="ERA" value={dashboardData?.advanced_stats.era} />
                    <BoxStat label="HR" value={dashboardData?.advanced_stats.hr} />
                    <BoxStat label="WIN" value={dashboardData?.advanced_stats.w} />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 bg-slate-950 border-t border-slate-800 grid grid-cols-2 gap-2">
            <button onClick={() => { setIsSaveMode(true); setShowSaveModal(true); refreshSaveSlots(); }} className="flex items-center justify-center gap-2 py-2 bg-blue-900/30 hover:bg-blue-900/50 rounded text-xs text-blue-300 border border-blue-900/30"><Save size={14} /> 저장</button>
            <button onClick={handleExitRequest} className="flex items-center justify-center gap-2 py-2 bg-red-900/30 hover:bg-red-900/50 rounded text-xs text-red-300 border border-red-900/30"><Power size={14} /> 종료</button>
        </div>
      </div>

      {/* CENTER: Main Game Area */}
      <div className="flex-1 flex flex-col relative bg-slate-925 w-full">
        {/* Top Bar */}
        <div className="h-14 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 md:px-6 shadow-sm shrink-0">
          <div className="font-mono text-green-500 font-bold text-sm md:text-lg flex items-center gap-2">
            <Calendar size={16} /> {dashboardData?.date}
          </div>
          <div className="hidden md:flex items-center gap-1 bg-slate-800 rounded-lg p-1 border border-slate-700">
            <NavTab label="중계석" icon={<MessageSquare size={14}/>} active={currentView === 'CHAT'} onClick={() => setCurrentView('CHAT')} />
            <NavTab label="능력치" icon={<User size={14}/>} active={currentView === 'STATS'} onClick={() => setCurrentView('STATS')} />
            <NavTab label="기록실" icon={<BarChart2 size={14}/>} active={currentView === 'RECORDS'} onClick={() => setCurrentView('RECORDS')} />
            <NavTab label="팀/리그" icon={<Globe size={14}/>} active={currentView === 'LEAGUE'} onClick={() => setCurrentView('LEAGUE')} />
            <NavTab label="연애" icon={<Heart size={14}/>} active={currentView === 'LOVE'} onClick={() => setCurrentView('LOVE')} />
          </div>
          <div className="flex items-center gap-3">
             <div className="md:hidden text-xs text-gray-400 mr-2">{dashboardData?.status.name}</div>
             <button onClick={() => { setShowPhone(!showPhone); setPhoneApp('HOME'); }} className={`p-2 rounded-full transition relative ${showPhone ? 'bg-green-600 text-white' : 'bg-slate-800 text-gray-400 hover:bg-slate-700'}`}>
              <Smartphone size={20} />
              {dashboardData?.messages && dashboardData.messages.length > 0 && <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-slate-900"></span>}
            </button>
          </div>
        </div>

        <div className="md:hidden flex items-center justify-around border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm p-2 overflow-x-auto">
            <NavIcon icon={<MessageSquare size={20}/>} active={currentView === 'CHAT'} onClick={() => setCurrentView('CHAT')} />
            <NavIcon icon={<User size={20}/>} active={currentView === 'STATS'} onClick={() => setCurrentView('STATS')} />
            <NavIcon icon={<BarChart2 size={20}/>} active={currentView === 'RECORDS'} onClick={() => setCurrentView('RECORDS')} />
            <NavIcon icon={<Globe size={20}/>} active={currentView === 'LEAGUE'} onClick={() => setCurrentView('LEAGUE')} />
            <NavIcon icon={<Heart size={20}/>} active={currentView === 'LOVE'} onClick={() => setCurrentView('LOVE')} />
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 game-scroll bg-[#0b1120] relative">
          
          {/* VIEW: CHAT */}
          {currentView === 'CHAT' && (
            <>
              {chatHistory.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-slate-600 animate-pulse">
                  <Trophy size={48} className="mb-4 opacity-20"/>
                  <p>시뮬레이션을 시작하는 중...</p>
                </div>
              )}
              {chatHistory.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                  <div className={`max-w-[95%] md:max-w-[85%] rounded-2xl p-4 md:p-5 shadow-lg ${msg.role === 'user' ? 'bg-green-700 text-white rounded-tr-none' : 'bg-slate-800 border border-slate-700 text-gray-200 markdown-body rounded-tl-none'}`}>
                    <div className="whitespace-pre-wrap leading-relaxed"><FormattedText text={msg.text} /></div>
                  </div>
                </div>
              ))}
              {isLoading && <div className="flex justify-start"><div className="bg-slate-800 rounded-lg p-4 flex gap-2 items-center border border-slate-700"><span className="text-xs text-gray-400 mr-2">GM 연산 중...</span><div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce"></div><div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce delay-75"></div><div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce delay-150"></div></div></div>}
              <div ref={chatEndRef} />
            </>
          )}

          {/* VIEW: STATS */}
          {currentView === 'STATS' && (
             <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl">
                    <h3 className="text-xl font-bold text-green-400 mb-6 flex items-center gap-2"><Radar size={24}/> 상세 능력치</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Batter Skills */}
                        {(posType === 'BATTER' || posType === 'TWOWAY') && (
                          <div className="space-y-4">
                            <h4 className="text-sm text-gray-400 font-bold border-b border-slate-600 pb-2 flex items-center gap-2"><Target size={14}/> 타격/수비</h4>
                            <AbilityBar label="컨택" value={dashboardData?.abilities.contact} color="bg-blue-500" />
                            <AbilityBar label="파워" value={dashboardData?.abilities.power} color="bg-red-500" />
                            <AbilityBar label="선구안" value={dashboardData?.abilities.eye} color="bg-yellow-500" />
                            <AbilityBar label="주력" value={dashboardData?.abilities.speed || dashboardData?.abilities.run} color="bg-green-500" />
                            <AbilityBar label="수비" value={dashboardData?.abilities.defense} color="bg-purple-500" />
                          </div>
                        )}
                        {/* Pitcher Skills */}
                        {(posType === 'PITCHER' || posType === 'TWOWAY') && (
                          <div className="space-y-4">
                            <h4 className="text-sm text-gray-400 font-bold border-b border-slate-600 pb-2 flex items-center gap-2"><Zap size={14}/> 투구</h4>
                            <div className="flex justify-between items-center py-2 border-b border-slate-700/50"><span className="text-sm text-gray-300">구속</span><span className="text-lg font-mono font-bold text-white">{dashboardData?.abilities.velocity}</span></div>
                            <AbilityBar label="제구" value={dashboardData?.abilities.control} color="bg-cyan-500" />
                            <AbilityBar label="구위" value={dashboardData?.abilities.stuff} color="bg-teal-500" />
                            <div className="py-2"><div className="text-xs text-gray-500 mb-1">구종</div><div className="text-sm font-bold text-white">{dashboardData?.abilities.breaking}</div></div>
                          </div>
                        )}
                        <div className="space-y-4">
                            <h4 className="text-sm text-gray-400 font-bold border-b border-slate-600 pb-2 flex items-center gap-2"><Activity size={14}/> 공통/멘탈</h4>
                            <AbilityBar label="BQ" value={dashboardData?.abilities.bq} color="bg-indigo-500" />
                            <AbilityBar label="체력" value={dashboardData?.abilities.stamina} color="bg-orange-500" />
                            <div className="pt-4 mt-4 bg-slate-900/50 rounded-lg p-4 grid grid-cols-2 gap-4 text-center">
                                <div><div className="text-xs text-gray-500 mb-1">잠재력</div><div className="text-sm font-bold text-yellow-400">{dashboardData?.abilities.potential}</div></div>
                                <div><div className="text-xs text-gray-500 mb-1">멘탈</div><div className="text-sm font-bold text-blue-400">{dashboardData?.abilities.mental}</div></div>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
          )}

          {/* VIEW: LEAGUE & TEAM INFO (Consolidated) */}
          {currentView === 'LEAGUE' && (
            <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
               {/* Team Roster Section */}
               <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                      <Users2 size={24} className="text-blue-400"/> {dashboardData?.status.team} 로스터
                  </h3>
                  {dashboardData?.team_roster ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-slate-900/50 p-4 rounded-xl">
                              <h4 className="text-green-400 font-bold mb-3 border-b border-slate-700 pb-2">투수진 (Pitchers)</h4>
                              <ul className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
                                  {dashboardData.team_roster.pitchers.map((p, i) => (
                                      <li key={i} className="text-sm text-gray-300 flex items-center gap-2">
                                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div> {p}
                                      </li>
                                  ))}
                              </ul>
                          </div>
                          <div className="bg-slate-900/50 p-4 rounded-xl">
                              <h4 className="text-blue-400 font-bold mb-3 border-b border-slate-700 pb-2">야수진 (Batters)</h4>
                              <ul className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
                                  {dashboardData.team_roster.batters.map((p, i) => (
                                      <li key={i} className="text-sm text-gray-300 flex items-center gap-2">
                                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div> {p}
                                      </li>
                                  ))}
                              </ul>
                          </div>
                      </div>
                  ) : (
                      <div className="text-center py-4 text-gray-400 text-sm">로스터 정보를 불러오려면 GM에게 요청하세요.</div>
                  )}
               </div>

               {/* Standings & Leaderboards */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Globe size={18} className="text-green-400"/> 순위표</h3>
                    <table className="w-full text-sm text-left text-gray-300">
                        <thead className="text-xs text-gray-500 uppercase bg-slate-900/50">
                          <tr><th className="px-3 py-2">순위</th><th className="px-3 py-2">팀</th><th className="px-3 py-2">승</th><th className="px-3 py-2">패</th><th className="px-3 py-2">차</th></tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700/50">
                          {dashboardData?.league_data?.standings?.map((team, i) => (
                             <tr key={i} className={team.team.includes(dashboardData.status.team) || team.team === playerForm.team ? "bg-green-900/20" : ""}>
                               <td className="px-3 py-2 font-mono font-bold">{team.rank}</td>
                               <td className="px-3 py-2">{team.team}</td>
                               <td className="px-3 py-2 font-mono">{team.w}</td>
                               <td className="px-3 py-2 font-mono">{team.l}</td>
                               <td className="px-3 py-2 font-mono text-gray-400">{team.gb}</td>
                             </tr>
                          ))}
                        </tbody>
                      </table>
                 </div>
                 
                 <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Trophy size={18} className="text-yellow-400"/> 리그 리더보드</h3>
                    <div className="space-y-4">
                       {dashboardData?.league_data?.leaderboards && Object.entries(dashboardData.league_data.leaderboards).map(([key, list]) => (
                         <div key={key} className="bg-slate-900/50 rounded-lg p-3">
                           <div className="text-xs font-bold text-green-400 uppercase mb-2 border-b border-slate-700 pb-1">{key}</div>
                           {list.map((p, idx) => (
                             <div key={idx} className="flex justify-between text-xs py-1">
                               <span className="text-gray-300 w-4 font-mono">{idx+1}</span>
                               <span className={`flex-1 ${p.name.includes(playerForm.name) ? 'text-yellow-300 font-bold' : 'text-gray-400'}`}>{p.name} <span className="text-[10px] text-gray-600">({p.team})</span></span>
                               <span className="font-mono font-bold text-white">{p.val}</span>
                             </div>
                           ))}
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
            </div>
          )}

          {/* VIEW: ROMANCE (NEW) */}
          {currentView === 'LOVE' && (
             <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl">
                    <h3 className="text-xl font-bold text-pink-400 mb-6 flex items-center gap-2"><Heart size={24} className="fill-pink-400"/> 나의 연애/인맥</h3>
                    
                    {/* Partner List */}
                    {dashboardData?.romance?.partners && dashboardData.romance.partners.length > 0 ? (
                        <div className="space-y-4">
                            {dashboardData.romance.partners.map((partner, index) => (
                                <div key={index} className="bg-slate-900 rounded-xl p-4 border border-pink-900/30 flex flex-col gap-3">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-pink-900/50 rounded-full flex items-center justify-center text-pink-300 border border-pink-700">
                                                <User size={24}/>
                                            </div>
                                            <div>
                                                <div className="font-bold text-white text-lg flex items-center gap-2">
                                                    {partner.name} <span className="text-xs bg-pink-900 text-pink-200 px-2 py-0.5 rounded-full">{partner.status}</span>
                                                </div>
                                                <div className="text-xs text-gray-400">{partner.job} ({partner.age}세)</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-slate-800 rounded-full h-2 w-full mt-1 overflow-hidden">
                                        <div className="bg-pink-500 h-full transition-all duration-500" style={{width: `${partner.affection}%`}}></div>
                                    </div>
                                    <div className="text-right text-xs text-pink-400 font-bold mt-[-8px]">호감도 {partner.affection}%</div>
                                    <div className="text-sm text-gray-300 italic">"{partner.desc}"</div>
                                    
                                    <div className="grid grid-cols-2 gap-2 mt-2">
                                        <button onClick={() => { setCurrentView('CHAT'); sendMessage(`${partner.name}에게 데이트 신청해줘.`); }} className="py-2 bg-pink-600 hover:bg-pink-500 rounded-lg text-white text-sm font-bold transition flex items-center justify-center gap-1"><Heart size={14}/> 데이트</button>
                                        <button onClick={() => { setCurrentView('CHAT'); sendMessage(`${partner.name}에게 선물 주고 싶어.`); }} className="py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-gray-200 text-sm font-bold transition flex items-center justify-center gap-1"><Gift size={14}/> 선물</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10 bg-slate-900/50 rounded-xl border border-slate-700/50 border-dashed">
                            <p className="text-gray-400 mb-4">현재 만나는 사람이 없습니다.</p>
                            <p className="text-sm text-gray-500 mb-6">새로운 인연을 찾아보세요.</p>
                            <div className="flex justify-center gap-3">
                                <button onClick={() => { setCurrentView('CHAT'); sendMessage("소개팅 주선해달라고 친구에게 연락해줘."); }} className="px-5 py-2 bg-pink-700 hover:bg-pink-600 rounded-lg text-white font-bold text-sm transition shadow-lg">소개팅 요청</button>
                                <button onClick={() => { setCurrentView('CHAT'); sendMessage("쉬는 날 핫플레이스나 클럽에 놀러가고 싶어."); }} className="px-5 py-2 bg-purple-700 hover:bg-purple-600 rounded-lg text-white font-bold text-sm transition shadow-lg">놀러 가기</button>
                            </div>
                        </div>
                    )}
                </div>
             </div>
          )}

          {/* VIEW: RECORDS */}
          {currentView === 'RECORDS' && (
            <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="flex gap-2 bg-slate-800 p-1 rounded-lg w-fit border border-slate-700">
                  {['SEASON', 'YEARLY', 'CAREER'].map((tab) => (
                    <button 
                      key={tab}
                      onClick={() => setRecordTab(tab as any)}
                      className={`px-4 py-2 text-xs font-bold rounded-md transition ${recordTab === tab ? 'bg-green-600 text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-slate-700'}`}
                    >
                      {tab}
                    </button>
                  ))}
               </div>

               <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl min-h-[400px]">
                   {recordTab === 'SEASON' && (
                     <>
                        <h3 className="text-xl font-bold text-green-400 mb-6 flex items-center gap-2"><BarChart2 size={24}/> 현재 시즌 상세 기록</h3>
                        <div className="overflow-x-auto"><RecordTable data={dashboardData?.advanced_stats} posType={posType} /></div>
                     </>
                   )}
                   {recordTab === 'YEARLY' && (
                     <>
                        <h3 className="text-xl font-bold text-green-400 mb-6 flex items-center gap-2"><List size={24}/> 연도별 기록</h3>
                        <div className="overflow-x-auto pb-4">
                          <table className="w-full text-sm text-left text-gray-300 min-w-[800px]">
                             <thead className="text-xs text-gray-400 uppercase bg-slate-700/50">
                               <tr>
                                 <th className="px-3 py-3 sticky left-0 bg-slate-800 shadow-sm z-10">Year</th>
                                 <th className="px-3 py-3 sticky left-16 bg-slate-800 shadow-sm z-10">Team</th>
                                 {posType !== 'PITCHER' && <><th className="px-3 py-3 text-green-400">AVG</th><th className="px-3 py-3">HR</th><th className="px-3 py-3">RBI</th><th className="px-3 py-3 text-yellow-400">OPS</th><th className="px-3 py-3 text-blue-400">WAR</th></>}
                                 {posType !== 'BATTER' && <><th className="px-3 py-3 text-green-400">ERA</th><th className="px-3 py-3">W</th><th className="px-3 py-3">SO</th><th className="px-3 py-3 text-yellow-400">WHIP</th><th className="px-3 py-3 text-blue-400">WAR</th></>}
                                 <th className="px-4 py-3">Note</th>
                               </tr>
                             </thead>
                             <tbody className="divide-y divide-slate-700">
                               {dashboardData?.yearly_records?.map((rec, i) => (
                                 <tr key={i} className="hover:bg-slate-700/30">
                                   <td className="px-3 py-3 font-mono sticky left-0 bg-slate-800">{rec.year}</td>
                                   <td className="px-3 py-3 sticky left-16 bg-slate-800">{rec.team}</td>
                                   {posType !== 'PITCHER' && <><td className="px-3 py-3 font-mono font-bold text-white">{rec.avg}</td><td className="px-3 py-3 font-mono">{rec.hr}</td><td className="px-3 py-3 font-mono">{rec.rbi}</td><td className="px-3 py-3 font-mono text-yellow-200">{rec.ops}</td><td className="px-3 py-3 font-mono font-bold text-blue-300">{rec.war || rec.war_bat}</td></>}
                                   {posType !== 'BATTER' && <><td className="px-3 py-3 font-mono font-bold text-white">{rec.era}</td><td className="px-3 py-3 font-mono">{rec.w}</td><td className="px-3 py-3 font-mono">{rec.so}</td><td className="px-3 py-3 font-mono text-yellow-200">{rec.whip}</td><td className="px-3 py-3 font-mono font-bold text-blue-300">{rec.war || rec.war_pit}</td></>}
                                   <td className="px-4 py-3 text-xs text-gray-500">{rec.note}</td>
                                 </tr>
                               ))}
                             </tbody>
                          </table>
                        </div>
                     </>
                   )}
                   {recordTab === 'CAREER' && (
                     <>
                        <h3 className="text-xl font-bold text-green-400 mb-6 flex items-center gap-2"><Trophy size={24}/> 통산 기록</h3>
                         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <CareerBox label="경기 수 (G)" value={dashboardData?.career_stats.g} />
                            {(posType === 'BATTER' || posType === 'TWOWAY') && (
                              <>
                                <CareerBox label="타율 (AVG)" value={dashboardData?.career_stats.avg} />
                                <CareerBox label="홈런 (HR)" value={dashboardData?.career_stats.hr} />
                                <CareerBox label="타점 (RBI)" value={dashboardData?.career_stats.rbi} />
                                <CareerBox label="WAR" value={dashboardData?.career_stats.war || dashboardData?.career_stats.war_bat} color="text-blue-400" />
                              </>
                            )}
                            {(posType === 'PITCHER' || posType === 'TWOWAY') && (
                              <>
                                <CareerBox label="ERA" value={dashboardData?.career_stats.era} />
                                <CareerBox label="승리 (W)" value={dashboardData?.career_stats.w} />
                                <CareerBox label="탈삼진 (SO)" value={dashboardData?.career_stats.so || dashboardData?.career_stats.k} />
                                <CareerBox label="WAR" value={dashboardData?.career_stats.war || dashboardData?.career_stats.war_pit} color="text-blue-400" />
                              </>
                            )}
                         </div>
                     </>
                   )}
               </div>
            </div>
          )}

        </div>

        {currentView === 'CHAT' && (
          <div className="p-4 bg-slate-900 border-t border-slate-800 shrink-0 z-10">
            <div className="flex gap-2 max-w-4xl mx-auto">
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)} placeholder={isLoading ? "GM이 생각 중입니다..." : "행동 입력 (숫자 선택 또는 자유 입력)"} disabled={isLoading} className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 transition disabled:opacity-50"/>
              <button onClick={() => sendMessage(input)} disabled={isLoading} className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-lg font-bold transition disabled:opacity-50 flex items-center gap-2 shadow-lg"><Send size={18} /><span className="hidden md:inline">전송</span></button>
            </div>
          </div>
        )}
      </div>

      {/* RIGHT PANEL: SMARTPHONE OVERLAY */}
      {showPhone && (
        <div className="absolute right-4 bottom-24 w-80 h-[600px] bg-black rounded-[3rem] border-4 border-gray-800 shadow-2xl flex flex-col overflow-hidden z-20 animate-in slide-in-from-bottom-10 fade-in duration-300 ring-4 ring-black/50">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-30 flex justify-center items-end pb-1"><div className="w-16 h-1 bg-gray-800 rounded-full"></div></div>
          <div className="h-8 bg-slate-950 text-white flex justify-between px-6 items-center text-[10px] pt-2"><span>12:40</span><div className="flex gap-1"><span>5G</span><span>100%</span></div></div>
          
          <div className="flex-1 bg-slate-900 overflow-y-auto custom-scrollbar relative">
             {/* HOME SCREEN */}
             {phoneApp === 'HOME' && (
               <div className="p-6 pt-12 grid grid-cols-4 gap-4">
                  <PhoneAppIcon icon={<MessageSquare size={24}/>} color="bg-green-500" name="문자" onClick={() => setPhoneApp('MSG')} badge={dashboardData?.messages?.length} />
                  <PhoneAppIcon icon={<Users size={24}/>} color="bg-blue-500" name="커뮤니티" onClick={() => setPhoneApp('SNS')} badge={dashboardData?.sns_feed?.filter(f=>f.type!=='NEWS').length} />
                  <PhoneAppIcon icon={<Newspaper size={24}/>} color="bg-red-500" name="뉴스" onClick={() => setPhoneApp('SNS')} />
                  <div className="col-span-4 mt-8">
                     <div className="bg-slate-800/50 rounded-2xl p-4 backdrop-blur-sm border border-slate-700/50">
                        <div className="text-4xl font-thin text-white text-center mb-1">{new Date().getHours()}:00</div>
                        <div className="text-xs text-gray-400 text-center">{dashboardData?.date}</div>
                     </div>
                  </div>
               </div>
             )}

             {/* MESSAGES APP */}
             {phoneApp === 'MSG' && (
               <div className="min-h-full bg-slate-950">
                 <PhoneHeader title="메시지" onBack={() => setPhoneApp('HOME')} />
                 <div className="p-2 space-y-2">
                    {dashboardData?.messages?.map((msg, i) => (
                      <div key={i} className="bg-slate-800 p-3 rounded-xl border border-slate-700 text-sm">
                        <div className="font-bold text-white mb-1 text-xs">{msg.from}</div>
                        <p className="text-slate-300 text-xs">{msg.content}</p>
                      </div>
                    ))}
                    {(!dashboardData?.messages || dashboardData.messages.length === 0) && <div className="text-center text-gray-600 text-xs py-10">메시지가 없습니다.</div>}
                 </div>
               </div>
             )}

             {/* SNS/COMMUNITY APP */}
             {phoneApp === 'SNS' && (
               <div className="min-h-full bg-slate-100">
                  <PhoneHeader title="Baseball Talk" onBack={() => setPhoneApp('HOME')} light />
                  <div className="divide-y divide-gray-200">
                     {dashboardData?.sns_feed?.map((post, i) => (
                       <div key={i} className={`p-3 ${post.type === 'NEWS' ? 'bg-white' : 'bg-white'}`}>
                          <div className="flex items-center gap-2 mb-1">
                             {post.type === 'NEWS' && <span className="bg-red-500 text-white text-[9px] px-1 rounded font-bold">NEWS</span>}
                             {post.type === 'COMMUNITY' && <span className="bg-blue-500 text-white text-[9px] px-1 rounded font-bold">포럼</span>}
                             <span className="font-bold text-black text-xs">{post.user}</span>
                          </div>
                          <p className="text-gray-800 text-xs leading-relaxed mb-2 font-medium">{post.content}</p>
                          <div className="flex gap-3 text-[10px] text-gray-500 font-bold">
                             <span>👍 {post.likes}</span>
                          </div>
                       </div>
                     ))}
                     {(!dashboardData?.sns_feed || dashboardData.sns_feed.length === 0) && <div className="text-center text-gray-400 text-xs py-10">게시글이 없습니다.</div>}
                  </div>
               </div>
             )}
          </div>
          <div className="h-6 bg-slate-950 flex justify-center items-center pb-2 cursor-pointer hover:bg-slate-900 transition" onClick={() => setShowPhone(false)}>
            <div className="w-24 h-1 bg-gray-600 rounded-full"></div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- HELPER COMPONENTS ---

const NavTab = ({ label, icon, active, onClick }: any) => (
  <button onClick={onClick} className={`px-3 py-1.5 text-xs font-bold rounded-md transition flex items-center gap-2 ${active ? 'bg-slate-700 text-green-400 shadow-sm' : 'text-gray-400 hover:text-white'}`}>
    {icon} <span className="hidden xl:inline">{label}</span>
  </button>
);
const NavIcon = ({ icon, active, onClick }: any) => (
  <button onClick={onClick} className={`p-2 ${active ? 'text-green-400' : 'text-gray-500'}`}>{icon}</button>
);

const PhoneAppIcon = ({ icon, color, name, onClick, badge }: any) => (
  <button onClick={onClick} className="flex flex-col items-center gap-1 group relative">
    <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition`}>
      {icon}
    </div>
    <span className="text-[10px] text-gray-300 font-medium">{name}</span>
    {badge > 0 && <span className="absolute top-0 right-2 w-4 h-4 bg-red-500 rounded-full text-[9px] flex items-center justify-center text-white border border-slate-900">{badge}</span>}
  </button>
);

const PhoneHeader = ({ title, onBack, light }: any) => (
  <div className={`h-12 flex items-center px-3 border-b ${light ? 'bg-white border-gray-200 text-black' : 'bg-slate-900 border-slate-800 text-white'}`}>
    <button onClick={onBack} className="p-1 mr-2"><ChevronRight className="rotate-180" size={20}/></button>
    <span className="font-bold">{title}</span>
  </div>
);

const StatRow = ({ label, value, highlight, icon }: any) => (
  <div className="flex justify-between items-center text-sm py-1.5 border-b border-slate-700/30 last:border-0">
    <div className="flex items-center gap-2 text-gray-400 text-xs font-medium uppercase tracking-wider">{icon}<span>{label}</span></div>
    <span className={`font-mono font-medium text-sm ${highlight ? 'text-green-400' : 'text-gray-200'}`}>{value || '-'}</span>
  </div>
);

const BoxStat = ({ label, value }: any) => (
  <div className="bg-slate-800 p-2.5 rounded-lg border border-slate-700 flex flex-col items-center hover:bg-slate-750 transition">
    <span className="text-[10px] text-gray-500 mb-1 uppercase tracking-wide">{label}</span>
    <span className="text-lg font-bold text-white font-mono">{value || '-'}</span>
  </div>
);

const CareerBox = ({ label, value, color }: any) => (
  <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700 text-center">
    <div className="text-xs text-gray-500 mb-1">{label}</div>
    <div className={`text-xl font-bold font-mono ${color || 'text-white'}`}>{value || '-'}</div>
  </div>
);

const AbilityBar = ({ label, value, color }: { label: string, value?: string, color: string }) => {
  let percent = 30; // lower default for realism
  if (value) { const numMatch = value.match(/(\d+)/); if (numMatch) percent = parseInt(numMatch[1], 10); }
  return (
    <div className="group">
      <div className="flex justify-between items-end mb-1"><span className="text-xs font-medium text-gray-300 group-hover:text-white transition">{label}</span><span className="text-sm font-mono font-bold text-white">{value || '-'}</span></div>
      <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-700"><div className={`h-full ${color} transition-all duration-1000 ease-out`} style={{ width: `${percent}%` }}></div></div>
    </div>
  );
};

const RecordTable = ({ data, posType }: { data: AdvancedStats | undefined, posType: string }) => {
  if (!data) return <div className="text-gray-500 p-4">데이터가 없습니다.</div>;
  let keys: string[] = [];
  if (posType === 'PITCHER') {
    keys = ['era', 'w', 'l', 'sv', 'so', 'whip', 'fip', 'k_9', 'bb_9', 'era_plus', 'war_pit'];
  } else if (posType === 'BATTER') {
    keys = ['avg', 'hr', 'rbi', 'sb', 'ops', 'woba', 'wrc_plus', 'iso', 'babip', 'war_bat'];
  } else {
    keys = ['avg', 'hr', 'ops', 'wrc_plus', 'war_bat', 'era', 'w', 'so', 'fip', 'war_pit'];
  }
  return (
    <table className="w-full text-sm text-left text-gray-300">
       <thead className="text-xs text-gray-400 uppercase bg-slate-700/50"><tr><th className="px-4 py-3">Stat</th><th className="px-4 py-3">Value</th></tr></thead>
       <tbody className="divide-y divide-slate-700">
         {keys.map((k) => (
           <tr key={k} className="hover:bg-slate-700/30">
             <td className="px-4 py-3 font-bold text-slate-400 uppercase">{k.replace('_', ' ')}</td>
             <td className="px-4 py-3 font-mono font-bold text-white">{data[k] || '-'}</td>
           </tr>
         ))}
       </tbody>
    </table>
  );
};

const FormattedText = ({ text }: { text: string }) => {
    const lines = text.split('\n');
    return (
      <>
        {lines.map((line, i) => {
          if (line.startsWith('### ')) return <h3 key={i} className="text-lg font-bold text-green-400 mt-4 mb-2">{line.replace('### ', '')}</h3>;
          if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-bold text-white mt-6 mb-3 border-b border-slate-600 pb-1">{line.replace('## ', '')}</h2>;
          
          if (line.includes('|') || line.match(/^\s*(순위|이름|팀|AVG|ERA)/)) {
            return <div key={i} className="font-mono text-xs md:text-sm my-1 text-green-300 whitespace-pre overflow-x-auto">{line}</div>;
          }
          
          let content = line;
          let isBullet = false;
          if (line.trim().startsWith('- ')) {
            content = line.replace('- ', '');
            isBullet = true;
          }

          const parts = content.split(/(\*\*.*?\*\*)/g);
          const renderedParts = parts.map((part, idx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={idx} className="text-green-400 font-extrabold">{part.slice(2, -2)}</strong>;
            }
            return part;
          });

          if (isBullet) {
            return <div key={i} className="pl-4 -indent-4 my-1 text-gray-300">• {renderedParts}</div>;
          }
          if (line.startsWith('```')) return null; // Defensive, though we strip it in parseResponse
          return <div key={i} className="min-h-[1.5em]">{renderedParts}</div>;
        })}
      </>
    );
};

export default App;

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}