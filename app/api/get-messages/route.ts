import { db } from "@/lib/db";
import { messages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";


export const POST = async (req: Request) => {
    try {
        const { chatId } = await req.json();
    
        const _messages = await db
          .select()
          .from(messages)
          .where(eq(messages.chatId, chatId));
    
        console.log("Fetched messages:", _messages);
    
        return NextResponse.json(_messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
        return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
      }
    };