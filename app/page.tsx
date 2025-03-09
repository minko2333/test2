'use client';

import NavigationBar from './components/NavigationBar';
import ChatModule from './components/ChatModule';
import QuickAccessModule from './components/QuickAccessModule';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-gray-900">
      <div className="flex-1 container mx-auto max-w-md bg-gray-800 shadow-sm overflow-hidden">
        <header className="bg-gray-800 text-white p-4">
          <h1 className="text-xl font-bold text-white">老年关怀助手</h1>
          <p className="text-sm opacity-80 text-gray-300">您的贴心生活伴侣</p>
        </header>
        
        <div className="h-[80vh]">
          <ChatModule />
        </div>
        
        <QuickAccessModule />
        
        <div className="p-4">
          <h2 className="text-lg font-medium text-gray-200 mb-3">今日提醒</h2>
          <div className="bg-gray-700 border-l-4 border-yellow-400 p-4 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-300">
                  今天下午3点需要服用高血压药物
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <NavigationBar />
    </main>
  );
}
