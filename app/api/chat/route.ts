import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export async function POST(req: Request) {
    try {
      const { messages } = await req.json();
  
      const model = google('gemini-1.5-pro-latest',{
      });
  
      const result = await streamText({
        model,
        messages,
      });

      return new Response(result.toDataStream(), {
        status: 200,
        headers: {
            'Content-Type': 'text/event-stream', // Required for streaming
        }
    });
    } catch (error) {
      console.error('Error:', error);
      return new Response(JSON.stringify({ error: 'Something went wrong' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }
  