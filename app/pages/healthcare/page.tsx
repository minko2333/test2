'use client';

import { useState } from 'react';
import { 
  HeartIcon, 
  ArrowLeftIcon, 
  PlusIcon,
  ChartBarIcon,
  BeakerIcon,
  ClockIcon
} from '@heroicons/react/24/solid';
import Link from 'next/link';
import NavigationBar from '../../components/NavigationBar';

type HealthRecord = {
  id: number;
  type: string;
  value: string;
  unit: string;
  date: string;
  time: string;
  note?: string;
};

type Medication = {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  time: string[];
  startDate: string;
  endDate?: string;
  isActive: boolean;
};

export default function HealthcarePage() {
  const [activeTab, setActiveTab] = useState<'inquiry' | 'medication'>('inquiry');
  
  // 健康记录数据
  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>([
    { id: 1, type: '血压', value: '120/80', unit: 'mmHg', date: '2025-03-08', time: '08:30', note: '早晨测量' },
    { id: 2, type: '血糖', value: '5.6', unit: 'mmol/L', date: '2025-03-08', time: '07:15', note: '空腹' },
    { id: 3, type: '体重', value: '65', unit: 'kg', date: '2025-03-07', time: '20:00' },
  ]);
  
  // 用药提醒数据
  const [medications, setMedications] = useState<Medication[]>([
    { 
      id: 1, 
      name: '降压药', 
      dosage: '1片', 
      frequency: '每天', 
      time: ['08:00', '20:00'], 
      startDate: '2025-01-01', 
      isActive: true 
    },
    { 
      id: 2, 
      name: '降糖药', 
      dosage: '1片', 
      frequency: '每天', 
      time: ['08:00'], 
      startDate: '2025-02-15', 
      isActive: true 
    },
  ]);
  
  const [showAddHealthForm, setShowAddHealthForm] = useState(false);
  const [newHealthRecord, setNewHealthRecord] = useState<Omit<HealthRecord, 'id'>>({
    type: '血压',
    value: '',
    unit: 'mmHg',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().split(' ')[0].substring(0, 5),
    note: ''
  });
  
  const handleAddHealthRecord = () => {
    if (newHealthRecord.value && newHealthRecord.date && newHealthRecord.time) {
      const newId = healthRecords.length > 0 ? Math.max(...healthRecords.map(r => r.id)) + 1 : 1;
      setHealthRecords([{ ...newHealthRecord, id: newId }, ...healthRecords]);
      setNewHealthRecord({
        type: '血压',
        value: '',
        unit: 'mmHg',
        date: new Date().toISOString().split('T')[0],
        time: new Date().toTimeString().split(' ')[0].substring(0, 5),
        note: ''
      });
      setShowAddHealthForm(false);
    }
  };
  
  // 根据健康记录类型设置单位
  const handleHealthTypeChange = (type: string) => {
    let unit = '';
    switch (type) {
      case '血压':
        unit = 'mmHg';
        break;
      case '血糖':
        unit = 'mmol/L';
        break;
      case '体重':
        unit = 'kg';
        break;
      case '体温':
        unit = '°C';
        break;
      default:
        unit = '';
    }
    setNewHealthRecord({ ...newHealthRecord, type, unit });
  };

  return (
    <main className="flex min-h-screen flex-col bg-gray-50">
      <div className="flex-1 container mx-auto max-w-md bg-white shadow-sm overflow-hidden pb-16">
        {/* 头部 */}
        <header className="bg-red-500 text-white p-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="mr-2">
              <ArrowLeftIcon className="h-6 w-6" />
            </Link>
            <div>
              <h1 className="text-xl font-bold">健康关怀</h1>
              <p className="text-sm opacity-80">关注您的健康状况</p>
            </div>
          </div>
          {activeTab === 'inquiry' && (
            <button 
              onClick={() => setShowAddHealthForm(true)}
              className="bg-white text-red-500 p-2 rounded-full"
            >
              <PlusIcon className="h-6 w-6" />
            </button>
          )}
        </header>
        
        {/* 标签页切换 */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('inquiry')}
            className={`flex-1 py-3 text-center font-medium ${
              activeTab === 'inquiry' 
                ? 'text-red-600 border-b-2 border-red-500' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            健康问询
          </button>
          <button
            onClick={() => setActiveTab('medication')}
            className={`flex-1 py-3 text-center font-medium ${
              activeTab === 'medication' 
                ? 'text-red-600 border-b-2 border-red-500' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            用药提醒
          </button>
        </div>
        
        {/* 健康问询内容 */}
        {activeTab === 'inquiry' && (
          <div className="p-4">
            <h2 className="text-lg font-medium text-gray-700 mb-3">健康记录</h2>
            
            {healthRecords.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <HeartIcon className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                <p>暂无健康记录</p>
                <button 
                  onClick={() => setShowAddHealthForm(true)}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  添加健康记录
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {healthRecords.map(record => (
                  <div 
                    key={record.id} 
                    className="border border-gray-200 rounded-lg p-4 bg-white"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="bg-red-100 text-red-500 p-2 rounded-full mr-3">
                          <ChartBarIcon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">{record.type}</h3>
                          <p className="text-sm text-gray-500">
                            {record.date} {record.time}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-800">
                          {record.value} <span className="text-sm font-normal text-gray-500">{record.unit}</span>
                        </p>
                        {record.note && (
                          <p className="text-xs text-gray-500">{record.note}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* 健康建议 */}
            <div className="mt-6 bg-red-50 border border-red-100 rounded-lg p-4">
              <h3 className="font-medium text-red-800 mb-2">健康建议</h3>
              <ul className="text-sm text-red-700 space-y-2">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>您的血压处于正常范围，请继续保持良好的生活习惯。</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>建议每天进行30分钟的适度运动，如散步或太极拳。</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>保持低盐饮食，多摄入新鲜蔬果。</span>
                </li>
              </ul>
            </div>
          </div>
        )}
        
        {/* 用药提醒内容 */}
        {activeTab === 'medication' && (
          <div className="p-4">
            <h2 className="text-lg font-medium text-gray-700 mb-3">我的用药</h2>
            
            {medications.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <BeakerIcon className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                <p>暂无用药提醒</p>
              </div>
            ) : (
              <div className="space-y-4">
                {medications.map(medication => (
                  <div 
                    key={medication.id} 
                    className={`border rounded-lg p-4 ${
                      medication.isActive ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-gray-50 opacity-60'
                    }`}
                  >
                    <div className="flex items-start">
                      <div className="bg-red-100 text-red-500 p-2 rounded-full mr-3">
                        <BeakerIcon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800">{medication.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {medication.dosage} · {medication.frequency}
                        </p>
                        
                        <div className="mt-3 space-y-2">
                          {medication.time.map((time, index) => (
                            <div key={index} className="flex items-center text-sm">
                              <ClockIcon className="h-4 w-4 text-gray-500 mr-1" />
                              <span>{time}</span>
                            </div>
                          ))}
                        </div>
                        
                        <p className="text-xs text-gray-500 mt-2">
                          开始日期: {medication.startDate}
                          {medication.endDate && ` · 结束日期: ${medication.endDate}`}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* 用药注意事项 */}
            <div className="mt-6 bg-yellow-50 border border-yellow-100 rounded-lg p-4">
              <h3 className="font-medium text-yellow-800 mb-2">用药注意事项</h3>
              <ul className="text-sm text-yellow-700 space-y-2">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>请按时服药，不要随意调整剂量或停药。</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>降压药最好在饭后服用，以减少对胃的刺激。</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>如有不适，请及时联系您的医生。</span>
                </li>
              </ul>
            </div>
          </div>
        )}
        
        {/* 添加健康记录表单 */}
        {showAddHealthForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg w-full max-w-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">添加健康记录</h2>
                <button 
                  onClick={() => setShowAddHealthForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <ArrowLeftIcon className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    记录类型
                  </label>
                  <select
                    value={newHealthRecord.type}
                    onChange={(e) => handleHealthTypeChange(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-300"
                  >
                    <option value="血压">血压</option>
                    <option value="血糖">血糖</option>
                    <option value="体重">体重</option>
                    <option value="体温">体温</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    数值
                  </label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={newHealthRecord.value}
                      onChange={(e) => setNewHealthRecord({...newHealthRecord, value: e.target.value})}
                      placeholder={newHealthRecord.type === '血压' ? '例如：120/80' : '输入数值'}
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-300"
                    />
                    <span className="ml-2 text-gray-500">{newHealthRecord.unit}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      日期
                    </label>
                    <input
                      type="date"
                      value={newHealthRecord.date}
                      onChange={(e) => setNewHealthRecord({...newHealthRecord, date: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-300"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      时间
                    </label>
                    <input
                      type="time"
                      value={newHealthRecord.time}
                      onChange={(e) => setNewHealthRecord({...newHealthRecord, time: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-300"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    备注 (可选)
                  </label>
                  <input
                    type="text"
                    value={newHealthRecord.note || ''}
                    onChange={(e) => setNewHealthRecord({...newHealthRecord, note: e.target.value})}
                    placeholder="例如：饭前、饭后、运动后等"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-300"
                  />
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    onClick={() => setShowAddHealthForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    取消
                  </button>
                  <button
                    onClick={handleAddHealthRecord}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    保存
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <NavigationBar />
    </main>
  );
} 