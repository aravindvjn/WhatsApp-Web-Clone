import { HTMLAttributes, ReactNode } from "react";
import classNames from "classnames";

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
  type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
  fontWeight?:
    | "thin"
    | "extralight"
    | "light"
    | "normal"
    | "medium"
    | "semibold"
    | "bold"
    | "extrabold"
    | "black";
}

const Text = ({
  children,
  type = "p",
  fontWeight = "normal",
  className,
  ...props
}: TextProps) => {
  const textSize: Record<string, string> = {
    h1: "text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px]",
    h2: "text-[22px] sm:text-[24px] md:text-[26px] lg:text-[28px]",
    h3: "text-[20px] sm:text-[22px] md:text-[24px] lg:text-[26px]",
    h4: "text-[18px] sm:text-[19px] md:text-[20px] lg:text-[21px]",
    h5: "text-[16px] sm:text-[17px] md:text-[18px] lg:text-[19px]",
    h6: "text-[14px] sm:text-[15px] md:text-[16px] lg:text-[17px]",
    p: "text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px]",
  };

  const fontWeightClasses: Record<string, string> = {
    thin: "font-thin",
    extralight: "font-extralight",
    light: "font-light",
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
    extrabold: "font-extrabold",
    black: "font-black",
  };

  return (
    <p
      className={classNames(
        textSize[type],
        fontWeightClasses[fontWeight],
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
};

export default Text;
