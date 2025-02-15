import React, { Dispatch, SetStateAction } from "react";

const Footer = ({
  isLogin,
  setIsLogin,
}: {
  isLogin: boolean;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
}) => {
  const content = !isLogin
    ? "Doesn't have an account? "
    : "Already have an account?";
  return (
    <div>
      <p className="flex gap-1">
        {content}
        <p
          className="underline cursor-pointer text-blue-500"
          onClick={() => setIsLogin((prev) => !prev)}
        >
          {isLogin ? "Sign Up" : "Sign In"}
        </p>
      </p>
    </div>
  );
};

export default Footer;
