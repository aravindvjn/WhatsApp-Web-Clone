import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import Footer from "./footer";
import SetProfilePic from "./set-profile-pic";
import { validateUserInputs } from "../../utils/validations/validate-user-inputs";

export type InputType = {
  email: string;
  password: string;
  username?: string;
  isLogin?: boolean;
  profilePic?: string;
  displayName?: string;
};

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [inputs, setInputs] = useState<InputType>({
    email: "",
    password: "",
    isLogin,
  });
  const [profile, setProfile] = useState<string>("");
  const [showPicOption, setShowPicOption] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string>("");

  // useAuth hook to perform login or signup operation
  const { mutate: login, isPending, error } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.name !== "displayName"
          ? e.target.value.trim()
          : e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidationError("");
    if (isLogin) {
      login({ ...inputs, isLogin });
    } else {
      const errors = validateUserInputs(inputs);
      if (errors) {
        setValidationError(errors);
        return;
      }
      setShowPicOption(true);
    }
  };

  const onSignup = () => {
    setShowPicOption(false);
    login({ ...inputs, isLogin: false, profilePic: profile });
  };

  const buttonClass =
    "bg-secondary text-white w-full px-3 py-2 rounded hover:bg-tertiary";

  if (showPicOption && !isLogin) {
    return (
      <div>
        <SetProfilePic profile={profile} setProfile={setProfile} />
        <input
          maxLength={30}
          className="bg-secondary my-2 w-full focus:outline-none px-3 py-1.5 rounded placeholder:text-secondaryText"
          onChange={handleInputChange}
          value={inputs?.displayName}
          type="text"
          name="name"
          placeholder="Enter your name..."
        />
        <button onClick={onSignup} className={buttonClass} type="submit">
          Register
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="center text-primaryText flex-col gap-[12px] px-[20px] w-full max-w-[400px]"
    >
      {error && <p className="text-red-500 text-[12px]">{error.message}</p>}
      {validationError && (
        <p className="text-red-500 text-[12px]">{validationError}</p>
      )}
      {!isLogin && (
        <input
          maxLength={15}
          min={3}
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
        minLength={8}
        className="bg-secondary w-full focus:outline-none px-3 py-1.5 rounded placeholder:text-secondaryText"
        onChange={handleInputChange}
        value={inputs?.password}
        type="text"
        name="password"
        placeholder="Password"
      />
      <button className={buttonClass} type="submit">
        {isLogin
          ? isPending
            ? "Logging in..."
            : "Login"
          : isPending
          ? "Registering..."
          : "Register"}
      </button>

      <Footer setIsLogin={setIsLogin} isLogin={isLogin} />
    </form>
  );
};

export default AuthForm;
