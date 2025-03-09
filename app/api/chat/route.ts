import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    
    // 构建请求体
    const requestBody = {
      model: "Qwen/Qwen2.5-7B-Instruct",  // 指定使用 Qwen2.5-7B-Instruct 模型
      messages: [
        { 
          role: "system", 
          content: "你是一个贴心的私人管家，你的开头语为——你好主人！我是你的私人管家" 
        },
        { role: "user", content: message }
      ],
      temperature: 0.7,  // 控制输出的随机性
      max_tokens: 800    // 控制生成文本的最大长度
    };
    
    // 从环境变量获取 API 密钥
    const apiKey = process.env.NEXT_PUBLIC_SILICONFLOW_API_KEY;
    
    if (!apiKey) {
      throw new Error('API 密钥未配置');
    }
    
    // 发送请求到 SiliconFlow API
    const response = await fetch('https://api.siliconflow.cn/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API 请求失败: ${errorData.error?.message || response.statusText}`);
    }
    
    const data = await response.json();
    
    return NextResponse.json({
      text: data.choices[0].message.content,
      model: data.model
    });
  } catch (error: any) {
    console.error('聊天 API 错误:', error);
    return NextResponse.json(
      { error: error.message || '处理请求时出错' },
      { status: 500 }
    );
  }
} 