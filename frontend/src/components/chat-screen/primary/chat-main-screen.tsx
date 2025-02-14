import React from "react";
import ChatHeader from "./header";
import SearchInput from "./search-input";
import ChatList from "./chat-list";

const ChatMainScreen = () => {
  
  return (
    <div className="h-dvh scrollbar-hide">

      <ChatHeader />

      <SearchInput />

      <ChatList/>

    </div>
  );
};

export default ChatMainScreen;
