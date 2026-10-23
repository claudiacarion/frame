"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Login } from "@/actions/login-action";
import { loginSchema } from "@/actions/schemas";
import ErrorMessage from "@/components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglass, faRightToBracket } from "@fortawesome/free-solid-svg-icons";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { mutate, error, isPending } = useMutation({
    mutationFn: Login,
  });

  return (
    <div className="bg-apricot rounded-4xl p-8 w-full lg:w-1/3 mx-auto">
      <h1 className="text-center text-lg">log in</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(values => mutate(values))}>
        <label htmlFor="email">email</label>
        <input {...register("email")} placeholder="email" className="bg-white text-black py-2 px-4 rounded-4xl" />
        {errors.email && <ErrorMessage error={errors.email.message!.toLowerCase()} />}

        <label htmlFor="password">password</label>
        <input
          {...register("password")}
          placeholder="password"
          type="password"
          className="bg-white text-black py-2 px-4 rounded-4xl"
        />
        {errors.password && <ErrorMessage error={errors.password.message!.toLowerCase()} />}

        <button className="button-primary w-fit mx-auto">
          {isPending ? <FontAwesomeIcon icon={faHourglass} /> : <FontAwesomeIcon icon={faRightToBracket} />}
        </button>
        {error && <ErrorMessage error={error.message.toLowerCase()} />}
      </form>
    </div>
  );
};

export default LoginForm;
