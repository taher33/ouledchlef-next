import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { useAppContext } from "../utils/context";

interface Props {
  user: {
    id: string;
    name: string;
  } | null;
}

function MessageForm({ user }: Props) {
  const { socket } = useAppContext();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<{ message: string }>();

  const onSubmit = (data: { message: string }) => {
    const payload = {
      message: data.message,
      sender: user?.id,
      reciever: router.query.id,
    };

    socket.emit("chat:send message", payload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="absolute bottom-5 flex">
      <input
        {...register("message", { required: true })}
        type="text"
        className="border border-slate-500"
      />
      <button
        type="submit"
        disabled={!!errors.message || !router.query.id}
        className="bg-cyan-500 px-2 py-1 rounded-sm"
      >
        send
      </button>
    </form>
  );
}

export default MessageForm;
