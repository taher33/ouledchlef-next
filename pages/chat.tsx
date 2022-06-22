import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import MessageForm from "../components/messageForm";
import { useAppContext } from "../utils/context";
import { prisma } from "../utils/prisma";
import { useSubscribe } from "../utils/socket";

type User = {
  id: string;
  name: string;
};

interface Props {
  user: {
    email: string;
    id: string;
    name: string;
  } | null;
}

const Chat: NextPage<Props> = (props) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const { socket } = useAppContext();

  useEffect(() => {
    const handleSocket = (error: string, success: string) => {
      console.log(error, success);
    };
    if (!props.user) return;

    const payload = {
      name: props.user.name,
      id: props.user.id,
    };
    socket.emit("chat:new user", payload, handleSocket);
  }, []);

  useEffect(() => {
    const handleSocket = (error: string, success: string, users?: User[]) => {
      if (error || !users) return console.log(error);
      setUsers(users);
    };
    if (!props.user) return;

    const payload = {
      id: props.user.id,
    };

    socket.emit("chat:get users", payload, handleSocket);
  }, []);

  useSubscribe({
    event: "chat:recieve message",
    callback: (msg) => console.log("msg", msg),
    socket: socket!,
  });

  useSubscribe({
    event: "chat:new user",
    callback: (user) => setUsers([...users, user]),
    socket: socket!,
  });

  return (
    <div className="flex">
      <div className="h-screen overflow-scroll px-6">
        <h3 className="text-xl font-semibold ">chat users</h3>
        <ul>
          {users.map((user: User) => (
            <Link href={`?id=${user.id}`} key={user.id}>
              <li className="underline">{user.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="ml-4 font-bold relative">
        <h2 className="text-2xl">messages</h2>
        <div>
          {messages.map((msg: string, id: number) => (
            <p key={id}>{msg}</p>
          ))}
        </div>
        <MessageForm user={props.user} />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ res, req }) => {
  if (!req.cookies.token) {
    res.writeHead(302, {
      Location: "/login",
    });
    res.end();
  }
  const user = await prisma.user.findUnique({
    where: { id: req.cookies.token },
    select: { email: true, id: true, name: true },
  });

  if (!user) {
    res.writeHead(302, {
      Location: "/login",
    });
    res.end();
  }

  return {
    props: { user },
  };
};

export default Chat;
