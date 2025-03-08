'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  BellAlertIcon, 
  HeartIcon, 
  MusicalNoteIcon 
} from '@heroicons/react/24/outline';

const QuickAccessModule = () => {
  const quickAccessItems = [
    { 
      name: '快捷提醒', 
      icon: BellAlertIcon, 
      href: '/pages/reminder',
      color: 'bg-orange-100 text-orange-600' 
    },
    { 
      name: '健康问询', 
      icon: HeartIcon, 
      href: '/pages/healthcare',
      color: 'bg-red-100 text-red-600' 
    },
    { 
      name: '娱乐功能', 
      icon: MusicalNoteIcon, 
      href: '#',
      color: 'bg-purple-100 text-purple-600',
      onClick: () => handleEntertainmentClick()
    },
  ];

  const [showEntertainmentOptions, setShowEntertainmentOptions] = useState(false);
  const [entertainmentOptions, setEntertainmentOptions] = useState([
    { name: '听音乐', action: () => console.log('播放音乐') },
    { name: '看新闻', action: () => console.log('浏览新闻') },
    { name: '玩游戏', action: () => console.log('启动游戏') },
  ]);

  const handleEntertainmentClick = () => {
    setShowEntertainmentOptions(!showEntertainmentOptions);
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-medium text-gray-700 mb-3">快捷功能</h2>
      <div className="grid grid-cols-3 gap-3">
        {quickAccessItems.map((item) => (
          <div key={item.name} className="flex flex-col items-center">
            {item.onClick ? (
              <button
                onClick={item.onClick}
                className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center mb-2`}
              >
                <item.icon className="h-8 w-8" />
              </button>
            ) : (
              <Link href={item.href}>
                <div className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center mb-2`}>
                  <item.icon className="h-8 w-8" />
                </div>
              </Link>
            )}
            <span className="text-sm text-gray-600">{item.name}</span>
          </div>
        ))}
      </div>

      {/* 娱乐选项弹出层 */}
      {showEntertainmentOptions && (
        <div className="mt-4 p-3 bg-white rounded-lg shadow-lg border border-gray-200">
          <h3 className="text-md font-medium text-gray-700 mb-2">娱乐选项</h3>
          <div className="space-y-2">
            {entertainmentOptions.map((option, index) => (
              <button
                key={index}
                onClick={option.action}
                className="w-full text-left p-2 rounded-lg hover:bg-purple-50 text-gray-700"
              >
                {option.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickAccessModule; 