import React, { useState } from "react";
import { SOCKET_ACTIONS } from "../constants/socket.constant";
import { socket } from "../helpers/socket.helper";

export const JoinChat = ({
  onJoining,
}: {
  onJoining: (username: string) => void;
}) => {
  const [username, setUsername] = useState("");
  const handleLogin = () => {
    if (!username) return;
    onJoining(username);
    socket.emit(SOCKET_ACTIONS.JOIN_CHAT, {
      username,
    });
  };
  return (
    <div>
      <input value={username} onChange={(e) => setUsername(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};
