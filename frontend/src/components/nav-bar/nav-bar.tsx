import { Dispatch, SetStateAction } from "react";
import PageOptions from "./page-options";
import { bottomOptons, options } from "./options";

type NavBarProps = {
  setPage: Dispatch<SetStateAction<PageType>>;
  page: PageType;
};
export type PageType =
  | "chats"
  | "status"
  | "settings"
  | "profile"
  | "channel"
  | "calls";

const NavBar = ({ setPage, page }: NavBarProps) => {

  const handlePage = (name: PageType): void => {
    setPage(name);
  };

  const classes = "flex w-[65px] flex-col gap-2 items-center";

  const topNav = (
    <div className={classes}>
      {options.map((option) => (
        <PageOptions
          onClick={handlePage}
          name={option.name}
          key={option.name}
          selected={page}
        >
          {option.icon}
        </PageOptions>
      ))}
    </div>
  );

  const bottomNav = (
    <div className={classes}>
      {bottomOptons.map((option) => (
        <PageOptions
          onClick={handlePage}
          name={option.name}
          key={option.name}
          selected={page}
        >
          {option.icon}
        </PageOptions>
      ))}
    </div>
  );

  return (
    <div className="hidden min-h-dvh text-secondaryText py-3 sm:flex flex-col bg-tertiary w-[70px] items-center justify-between border-r border-white/10">
      {topNav}
      {bottomNav}
    </div>
  );
};

export default NavBar;
