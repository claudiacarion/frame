"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUp } from "@/actions/signup-action";
import { signUpSchema } from "@/actions/schemas";
import ErrorMessage from "@/components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglassEnd, faRightToBracket } from "@fortawesome/free-solid-svg-icons";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const { mutate, error, isPending, data } = useMutation({
    mutationFn: SignUp,
  });

  return (
    <div className="bg-apricot rounded-4xl p-8 w-full lg:w-1/3 mx-auto">
      <h1 className="text-center text-lg">sign up</h1>
      <form className=" flex flex-col gap-4" onSubmit={handleSubmit(values => mutate(values))}>
        <label htmlFor="username">choose a username</label>
        <input {...register("username")} placeholder="username" className="bg-white text-black py-2 px-4 rounded-4xl" />
        {errors.username && <ErrorMessage error={errors.username.message!.toLowerCase()} />}
        <label htmlFor="email">enter your email</label>
        <input {...register("email")} placeholder="email" className="bg-white text-black py-2 px-4 rounded-4xl" />
        {errors.email && <ErrorMessage error={errors.email.message!.toLowerCase()} />}
        <label htmlFor="password">enter a password</label>
        <input
          {...register("password")}
          placeholder="password"
          type="password"
          className="bg-white text-black py-2 px-4 rounded-4xl"
        />
        {errors.password && <ErrorMessage error={errors.password.message!.toLowerCase()} />}
        <button className="button-primary w-fit mx-auto">
          {isPending ? <FontAwesomeIcon icon={faHourglassEnd} /> : <FontAwesomeIcon icon={faRightToBracket} />}
        </button>
        {data?.error && <ErrorMessage error={data.error} />}
        {error && <ErrorMessage error="something went wrong. please try again." />}{" "}
      </form>
    </div>
  );
};

export default SignUpForm;
