import { io, Socket } from "socket.io-client";
import { useEffect, useState } from "react";

export const FirstConnection = () => {
  const socket = io("http://localhost:5000/");

  if (!socket) return;

  socket.on("connect", () => {});

  return socket;
};

type Data = {
  event: string;
  callback: (data: any) => void;
  socket: Socket;
};

export const useSubscribe = ({ event, callback, socket }: Data) => {
  let cursor = 0;
  socket.onAny(() => {
    cursor++;
  });

  useEffect(() => {
    socket.on(event, callback);

    return () => {
      socket.removeListener(event, callback);
    };
  }, [cursor]);
};
