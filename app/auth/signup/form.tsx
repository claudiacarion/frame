"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUp } from "@/actions/signup-action";
import { signUpSchema } from "@/actions/schemas";
import ErrorMessage from "@/components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const { mutate, error, isPending } = useMutation({
    mutationFn: SignUp,
  });

  return (
    <div className="border w-1/3 mx-auto">
      <h2>Sign Up Form!</h2>
      <form className=" flex flex-col" onSubmit={handleSubmit(values => mutate(values))}>
        <label htmlFor="username">Enter a username</label>
        <input {...register("username")} placeholder="username" />
        {errors.username && <ErrorMessage error={errors.username.message!} />}

        <label htmlFor="email">Enter your email</label>
        <input {...register("email")} placeholder="email" />
        {errors.email && <ErrorMessage error={errors.email.message!} />}

        <label htmlFor="password">Enter a password</label>
        <input {...register("password")} placeholder="password" type="password" />
        {errors.password && <ErrorMessage error={errors.password.message!} />}

        <button>{isPending ? "Loading..." : "Submit"}</button>
        {error && <ErrorMessage error={error.message} />}
      </form>
    </div>
  );
};

export default SignUpForm;
