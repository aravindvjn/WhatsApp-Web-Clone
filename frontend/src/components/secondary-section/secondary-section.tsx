import ChatSecondaryScreen from "../chat-screen/secondary/chat-secondary-screen";
import type { PageType } from "../nav-bar/nav-bar";

const SecondarySection = ({ page }: { page: PageType }) => {
  let activePage;

  activePage = <ChatSecondaryScreen />;
  return (
    <div className="hidden sm:flex sm:w-full bg-primary">{activePage}</div>
  );
};

export default SecondarySection;
