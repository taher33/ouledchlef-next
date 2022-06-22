import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import Input from "../components/Input";
import { useAppContext } from "../utils/context";

interface FormData {
  email: string;
  password: string;
}

const Login: NextPage = () => {
  const { setUser } = useAppContext();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const { mutate, isLoading, isError } = useMutation(
    async (data: FormData) => {
      const resp = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(data),
      });

      return resp.json();
    },
    {
      onSuccess(data) {
        setUser(data.user);
        router.push("/");
      },
      onError(error) {
        console.log("error", error);
      },
    }
  );

  function onSubmit(data: any) {
    mutate(data);
  }

  return (
    <div className="flex justify-center mx-auto mt-16">
      <form className="block" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="font-bold text-center mb-4 text-3xl">welcome back</h1>
        <Input errors={errors} register={register} type="email" />
        <Input errors={errors} register={register} type="password" />

        <button
          disabled={isSubmitting}
          className="bg-cyan-400 px-6 py-2 mt-4 rounded-lg font-medium w-full "
          type="submit"
        >
          {isSubmitting ? "Submitting" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ res, req }) => {
  if (req.cookies.token && process.env.NODE_ENV === "production") {
    res.writeHead(302, {
      Location: "/",
    });
    res.end();
  }

  return { props: {} };
};

export default Login;
