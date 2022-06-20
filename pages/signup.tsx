import { NextPage } from "next";
import type { GetServerSideProps } from "next";
import React from "react";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";
import Input from "../components/Input";

interface FormData {
  email: string;
  password: string;
  name: string;
}

const Signup: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const { mutate, isLoading, isError } = useMutation(
    async (data: FormData) => {
      const resp = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify(data),
      });

      return resp.json();
    },
    {
      onSuccess(data, variables, context) {
        console.log("success", data);
      },
      onError(error, variables, context) {
        console.log("error", error);
      },
    }
  );

  function onSubmit(data: any) {
    mutate(data);
  }

  return (
    <div className="flex justify-center mt-16 ">
      <form className="block" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="font-bold text-center mb-3 text-3xl">
          create your acount
        </h1>
        <Input errors={errors} register={register} type="name" />
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

export default Signup;
