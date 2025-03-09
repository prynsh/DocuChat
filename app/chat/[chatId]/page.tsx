
import ChatComponent from '@/components/ChatComponent';
import ChatSideBar from '@/components/ChatSideBar';
import { db } from '@/lib/db';
import { chats } from '@/lib/db/schema';
import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import React from 'react'

type Props={
    params:{
        chatId:string;
    }
};



const ChatPage = async ( { params : {  chatId } }:Props) => {
  const {userId} = await auth()
  if(!userId){
      redirect("/sign-in")
  }
  const _chats = await db.select().from(chats).where(eq(chats.userId, userId));
  if(!_chats){
      return redirect("/dashboard");
  }

  if(!_chats.find(chat=>chat.id === parseInt(chatId))){
    return redirect("/dashboard")
  }

  return (
      <div className="flex h-screen"> 
          {/* Sidebar */}
          <div className="w-1/4 h-full border-r border-gray-300 overflow-y-auto">
              <ChatSideBar chats={_chats} chatId={parseInt(chatId)} />
          </div>

          {/* PDF Viewer */}
          {/* <div className="flex-1 h-full overflow-y-auto p-4"> */}
              {/* <PDFViewer pdf_url={currentChat?.pdfUrl || ''}/> */}
          {/* </div> */}

          {/* Chat Section */}
          <div className="w-3/5 h-full border-l border-gray-300 overflow-y-auto">
              <ChatComponent chatId={parseInt(chatId)}/>
          </div>
      </div>
  );
};

export default ChatPage;
