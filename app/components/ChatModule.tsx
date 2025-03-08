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

  const handleSendMessage = () => {
    if (message.trim()) {
      // 添加用户消息到聊天历史
      setChatHistory([...chatHistory, { sender: 'user', text: message }]);
      
      // 模拟AI响应
      setTimeout(() => {
        setChatHistory(prev => [...prev, { 
          sender: 'ai', 
          text: `我收到了您的消息："${message}"。我正在处理中...` 
        }]);
      }, 1000);
      
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

  const handleTopicSelect = (topic: string) => {
    setChatHistory([...chatHistory, { sender: 'user', text: topic }]);
    
    // 模拟AI响应
    setTimeout(() => {
      let response = '';
      if (topic.includes('天气')) {
        response = '今天天气晴朗，温度适宜，非常适合户外活动！';
      } else if (topic.includes('提醒')) {
        response = '好的，我可以帮您设置吃药提醒。请告诉我具体的时间和药物名称。';
      } else if (topic.includes('家人')) {
        response = '好的，您想联系哪位家人呢？';
      } else if (topic.includes('笑话')) {
        response = '一位老人去银行取钱，柜员问："您要取多少？" 老人说："全部！" 柜员惊讶地问："全部？" 老人回答："是的，我的退休金全部取出来！"';
      }
      setChatHistory(prev => [...prev, { sender: 'ai', text: response }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full">
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
                  ? 'bg-blue-500 text-white rounded-br-none' 
                  : 'bg-gray-200 text-gray-800 rounded-bl-none'
              }`}
            >
              {chat.text}
            </div>
          </div>
        ))}
      </div>
      
      {/* 话题建议栏 */}
      <div className="p-2 bg-gray-50">
        <p className="text-sm text-gray-500 mb-2">推荐话题：</p>
        <div className="flex flex-wrap gap-2">
          {suggestedTopics.map((topic, index) => (
            <button
              key={index}
              onClick={() => handleTopicSelect(topic)}
              className="bg-white border border-gray-300 rounded-full px-3 py-1 text-sm text-gray-600 hover:bg-gray-100"
            >
              {topic}
            </button>
          ))}
        </div>
      </div>
      
      {/* 输入区域 */}
      <div className="border-t border-gray-200 p-2 flex items-center">
        <button 
          onClick={handleVoiceInput}
          className={`p-2 rounded-full ${isRecording ? 'bg-red-500 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
        >
          <MicrophoneIcon className="h-6 w-6" />
        </button>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="请输入消息..."
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 mx-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button 
          onClick={handleSendMessage}
          className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
        >
          <PaperAirplaneIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default ChatModule; 