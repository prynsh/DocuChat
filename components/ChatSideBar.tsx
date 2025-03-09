// "use client";
// import { DrizzleChat } from "@/lib/db/schema";
// import Link from "next/link";
// import React from "react";
// import { Button } from "./ui/button";
// import { MessageCircle, PlusCircle } from "lucide-react";
// import { cn } from "@/lib/utils";

// type Props = {
//   chats: DrizzleChat[];
//   chatId: number;
// };

// const ChatSideBar = ({ chats, chatId }: Props) => {
//   const [loading, setLoading] = React.useState(false);

//   return (
//     <div className="w-full max-h-screen overflow-scroll soff p-4 text-gray-200 bg-gray-900">
//       <Link href="/dashboard">
//         <Button className="w-full border-dashed border-white border">
//           <PlusCircle className="mr-2 w-4 h-4" />
//           New Chat
//         </Button>
//       </Link>

//       <div className="flex max-h-screen overflow-scroll pb-20 flex-col gap-2 mt-4">
//         {chats.map((chat) => (
//           <Link key={chat.id} href={`/chat/${chat.id}`}>
//             <div
//               className={cn("rounded-lg p-3 text-slate-300 flex items-center", {
//                 "bg-blue-600 text-white": chat.id === chatId,
//                 "hover:text-white": chat.id !== chatId,
//               })}
//             >
//               <MessageCircle className="mr-2" />
//               <p className="w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis">
//                 {chat.pdfName}
//               </p>
//             </div>
//           </Link>
//         ))}
//       </div>

   
//     </div>
//   );
// };

// export default ChatSideBar;


"use client";
import { DrizzleChat } from "@/lib/db/schema";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { MessageCircle, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  chats: DrizzleChat[];
  chatId: number;
};

const ChatSideBar = ({ chats, chatId }: Props) => {
  return (
    <div className="w-full h-screen flex flex-col bg-gray-900 text-gray-200 p-4">
      {/* New Chat Button */}
      <Link href="/dashboard">
        <Button className="w-full border-dashed border-white border">
          <PlusCircle className="mr-2 w-4 h-4" />
          New Chat
        </Button>
      </Link>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto mt-4">
        {chats.map((chat) => (
          <Link key={chat.id} href={`/chat/${chat.id}`}>
            <div
              className={cn(
                "rounded-lg p-3 text-slate-300 flex items-center cursor-pointer",
                {
                  "bg-blue-600 text-white": chat.id === chatId,
                  "hover:text-white": chat.id !== chatId,
                }
              )}
            >
              <MessageCircle className="mr-2" />
              <p className="w-full truncate text-sm">{chat.pdfName}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChatSideBar;
