import { User } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import React, { useState } from "react";
import { Socket } from "socket.io-client";
import { useAppContext } from "../utils/context";
import { FirstConnection, useSubscribe } from "../utils/socket";

function Chat() {
  const [messages, setMessages] = useState<string[]>([]);
  const [users, setUsers] = useState<string[]>([]);

  const { socket, user } = useAppContext();

  function recieveMsg(msg: string) {
    console.log(msg, "msg change");
  }

  const handleNewUser = () => {
    console.log("new user");
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

  return <div>Chat</div>;
}

export default Chat;
