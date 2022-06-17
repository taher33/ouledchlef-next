import { GetServerSideProps, NextPage } from "next";
import React, { useState } from "react";
import { Socket } from "socket.io-client";
import { FirstConnection, useSubscribe } from "../utils/socket";

interface User {
  name: string;
  email: string;
  isConnected: boolean;
}

interface Message {
  body: string;
  sender: string;
  reciver: string;
}

const socket = FirstConnection();

function Chat() {
  const [messages, setMessages] = useState<string[]>([]);
  const [users, setUsers] = useState<string[]>([]);

  function recieveMsg(msg: string) {
    console.log(msg, "msg change");
  }

  const handleNewUser = () => {};

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

  return <div>Chat</div>;
}

export default Chat;
