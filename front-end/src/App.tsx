import React, { useState } from "react";
import { JoinChat } from "./components/join-chat.component";
import { MainChat } from "./components/main-chat.component";





const App = () => {
  const [isShowJoiningChat, setIsShowJoiningChat] = useState(true);
  const [user, setUser] = useState<{ username: string }>();
  const [messages, setMessages] = useState<string[]>([]);

  const handleOnJoining = (username: string) => {
    setUser({ username });
    setIsShowJoiningChat(false);
  };

  return (
    <div>
      {isShowJoiningChat ? (
        <JoinChat onJoining={handleOnJoining} />
      ) : (
        <MainChat user={user} />
      )}
    </div>
  );
};

export default App;
