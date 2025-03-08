'use client';

import { useState } from 'react';
import { 
  PlusIcon, 
  TrashIcon, 
  BellAlertIcon,
  ArrowLeftIcon,
  PencilIcon,
  XMarkIcon
} from '@heroicons/react/24/solid';
import Link from 'next/link';
import NavigationBar from '../../components/NavigationBar';

type Reminder = {
  id: number;
  title: string;
  time: string;
  date: string;
  repeat: string;
  isActive: boolean;
};

export default function ReminderPage() {
  const [reminders, setReminders] = useState<Reminder[]>([
    { id: 1, title: '吃降压药', time: '08:00', date: '2025-03-08', repeat: '每天', isActive: true },
    { id: 2, title: '量血压', time: '09:00', date: '2025-03-08', repeat: '每天', isActive: true },
    { id: 3, title: '医生预约', time: '14:30', date: '2025-03-15', repeat: '一次性', isActive: true },
  ]);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [newReminder, setNewReminder] = useState<Omit<Reminder, 'id' | 'isActive'>>({
    title: '',
    time: '',
    date: '',
    repeat: '一次性'
  });
  
  const handleAddReminder = () => {
    if (newReminder.title && newReminder.time && newReminder.date) {
      const newId = reminders.length > 0 ? Math.max(...reminders.map(r => r.id)) + 1 : 1;
      setReminders([...reminders, { ...newReminder, id: newId, isActive: true }]);
      setNewReminder({ title: '', time: '', date: '', repeat: '一次性' });
      setShowAddForm(false);
    }
  };
  
  const handleToggleReminder = (id: number) => {
    setReminders(reminders.map(reminder => 
      reminder.id === id ? { ...reminder, isActive: !reminder.isActive } : reminder
    ));
  };
  
  const handleDeleteReminder = (id: number) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
  };

  return (
    <main className="flex min-h-screen flex-col bg-gray-50">
      <div className="flex-1 container mx-auto max-w-md bg-white shadow-sm overflow-hidden pb-16">
        {/* 头部 */}
        <header className="bg-orange-500 text-white p-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="mr-2">
              <ArrowLeftIcon className="h-6 w-6" />
            </Link>
            <div>
              <h1 className="text-xl font-bold">提醒管理</h1>
              <p className="text-sm opacity-80">不错过重要事项</p>
            </div>
          </div>
          <button 
            onClick={() => setShowAddForm(true)}
            className="bg-white text-orange-500 p-2 rounded-full"
          >
            <PlusIcon className="h-6 w-6" />
          </button>
        </header>
        
        {/* 提醒列表 */}
        <div className="p-4">
          <h2 className="text-lg font-medium text-gray-700 mb-3">我的提醒</h2>
          
          {reminders.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <BellAlertIcon className="h-12 w-12 mx-auto mb-2 text-gray-300" />
              <p>暂无提醒事项</p>
              <button 
                onClick={() => setShowAddForm(true)}
                className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg"
              >
                添加新提醒
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {reminders.map(reminder => (
                <div 
                  key={reminder.id} 
                  className={`border rounded-lg p-4 ${
                    reminder.isActive ? 'border-orange-200 bg-orange-50' : 'border-gray-200 bg-gray-50 opacity-60'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className={`font-medium ${reminder.isActive ? 'text-gray-800' : 'text-gray-500'}`}>
                        {reminder.title}
                      </h3>
                      <div className="flex items-center mt-1 text-sm text-gray-500">
                        <span className="mr-3">{reminder.time}</span>
                        <span className="mr-3">{reminder.date}</span>
                        <span>{reminder.repeat}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleToggleReminder(reminder.id)}
                        className={`p-1.5 rounded-full ${
                          reminder.isActive ? 'bg-orange-100 text-orange-500' : 'bg-gray-200 text-gray-500'
                        }`}
                      >
                        {reminder.isActive ? <BellAlertIcon className="h-5 w-5" /> : <XMarkIcon className="h-5 w-5" />}
                      </button>
                      <button 
                        onClick={() => handleDeleteReminder(reminder.id)}
                        className="p-1.5 bg-red-100 text-red-500 rounded-full"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* 添加提醒表单 */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg w-full max-w-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">添加新提醒</h2>
                <button 
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    提醒内容
                  </label>
                  <input
                    type="text"
                    value={newReminder.title}
                    onChange={(e) => setNewReminder({...newReminder, title: e.target.value})}
                    placeholder="例如：吃药、看医生"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    时间
                  </label>
                  <input
                    type="time"
                    value={newReminder.time}
                    onChange={(e) => setNewReminder({...newReminder, time: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    日期
                  </label>
                  <input
                    type="date"
                    value={newReminder.date}
                    onChange={(e) => setNewReminder({...newReminder, date: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    重复
                  </label>
                  <select
                    value={newReminder.repeat}
                    onChange={(e) => setNewReminder({...newReminder, repeat: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
                  >
                    <option value="一次性">一次性</option>
                    <option value="每天">每天</option>
                    <option value="每周">每周</option>
                    <option value="每月">每月</option>
                  </select>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    取消
                  </button>
                  <button
                    onClick={handleAddReminder}
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
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