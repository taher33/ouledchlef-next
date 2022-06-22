import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
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
  const router = useRouter();
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

  useEffect(() => {
    const handleSocket = (error: string, success: string, users?: User[]) => {
      if (error || !users) return console.log(error);
      setUsers(users);
    };
    if (!props.user) return;

    const payload = {
      id: props.user.id,
    };

    socket.send("chat:get users", payload, handleSocket);
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
    <div className="flex">
      <div className="h-screen overflow-scroll">
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
        <form className="absolute bottom-5 flex">
          <input type="text" className="border border-slate-500" />
          <button type="submit" className="bg-cyan-500 px-2 py-1 rounded-sm">
            send
          </button>
        </form>
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
