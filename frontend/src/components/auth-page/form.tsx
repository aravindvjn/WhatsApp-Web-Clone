import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import Footer from "./footer";

export type InputType = {
  email: string;
  password: string;
  username?: string;
  isLogin?: boolean;
};

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [inputs, setInputs] = useState<InputType>({
    email: "",
    password: "",
    isLogin,
  });

  // useAuth hook to perform login or signup operation
  const { mutate: login, isPending, error } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({ ...inputs, isLogin });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="center text-primaryText flex-col gap-[12px] px-[20px] w-full max-w-[400px]"
    >
      {error && <p className="text-red-500 text-[12px]">{error.message}</p>}

      {!isLogin && (
        <input
          className="bg-secondary w-full focus:outline-none px-3 py-1.5 rounded placeholder:text-secondaryText"
          onChange={handleInputChange}
          value={inputs?.username}
          type="text"
          name="username"
          placeholder="Username"
        />
      )}

      <input
        className="bg-secondary w-full focus:outline-none px-3 py-1.5 rounded placeholder:text-secondaryText"
        onChange={handleInputChange}
        value={inputs?.email}
        type="email"
        name="email"
        placeholder="Email Address"
      />
      <input
        className="bg-secondary w-full focus:outline-none px-3 py-1.5 rounded placeholder:text-secondaryText"
        onChange={handleInputChange}
        value={inputs?.password}
        type="text"
        name="password"
        placeholder="Password"
      />
      <button
        className="bg-secondary text-white w-full px-3 py-2 rounded hover:bg-tertiary"
        type="submit"
      >
        {isPending ? "Logging in..." : "Login"}
      </button>

      <Footer setIsLogin={setIsLogin} isLogin={isLogin} />
    </form>
  );
};

export default AuthForm;
