'use client';

import { useState } from 'react';
import { 
  UserGroupIcon, 
  ArrowLeftIcon, 
  PhoneIcon,
  VideoCameraIcon,
  ChatBubbleLeftRightIcon,
  MapPinIcon,
  HeartIcon
} from '@heroicons/react/24/solid';
import Link from 'next/link';
import NavigationBar from '../../components/NavigationBar';

type FamilyMember = {
  id: number;
  name: string;
  relation: string;
  avatar: string;
  phone: string;
  lastContact?: string;
  location?: string;
  healthStatus?: 'good' | 'normal' | 'attention';
};

export default function FamilyPage() {
  const [activeTab, setActiveTab] = useState<'contacts' | 'monitoring'>('contacts');
  
  // 家人联系人数据
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    { 
      id: 1, 
      name: '张明', 
      relation: '儿子', 
      avatar: '👨', 
      phone: '138****1234',
      lastContact: '今天',
      location: '上海市',
      healthStatus: 'good'
    },
    { 
      id: 2, 
      name: '李华', 
      relation: '女儿', 
      avatar: '👩', 
      phone: '139****5678',
      lastContact: '昨天',
      location: '北京市',
      healthStatus: 'normal'
    },
    { 
      id: 3, 
      name: '王小明', 
      relation: '孙子', 
      avatar: '👦', 
      phone: '137****9012',
      lastContact: '3天前',
      location: '上海市',
      healthStatus: 'good'
    },
  ]);
  
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
  const [showContactOptions, setShowContactOptions] = useState(false);
  
  const handleSelectMember = (member: FamilyMember) => {
    setSelectedMember(member);
    setShowContactOptions(true);
  };
  
  const getHealthStatusColor = (status?: 'good' | 'normal' | 'attention') => {
    switch (status) {
      case 'good':
        return 'text-green-500';
      case 'normal':
        return 'text-yellow-500';
      case 'attention':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-gray-50">
      <div className="flex-1 container mx-auto max-w-md bg-white shadow-sm overflow-hidden pb-16">
        {/* 头部 */}
        <header className="bg-green-600 text-white p-4 flex items-center">
          <Link href="/" className="mr-2">
            <ArrowLeftIcon className="h-6 w-6" />
          </Link>
          <div>
            <h1 className="text-xl font-bold">家人联系</h1>
            <p className="text-sm opacity-80">与家人保持联系</p>
          </div>
        </header>
        
        {/* 标签页切换 */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('contacts')}
            className={`flex-1 py-3 text-center font-medium ${
              activeTab === 'contacts' 
                ? 'text-green-600 border-b-2 border-green-500' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            联系人
          </button>
          <button
            onClick={() => setActiveTab('monitoring')}
            className={`flex-1 py-3 text-center font-medium ${
              activeTab === 'monitoring' 
                ? 'text-green-600 border-b-2 border-green-500' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            监控面板
          </button>
        </div>
        
        {/* 联系人内容 */}
        {activeTab === 'contacts' && (
          <div className="p-4">
            <h2 className="text-lg font-medium text-gray-700 mb-3">家人联系人</h2>
            
            {familyMembers.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <UserGroupIcon className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                <p>暂无家人联系人</p>
              </div>
            ) : (
              <div className="space-y-3">
                {familyMembers.map(member => (
                  <div 
                    key={member.id} 
                    className="border border-gray-200 rounded-lg p-4 bg-white hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleSelectMember(member)}
                  >
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl mr-4">
                        {member.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium text-gray-800">{member.name}</h3>
                          <span className="text-sm text-gray-500">{member.lastContact}</span>
                        </div>
                        <p className="text-sm text-gray-600">{member.relation}</p>
                        <div className="flex items-center mt-1">
                          <PhoneIcon className="h-4 w-4 text-gray-400 mr-1" />
                          <span className="text-sm text-gray-500">{member.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* 联系方式选择弹窗 */}
            {showContactOptions && selectedMember && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-lg w-full max-w-md p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">联系 {selectedMember.name}</h2>
                    <button 
                      onClick={() => setShowContactOptions(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <ArrowLeftIcon className="h-6 w-6" />
                    </button>
                  </div>
                  
                  <div className="flex flex-col space-y-3">
                    <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-green-50">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                        <PhoneIcon className="h-5 w-5 text-green-600" />
                      </div>
                      <span className="font-medium">语音通话</span>
                    </button>
                    
                    <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-green-50">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                        <VideoCameraIcon className="h-5 w-5 text-green-600" />
                      </div>
                      <span className="font-medium">视频通话</span>
                    </button>
                    
                    <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-green-50">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                        <ChatBubbleLeftRightIcon className="h-5 w-5 text-green-600" />
                      </div>
                      <span className="font-medium">发送消息</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* 监控面板内容 */}
        {activeTab === 'monitoring' && (
          <div className="p-4">
            <h2 className="text-lg font-medium text-gray-700 mb-3">家人状态监控</h2>
            
            <div className="space-y-4">
              {familyMembers.map(member => (
                <div 
                  key={member.id} 
                  className="border border-gray-200 rounded-lg p-4 bg-white"
                >
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-xl mr-3">
                      {member.avatar}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">{member.name}</h3>
                      <p className="text-sm text-gray-600">{member.relation}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="border border-gray-100 rounded-lg p-3 bg-gray-50">
                      <div className="flex items-center mb-1">
                        <MapPinIcon className="h-4 w-4 text-gray-500 mr-1" />
                        <span className="text-sm font-medium text-gray-700">位置</span>
                      </div>
                      <p className="text-sm text-gray-600">{member.location || '未知'}</p>
                    </div>
                    
                    <div className="border border-gray-100 rounded-lg p-3 bg-gray-50">
                      <div className="flex items-center mb-1">
                        <HeartIcon className={`h-4 w-4 mr-1 ${getHealthStatusColor(member.healthStatus)}`} />
                        <span className="text-sm font-medium text-gray-700">健康状态</span>
                      </div>
                      <p className={`text-sm ${getHealthStatusColor(member.healthStatus)}`}>
                        {member.healthStatus === 'good' && '良好'}
                        {member.healthStatus === 'normal' && '一般'}
                        {member.healthStatus === 'attention' && '需关注'}
                        {!member.healthStatus && '未知'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex justify-end">
                    <button 
                      onClick={() => handleSelectMember(member)}
                      className="px-3 py-1 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600"
                    >
                      立即联系
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 bg-blue-50 border border-blue-100 rounded-lg p-4">
              <h3 className="font-medium text-blue-800 mb-2">监控说明</h3>
              <ul className="text-sm text-blue-700 space-y-2">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>位置信息基于家人最后一次使用APP的位置。</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>健康状态根据家人自主上报的健康数据综合评估。</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>如有异常情况，系统会自动提醒您及时联系家人。</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
      
      <NavigationBar />
    </main>
  );
} 