import React, { useState } from "react";
import ChatSidebar from "./components/ChatSidebar";
import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";

const App = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [conversations, setConversations] = useState({
    johnDoe: [
      { sender: "user", text: "Hi John, how are you?", timestamp: "10:00 AM" },
      { sender: "johnDoe", text: "Hey! I'm doing great. You?", timestamp: "10:02 AM" },
    ],
    janeSmith: [
      { sender: "janeSmith", text: "Hi! Ready for the meeting?", timestamp: "9:30 AM" },
    ],
  });

  const recentChats = [
    { id: "johnDoe", name: "John Doe" },
    { id: "janeSmith", name: "Jane Smith" },
  ];

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    const newMessage = {
      sender: "user",
      text: messageInput,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setConversations((prev) => ({
      ...prev,
      [selectedChat]: [...(prev[selectedChat] || []), newMessage],
    }));

    setMessageInput("");
  };

  return (
    <div className="flex h-screen">
      <ChatSidebar
        recentChats={recentChats}
        selectedChat={selectedChat}
        onSelectChat={setSelectedChat}
      />
      <div className="flex flex-col w-3/4">
        {selectedChat ? (
          <>
            <ChatWindow
              selectedChat={selectedChat}
              conversations={conversations}
              recentChats={recentChats}
            />
            <MessageInput
              messageInput={messageInput}
              onMessageChange={setMessageInput}
              onSendMessage={handleSendMessage}
            />
          </>
        ) : (
          <div className="flex items-center justify-center flex-1">
            <p className="text-gray-500">Select a chat to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
