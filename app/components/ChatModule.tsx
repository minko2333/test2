'use client';

import { useState } from 'react';
import { MicrophoneIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid';

const ChatModule = () => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [chatHistory, setChatHistory] = useState<{ sender: 'user' | 'ai'; text: string }[]>([
    { sender: 'ai', text: '您好！今天我能为您做些什么？' }
  ]);

  // 模拟话题建议
  const suggestedTopics = [
    '今天的天气怎么样？',
    '帮我设置一个吃药提醒',
    '我想联系我的家人',
    '给我讲个笑话'
  ];

  const handleSendMessage = async () => {
    if (message.trim()) {
      // 添加用户消息到聊天历史
      setChatHistory([...chatHistory, { sender: 'user', text: message }]);
      
      try {
        // 显示加载状态
        setChatHistory(prev => [...prev, { 
          sender: 'ai', 
          text: '正在思考...' 
        }]);
        
        // 调用 API
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message })
        });
        
        if (!response.ok) {
          throw new Error('API 请求失败');
        }
        
        const data = await response.json();
        
        // 更新最后一条 AI 消息
        setChatHistory(prev => [
          ...prev.slice(0, prev.length - 1),
          { sender: 'ai', text: data.text }
        ]);
      } catch (error) {
        console.error('发送消息错误:', error);
        // 更新最后一条 AI 消息为错误信息
        setChatHistory(prev => [
          ...prev.slice(0, prev.length - 1),
          { sender: 'ai', text: '抱歉，我遇到了一些问题，无法回应您的消息。' }
        ]);
      }
      
      setMessage('');
    }
  };

  const handleVoiceInput = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // 模拟开始录音
      console.log('开始录音...');
    } else {
      // 模拟结束录音并处理
      console.log('结束录音，处理语音...');
      setTimeout(() => {
        const simulatedVoiceText = '这是一条模拟的语音转文字消息';
        setChatHistory([...chatHistory, { sender: 'user', text: simulatedVoiceText }]);
        
        // 模拟AI响应
        setTimeout(() => {
          setChatHistory(prev => [...prev, { 
            sender: 'ai', 
            text: `我收到了您的语音消息，内容是："${simulatedVoiceText}"` 
          }]);
        }, 1000);
      }, 1500);
    }
  };

  const handleTopicSelect = async (topic: string) => {
    // 添加用户消息到聊天历史
    setChatHistory([...chatHistory, { sender: 'user', text: topic }]);
    
    try {
      // 显示加载状态
      setChatHistory(prev => [...prev, { 
        sender: 'ai', 
        text: '正在思考...' 
      }]);
      
      // 调用 AI API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: topic })
      });
      
      if (!response.ok) {
        throw new Error('API 请求失败');
      }
      
      const data = await response.json();
      
      // 更新最后一条 AI 消息
      setChatHistory(prev => [
        ...prev.slice(0, prev.length - 1),
        { sender: 'ai', text: data.text }
      ]);
    } catch (error) {
      console.error('发送消息错误:', error);
      // 更新最后一条 AI 消息为错误信息
      setChatHistory(prev => [
        ...prev.slice(0, prev.length - 1),
        { sender: 'ai', text: '抱歉，我遇到了一些问题，无法回应您的消息。' }
      ]);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-800">
      {/* 聊天历史 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatHistory.map((chat, index) => (
          <div 
            key={index} 
            className={`flex ${chat.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] p-3 rounded-lg ${
                chat.sender === 'user' 
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-gray-700 text-gray-200 rounded-bl-none'
              }`}
            >
              {chat.text}
            </div>
          </div>
        ))}
      </div>
      
      {/* 话题建议栏 */}
      <div className="p-2 bg-gray-900">
        <p className="text-sm text-gray-400 mb-2">推荐话题：</p>
        <div className="flex flex-wrap gap-2">
          {suggestedTopics.map((topic, index) => (
            <button
              key={index}
              onClick={() => handleTopicSelect(topic)}
              className="bg-gray-700 border border-gray-600 rounded-full px-3 py-1 text-sm text-gray-300 hover:bg-gray-600"
            >
              {topic}
            </button>
          ))}
        </div>
      </div>
      
      {/* 输入区域 */}
      <div className="border-t border-gray-700 p-3 flex items-center bg-gray-800">
        <button 
          onClick={handleVoiceInput}
          className={`p-2 rounded-full ${isRecording ? 'bg-red-500 text-white' : 'text-gray-400 hover:bg-gray-700'}`}
        >
          <MicrophoneIcon className="h-6 w-6" />
        </button>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="请输入消息..."
          className="flex-1 border border-gray-600 bg-gray-700 text-gray-200 rounded-full px-4 py-2 mx-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
        />
        <button 
          onClick={handleSendMessage}
          className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
        >
          <PaperAirplaneIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default ChatModule; 