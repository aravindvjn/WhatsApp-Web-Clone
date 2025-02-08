import React from "react";
import type { PageType } from "./nav-bar";

const PageOptions = ({
  children,
  name,
  selected,
  onClick,
}: {
  children: React.ReactNode;
  name: PageType;
  selected: PageType;
  onClick: (name: PageType) => void;
}) => {
  const selectedClass =
    "h-[42px] flex justify-center items-center w-[42px] rounded-full";

  return (
    <div
      onClick={() => onClick(name)}
      className={`${selectedClass} ${name === selected ? "bg-white/10" : ""}`}
    >
      {children}
    </div>
  );
};

export default PageOptions;
