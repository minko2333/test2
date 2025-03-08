'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ChatBubbleLeftRightIcon, 
  BellAlertIcon, 
  HeartIcon, 
  UserGroupIcon, 
  Cog6ToothIcon 
} from '@heroicons/react/24/outline';

const NavigationBar = () => {
  const pathname = usePathname();
  
  const navItems = [
    { name: '聊天', href: '/pages/chat', icon: ChatBubbleLeftRightIcon },
    { name: '提醒', href: '/pages/reminder', icon: BellAlertIcon },
    { name: '健康', href: '/pages/healthcare', icon: HeartIcon },
    { name: '家人', href: '/pages/family', icon: UserGroupIcon },
    { name: '设置', href: '/pages/settings', icon: Cog6ToothIcon },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg rounded-t-xl">
      <div className="flex justify-around items-center p-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center p-2 rounded-lg ${
                isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
              }`}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-sm mt-1">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default NavigationBar; 