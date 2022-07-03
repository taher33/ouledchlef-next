import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

type Props = {
  register: UseFormRegister<FieldValues>;
  errors: {
    [x: string]: any;
  };
  type: string;
};

function Input({ register, errors, type }: Props) {
  let validateOptions: any = {
    required: { value: true, message: "field is required" },
  };

  switch (type) {
    case "email":
      validateOptions = {
        ...validateOptions,
        pattern: {
          value: /^\S+@\S+\.\S+$/,
          message: "please use a valid email",
        },
      };
      break;
    case "password":
      validateOptions = {
        ...validateOptions,
        minLength: {
          value: 6,
          message: "password must be at least 6 characters",
        },
      };

      break;
  }

  return (
    <>
      <label htmlFor={type}>{type}</label>
      <div className="w-full flex flex-col">
        <input
          className={`border rounded-md border-solid px-2 py-1 border-slate-400 focus:outline-cyan-200 mt-2 ${
            errors[type] && "border-red-300 focus:outline-red-300"
          } `}
          type={type}
          {...register(type, {
            valueAsNumber: true,
          })}
        />
        <span className="text-red-500 w-full whitespace-pre">
          {errors[type] && errors[type].message}
        </span>
      </div>
    </>
  );
}

export default Input;
