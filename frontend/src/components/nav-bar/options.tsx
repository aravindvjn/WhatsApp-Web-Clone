import { IoChatboxEllipses, IoPersonCircleSharp } from "react-icons/io5";
import { IoIosPeople } from "react-icons/io";
import { RiChatSmileAiLine } from "react-icons/ri";
import { GrEmptyCircle } from "react-icons/gr";
import { MdOutlineSettings } from "react-icons/md";
import { JSX } from "react";
import type { PageType } from "./nav-bar";

export const options: {
    name: PageType;
    icon: JSX.Element;
  }[] = [
    {
      name: "chats",
      icon: <IoChatboxEllipses className="translate-y-[1px]" size={22} />,
    },
    {
      name: "status",
      icon: <GrEmptyCircle size={22} />,
    },
    {
      name: "channel",
      icon: <RiChatSmileAiLine size={22} />,
    },
    {
      name: "community",
      icon: <IoIosPeople className="translate-y-[1px]" size={22} />,
    },
  ];
  
  export const bottomOptons: {
    name: PageType;
    icon: JSX.Element;
  }[] = [
    {
      name: "settings",
      icon: <MdOutlineSettings size={22} />,
    },
    {
      name: "profile",
      icon: <IoPersonCircleSharp size={22} />,
    },
  ];
  