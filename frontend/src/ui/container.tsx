import { ReactNode, HTMLAttributes } from "react";
import classNames from "classnames";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className, ...props }: ContainerProps) => {
  return (
    <div 
      className={classNames("", className)} 
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
