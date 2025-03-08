'use client';

import { useState } from 'react';
import { 
  Cog6ToothIcon, 
  ArrowLeftIcon, 
  UserCircleIcon,
  BellIcon,
  LanguageIcon,
  EyeIcon,
  SpeakerWaveIcon,
  HandRaisedIcon
} from '@heroicons/react/24/solid';
import Link from 'next/link';
import NavigationBar from '../../components/NavigationBar';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'user' | 'accessibility'>('user');
  
  // 用户设置
  const [userSettings, setUserSettings] = useState({
    notifications: true,
    soundEffects: true,
    language: '简体中文',
    fontSize: '中',
    theme: '浅色',
  });
  
  // 无障碍设置
  const [accessibilitySettings, setAccessibilitySettings] = useState({
    largeText: false,
    highContrast: false,
    screenReader: false,
    voiceControl: true,
    gestureControl: false,
  });
  
  const handleUserSettingChange = (setting: string, value: any) => {
    setUserSettings({
      ...userSettings,
      [setting]: value
    });
  };
  
  const handleAccessibilitySettingChange = (setting: string, value: boolean) => {
    setAccessibilitySettings({
      ...accessibilitySettings,
      [setting]: value
    });
  };

  return (
    <main className="flex min-h-screen flex-col bg-gray-50">
      <div className="flex-1 container mx-auto max-w-md bg-white shadow-sm overflow-hidden pb-16">
        {/* 头部 */}
        <header className="bg-gray-800 text-white p-4 flex items-center">
          <Link href="/" className="mr-2">
            <ArrowLeftIcon className="h-6 w-6" />
          </Link>
          <div>
            <h1 className="text-xl font-bold">设置</h1>
            <p className="text-sm opacity-80">个性化您的应用</p>
          </div>
        </header>
        
        {/* 标签页切换 */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('user')}
            className={`flex-1 py-3 text-center font-medium ${
              activeTab === 'user' 
                ? 'text-gray-800 border-b-2 border-gray-800' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            用户设置
          </button>
          <button
            onClick={() => setActiveTab('accessibility')}
            className={`flex-1 py-3 text-center font-medium ${
              activeTab === 'accessibility' 
                ? 'text-gray-800 border-b-2 border-gray-800' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            无障碍设置
          </button>
        </div>
        
        {/* 用户设置内容 */}
        {activeTab === 'user' && (
          <div className="p-4">
            <div className="space-y-6">
              {/* 个人信息 */}
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-4xl mr-4">
                  👵
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">张奶奶</h3>
                  <p className="text-sm text-gray-500">手机号: 135****6789</p>
                </div>
              </div>
              
              {/* 通知设置 */}
              <div className="border border-gray-200 rounded-lg divide-y">
                <div className="p-4">
                  <h3 className="font-medium text-gray-800 mb-4 flex items-center">
                    <BellIcon className="h-5 w-5 text-gray-600 mr-2" />
                    通知设置
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">接收通知</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={userSettings.notifications}
                          onChange={(e) => handleUserSettingChange('notifications', e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">声音效果</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={userSettings.soundEffects}
                          onChange={(e) => handleUserSettingChange('soundEffects', e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                {/* 语言设置 */}
                <div className="p-4">
                  <h3 className="font-medium text-gray-800 mb-4 flex items-center">
                    <LanguageIcon className="h-5 w-5 text-gray-600 mr-2" />
                    语言设置
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">语言</span>
                      <select 
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        value={userSettings.language}
                        onChange={(e) => handleUserSettingChange('language', e.target.value)}
                      >
                        <option value="简体中文">简体中文</option>
                        <option value="繁体中文">繁体中文</option>
                        <option value="English">English</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                {/* 外观设置 */}
                <div className="p-4">
                  <h3 className="font-medium text-gray-800 mb-4 flex items-center">
                    <EyeIcon className="h-5 w-5 text-gray-600 mr-2" />
                    外观设置
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">字体大小</span>
                      <select 
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        value={userSettings.fontSize}
                        onChange={(e) => handleUserSettingChange('fontSize', e.target.value)}
                      >
                        <option value="小">小</option>
                        <option value="中">中</option>
                        <option value="大">大</option>
                        <option value="超大">超大</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">主题</span>
                      <select 
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        value={userSettings.theme}
                        onChange={(e) => handleUserSettingChange('theme', e.target.value)}
                      >
                        <option value="浅色">浅色</option>
                        <option value="深色">深色</option>
                        <option value="跟随系统">跟随系统</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 关于 */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-800 mb-2">关于应用</h3>
                <p className="text-sm text-gray-600">老年关怀助手 v1.0.0</p>
                <p className="text-sm text-gray-600 mt-1">© 2025 老年关怀助手团队</p>
              </div>
            </div>
          </div>
        )}
        
        {/* 无障碍设置内容 */}
        {activeTab === 'accessibility' && (
          <div className="p-4">
            <div className="space-y-6">
              {/* 视觉辅助 */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-800 mb-4 flex items-center">
                  <EyeIcon className="h-5 w-5 text-gray-600 mr-2" />
                  视觉辅助
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-gray-700 block">大字体</span>
                      <span className="text-xs text-gray-500">使所有文字更大，更容易阅读</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={accessibilitySettings.largeText}
                        onChange={(e) => handleAccessibilitySettingChange('largeText', e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-gray-700 block">高对比度</span>
                      <span className="text-xs text-gray-500">增强文字与背景的对比度</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={accessibilitySettings.highContrast}
                        onChange={(e) => handleAccessibilitySettingChange('highContrast', e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
              
              {/* 听觉辅助 */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-800 mb-4 flex items-center">
                  <SpeakerWaveIcon className="h-5 w-5 text-gray-600 mr-2" />
                  听觉辅助
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-gray-700 block">屏幕阅读器</span>
                      <span className="text-xs text-gray-500">朗读屏幕上的内容</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={accessibilitySettings.screenReader}
                        onChange={(e) => handleAccessibilitySettingChange('screenReader', e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-gray-700 block">语音控制</span>
                      <span className="text-xs text-gray-500">使用语音命令控制应用</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={accessibilitySettings.voiceControl}
                        onChange={(e) => handleAccessibilitySettingChange('voiceControl', e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
              
              {/* 操作辅助 */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-800 mb-4 flex items-center">
                  <HandRaisedIcon className="h-5 w-5 text-gray-600 mr-2" />
                  操作辅助
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-gray-700 block">手势控制</span>
                      <span className="text-xs text-gray-500">使用简单手势操作应用</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={accessibilitySettings.gestureControl}
                        onChange={(e) => handleAccessibilitySettingChange('gestureControl', e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
              
              {/* 无障碍帮助 */}
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                <h3 className="font-medium text-blue-800 mb-2">无障碍帮助</h3>
                <p className="text-sm text-blue-700">
                  如果您在使用应用时遇到任何困难，请联系我们的客服团队获取帮助。
                </p>
                <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg text-sm">
                  联系客服
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <NavigationBar />
    </main>
  );
} 