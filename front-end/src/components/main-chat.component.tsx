import React, { useEffect, useState } from "react";
import { socket } from "../helpers/socket.helper";
import { SOCKET_ACTIONS } from "../constants/socket.constant";

export const MainChat = ({ user }: { user?: { username: string } }) => {
  const [members, setMembers] = useState<any[]>([]);
  const [sendContentMessage, setSendContentMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  useEffect(() => {
    socket.on(SOCKET_ACTIONS.GET_ALL_ONLINE_MEMBERS, (data) => {
      setMembers(data);
    });
    socket.on(SOCKET_ACTIONS.CHAT, (data) => {
      setMessages((messages) => [...messages, data]);
    });
  }, []);
  const handleSendMessage = () => {
    if (!sendContentMessage) return;
    socket.emit(SOCKET_ACTIONS.CHAT, {
      sender: user?.username,
      message: sendContentMessage,
    });
    setSendContentMessage("");
  };

  return (
    <div>
      <div style={{ width: "100%", height: "50px", background: "blue" }}></div>
      <div
        style={{
          display: "flex",
          gap: "50px",
          justifyContent: "center",
          width: "80vw",
          margin: "20px 40px",
        }}
      >
        <div style={{ width: "80vw" }}>
          <h1>Hội thánh đức chúa trời 😱</h1>
          {socket.id}
          {messages?.map((item: any) => (
            <li style={{ listStyleType: 'none', margin: '20px 0'}}>
              <div style={{display: 'flex'}}>
              {item.sender}<span  style={{backgroundColor: '#1616eb', width:'100%', marginLeft: '20px' , color: 'white', padding: "10px", borderRadius: '10px'}}> {item.message}</span>
              </div>
            </li>
          ))}
          <hr />
          <div style={{display: 'flex', gap: '5px'}}>
          <textarea
            placeholder="Enter some chat"
            value={sendContentMessage}
            onChange={(e) => setSendContentMessage(e.target.value)}
          />
          <br />
          <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>

        <div style={{borderLeft: '1px solid gray', paddingLeft: '30px'}}>
          <h2>Online Members</h2>
          {members.map((member: any) => (
            <li>{member?.username}</li>
          ))}
        </div>
      </div>
    </div>
  );
};
