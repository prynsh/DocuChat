import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export async function POST(req: Request) {
    try {
      const { messages } = await req.json();
  
      // Initialize the Google Generative AI model
      const model = google('gemini-1.5-pro-latest',{
      });
  
      // Stream the text response
      const result = await generateText({
        model,
        messages,
      });
      console.log(result)
    //   return new Response(JSON.stringify(result.text))
      return new Response(JSON.stringify({
        messages: [...messages, { id: Date.now().toString(), role: "assistant", content: result.text }]
    }))
    } catch (error) {
      console.error('Error:', error);
      return new Response(JSON.stringify({ error: 'Something went wrong' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }
  