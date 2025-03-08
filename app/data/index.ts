// 用户数据接口
export interface UserData {
  id: string;
  name: string;
  avatar?: string;
  phone: string;
  age?: number;
  gender?: 'male' | 'female' | 'other';
  address?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relation: string;
  }[];
  settings: {
    notifications: boolean;
    soundEffects: boolean;
    language: string;
    fontSize: string;
    theme: string;
  };
  accessibilitySettings: {
    largeText: boolean;
    highContrast: boolean;
    screenReader: boolean;
    voiceControl: boolean;
    gestureControl: boolean;
  };
}

// 对话历史接口
export interface ConversationData {
  id: string;
  userId: string;
  messages: {
    id: string;
    sender: 'user' | 'ai';
    text: string;
    timestamp: string;
    emotion?: 'happy' | 'sad' | 'neutral' | 'confused';
  }[];
  createdAt: string;
  updatedAt: string;
}

// 提醒数据接口
export interface ReminderData {
  id: string;
  userId: string;
  title: string;
  time: string;
  date: string;
  repeat: '一次性' | '每天' | '每周' | '每月';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// 健康数据接口
export interface HealthData {
  id: string;
  userId: string;
  type: '血压' | '血糖' | '体重' | '体温' | string;
  value: string;
  unit: string;
  date: string;
  time: string;
  note?: string;
  createdAt: string;
  updatedAt: string;
}

// 家人数据接口
export interface FamilyData {
  id: string;
  userId: string;
  name: string;
  relation: string;
  avatar?: string;
  phone: string;
  lastContact?: string;
  location?: string;
  healthStatus?: 'good' | 'normal' | 'attention';
}

// 模拟用户数据
export const mockUserData: UserData = {
  id: 'user-001',
  name: '张奶奶',
  avatar: '👵',
  phone: '135****6789',
  age: 72,
  gender: 'female',
  address: '上海市浦东新区XX路XX号',
  emergencyContact: [
    {
      name: '张明',
      phone: '138****1234',
      relation: '儿子'
    },
    {
      name: '李华',
      phone: '139****5678',
      relation: '女儿'
    }
  ],
  settings: {
    notifications: true,
    soundEffects: true,
    language: '简体中文',
    fontSize: '中',
    theme: '浅色'
  },
  accessibilitySettings: {
    largeText: false,
    highContrast: false,
    screenReader: false,
    voiceControl: true,
    gestureControl: false
  }
};

// 模拟对话历史数据
export const mockConversationData: ConversationData = {
  id: 'conv-001',
  userId: 'user-001',
  messages: [
    {
      id: 'msg-001',
      sender: 'ai',
      text: '您好！今天我能为您做些什么？',
      timestamp: '2025-03-08T08:00:00Z',
      emotion: 'happy'
    },
    {
      id: 'msg-002',
      sender: 'user',
      text: '今天天气怎么样？',
      timestamp: '2025-03-08T08:01:00Z',
      emotion: 'neutral'
    },
    {
      id: 'msg-003',
      sender: 'ai',
      text: '今天天气晴朗，温度适宜，非常适合户外活动！',
      timestamp: '2025-03-08T08:01:10Z',
      emotion: 'happy'
    }
  ],
  createdAt: '2025-03-08T08:00:00Z',
  updatedAt: '2025-03-08T08:01:10Z'
};

// 模拟提醒数据
export const mockReminderData: ReminderData[] = [
  {
    id: 'rem-001',
    userId: 'user-001',
    title: '吃降压药',
    time: '08:00',
    date: '2025-03-08',
    repeat: '每天',
    isActive: true,
    createdAt: '2025-03-01T00:00:00Z',
    updatedAt: '2025-03-01T00:00:00Z'
  },
  {
    id: 'rem-002',
    userId: 'user-001',
    title: '量血压',
    time: '09:00',
    date: '2025-03-08',
    repeat: '每天',
    isActive: true,
    createdAt: '2025-03-01T00:00:00Z',
    updatedAt: '2025-03-01T00:00:00Z'
  },
  {
    id: 'rem-003',
    userId: 'user-001',
    title: '医生预约',
    time: '14:30',
    date: '2025-03-15',
    repeat: '一次性',
    isActive: true,
    createdAt: '2025-03-05T00:00:00Z',
    updatedAt: '2025-03-05T00:00:00Z'
  }
];

// 模拟健康数据
export const mockHealthData: HealthData[] = [
  {
    id: 'health-001',
    userId: 'user-001',
    type: '血压',
    value: '120/80',
    unit: 'mmHg',
    date: '2025-03-08',
    time: '08:30',
    note: '早晨测量',
    createdAt: '2025-03-08T08:30:00Z',
    updatedAt: '2025-03-08T08:30:00Z'
  },
  {
    id: 'health-002',
    userId: 'user-001',
    type: '血糖',
    value: '5.6',
    unit: 'mmol/L',
    date: '2025-03-08',
    time: '07:15',
    note: '空腹',
    createdAt: '2025-03-08T07:15:00Z',
    updatedAt: '2025-03-08T07:15:00Z'
  },
  {
    id: 'health-003',
    userId: 'user-001',
    type: '体重',
    value: '65',
    unit: 'kg',
    date: '2025-03-07',
    time: '20:00',
    createdAt: '2025-03-07T20:00:00Z',
    updatedAt: '2025-03-07T20:00:00Z'
  }
];

// 模拟家人数据
export const mockFamilyData: FamilyData[] = [
  {
    id: 'family-001',
    userId: 'user-001',
    name: '张明',
    relation: '儿子',
    avatar: '👨',
    phone: '138****1234',
    lastContact: '今天',
    location: '上海市',
    healthStatus: 'good'
  },
  {
    id: 'family-002',
    userId: 'user-001',
    name: '李华',
    relation: '女儿',
    avatar: '👩',
    phone: '139****5678',
    lastContact: '昨天',
    location: '北京市',
    healthStatus: 'normal'
  },
  {
    id: 'family-003',
    userId: 'user-001',
    name: '王小明',
    relation: '孙子',
    avatar: '👦',
    phone: '137****9012',
    lastContact: '3天前',
    location: '上海市',
    healthStatus: 'good'
  }
]; 