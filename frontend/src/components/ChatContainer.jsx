import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gradient-to-b from-white/50 to-slate-50/50 dark:from-slate-800/50 dark:to-slate-900/50">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-6 space-y-6 modern-scrollbar">
        {messages.map((message, index) => (
          <div
            key={message._id}
            className={`flex ${message.senderId === authUser._id ? "justify-end" : "justify-start"} group`}
            ref={messageEndRef}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={`flex items-end gap-3 max-w-[70%] ${message.senderId === authUser._id ? "flex-row-reverse" : "flex-row"}`}>
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="size-10 rounded-2xl overflow-hidden ring-2 ring-white/20 dark:ring-slate-600/30 group-hover:ring-primary/30 transition-all duration-300">
                  <img
                    src={
                      message.senderId === authUser._id
                        ? authUser.profilePic || "/avatar.png"
                        : selectedUser.profilePic || "/avatar.png"
                    }
                    alt="profile pic"
                    className="size-10 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>

              {/* Message Content */}
              <div className={`flex flex-col ${message.senderId === authUser._id ? "items-end" : "items-start"}`}>
                {/* Time */}
                <div className="text-xs text-slate-500 dark:text-slate-400 mb-1 px-2">
                  {formatMessageTime(message.createdAt)}
                </div>

                {/* Message Bubble */}
                <div className={`
                  message-bubble relative px-4 py-3 rounded-2xl shadow-lg
                  ${message.senderId === authUser._id 
                    ? "bg-gradient-to-br from-primary to-primary/80 text-white rounded-br-md" 
                    : "bg-white/80 dark:bg-slate-700/80 text-slate-800 dark:text-slate-200 rounded-bl-md border border-white/20 dark:border-slate-600/30"
                  }
                  group-hover:scale-[1.02] transition-all duration-300
                `}>
                  {message.image && (
                    <div className="mb-3 -mx-2 -mt-2">
                      <img
                        src={message.image}
                        alt="Attachment"
                        className="max-w-[250px] rounded-xl"
                      />
                    </div>
                  )}
                  {message.text && (
                    <p className="whitespace-pre-wrap break-words leading-relaxed">
                      {message.text}
                    </p>
                  )}
                  
                  {/* Message status indicator for sent messages */}
                  {message.senderId === authUser._id && (
                    <div className="absolute -bottom-1 -right-1 size-3 bg-white/20 rounded-full flex items-center justify-center">
                      <div className="size-1.5 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  );
};
export default ChatContainer;
