'use client';

import { useState, useEffect } from 'react';
import { 
  MicrophoneIcon, 
  PaperAirplaneIcon, 
  FaceSmileIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/solid';
import Link from 'next/link';
import NavigationBar from '../../components/NavigationBar';

export default function ChatPage() {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [chatHistory, setChatHistory] = useState<{ 
    sender: 'user' | 'ai'; 
    text: string; 
    emotion?: 'happy' | 'sad' | 'neutral' | 'confused';
  }[]>([
    { sender: 'ai', text: '您好！我们可以聊点什么呢？', emotion: 'happy' }
  ]);
  
  // 模拟话题建议
  const [suggestedTopics, setSuggestedTopics] = useState([
    '今天的天气怎么样？',
    '我感觉有点不舒服',
    '帮我联系我的儿子',
    '我想听一首歌'
  ]);

  // 模拟情绪识别
  const detectEmotion = (text: string) => {
    if (text.includes('不舒服') || text.includes('难过') || text.includes('伤心')) {
      return 'sad';
    } else if (text.includes('开心') || text.includes('高兴') || text.includes('好')) {
      return 'happy';
    } else if (text.includes('不知道') || text.includes('疑问') || text.includes('怎么')) {
      return 'confused';
    }
    return 'neutral';
  };

  // 模拟话题引导
  useEffect(() => {
    if (chatHistory.length > 1) {
      const lastMessage = chatHistory[chatHistory.length - 1];
      if (lastMessage.sender === 'user') {
        // 根据用户消息更新话题建议
        if (lastMessage.text.includes('天气')) {
          setSuggestedTopics([
            '您喜欢什么样的天气？',
            '今天想出门散步吗？',
            '需要我查看明天的天气预报吗？'
          ]);
        } else if (lastMessage.text.includes('不舒服')) {
          setSuggestedTopics([
            '您哪里不舒服？',
            '需要我帮您预约医生吗？',
            '您最近有按时吃药吗？'
          ]);
        } else if (lastMessage.text.includes('儿子') || lastMessage.text.includes('家人')) {
          setSuggestedTopics([
            '您想给他打电话吗？',
            '您想发送消息给他吗？',
            '您上次和家人联系是什么时候？'
          ]);
        }
      }
    }
  }, [chatHistory]);

  const handleSendMessage = async () => {
    if (message.trim()) {
      // 添加用户消息到聊天历史
      const userEmotion = detectEmotion(message);
      setChatHistory([...chatHistory, { 
        sender: 'user', 
        text: message,
        emotion: userEmotion as any
      }]);
      
      try {
        // 显示加载状态
        setChatHistory(prev => [...prev, { 
          sender: 'ai', 
          text: '正在思考...',
          emotion: 'neutral'
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
        
        // 根据回复内容检测情绪
        const aiEmotion = detectEmotion(data.text);
        
        // 更新最后一条 AI 消息
        setChatHistory(prev => [
          ...prev.slice(0, prev.length - 1),
          { 
            sender: 'ai', 
            text: data.text,
            emotion: aiEmotion as any
          }
        ]);
      } catch (error) {
        console.error('发送消息错误:', error);
        // 更新最后一条 AI 消息为错误信息
        setChatHistory(prev => [
          ...prev.slice(0, prev.length - 1),
          { 
            sender: 'ai', 
            text: '抱歉，我遇到了一些问题，无法回应您的消息。',
            emotion: 'sad'
          }
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
        const simulatedVoiceText = '我今天感觉有点不舒服';
        const userEmotion = detectEmotion(simulatedVoiceText);
        setChatHistory([...chatHistory, { 
          sender: 'user', 
          text: simulatedVoiceText,
          emotion: userEmotion as any
        }]);
        
        // 模拟AI响应
        setTimeout(() => {
          setChatHistory(prev => [...prev, { 
            sender: 'ai', 
            text: '您哪里不舒服？需要我帮您联系医生吗？',
            emotion: 'sad'
          }]);
        }, 1000);
      }, 1500);
    }
  };

  const handleTopicSelect = (topic: string) => {
    const userEmotion = detectEmotion(topic);
    setChatHistory([...chatHistory, { 
      sender: 'user', 
      text: topic,
      emotion: userEmotion as any
    }]);
    
    // 模拟AI响应
    setTimeout(() => {
      let response = '';
      let aiEmotion: 'happy' | 'sad' | 'neutral' | 'confused' = 'neutral';
      
      if (topic.includes('天气')) {
        response = '今天天气晴朗，温度适宜，非常适合户外活动！';
        aiEmotion = 'happy';
      } else if (topic.includes('不舒服')) {
        response = '您哪里不舒服？需要我帮您联系医生吗？';
        aiEmotion = 'sad';
      } else if (topic.includes('儿子') || topic.includes('家人')) {
        response = '好的，我可以帮您联系您的家人。您想给谁打电话？';
        aiEmotion = 'neutral';
      } else if (topic.includes('歌')) {
        response = '好的，您想听什么类型的歌曲？我可以为您播放一些轻松的音乐。';
        aiEmotion = 'happy';
      } else {
        response = `我理解您的意思了。您还有其他问题吗？`;
        aiEmotion = 'neutral';
      }
      
      setChatHistory(prev => [...prev, { 
        sender: 'ai', 
        text: response,
        emotion: aiEmotion
      }]);
    }, 1000);
  };

  // 获取表情图标
  const getEmotionIcon = (emotion?: 'happy' | 'sad' | 'neutral' | 'confused') => {
    switch (emotion) {
      case 'happy':
        return '😊';
      case 'sad':
        return '😢';
      case 'confused':
        return '😕';
      default:
        return '😐';
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-gray-50">
      <div className="flex-1 container mx-auto max-w-md bg-white shadow-sm overflow-hidden pb-16">
        {/* 头部 */}
        <header className="bg-blue-600 text-white p-4 flex items-center">
          <Link href="/" className="mr-2">
            <ArrowLeftIcon className="h-6 w-6" />
          </Link>
          <div>
            <h1 className="text-xl font-bold">智能聊天</h1>
            <p className="text-sm opacity-80">随时为您提供帮助</p>
          </div>
        </header>
        
        {/* 聊天历史 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[70vh]">
          {chatHistory.map((chat, index) => (
            <div 
              key={index} 
              className={`flex ${chat.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {chat.sender === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                  {getEmotionIcon(chat.emotion)}
                </div>
              )}
              <div 
                className={`max-w-[70%] p-3 rounded-lg ${
                  chat.sender === 'user' 
                    ? 'bg-blue-500 text-white rounded-br-none' 
                    : 'bg-gray-200 text-gray-800 rounded-bl-none'
                }`}
              >
                {chat.text}
              </div>
              {chat.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center ml-2">
                  {getEmotionIcon(chat.emotion)}
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* 话题建议栏 */}
        <div className="p-2 bg-gray-50 border-t border-gray-200">
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
        <div className="border-t border-gray-200 p-3 flex items-center bg-white">
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
      
      <NavigationBar />
    </main>
  );
} 