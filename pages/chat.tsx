import { type } from "os";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../utils/context";
import { useSubscribe } from "../utils/socket";

type User = {
  id: string;
  name: string;
};

function Chat() {
  const [messages, setMessages] = useState<string[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const { socket, user } = useAppContext();

  useEffect(() => {
    const handleSocket = (error: string, success: string) => {
      console.log(error, success);
    };
    const payload = {
      name: "user" + Math.floor(Math.random() * 100),
    };
    socket.emit("chat:new user", payload, handleSocket);
  }, []);

  function recieveMsg(msg: string) {
    console.log(msg, "msg change");
  }

  const handleNewUser = (user: User) => {
    setUsers([...users, user]);
  };

  useSubscribe({
    event: "chat:message",
    callback: recieveMsg,
    socket: socket!,
  });

  useSubscribe({
    event: "chat:new user",
    callback: handleNewUser,
    socket: socket!,
  });

  return (
    <div>
      <ul>
        {users.map((user: User) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Chat;
