import ChatSecondaryScreen from "../chat-screen/secondary/chat-secondary-screen";
import type { PageType } from "../nav-bar/nav-bar";

const SecondarySection = ({ page }: { page: PageType }) => {
  let activePage;

  switch (page) {
    case "chats":
      activePage = <ChatSecondaryScreen />;
      break;
    case "profile":
      activePage = <div>Profile Page</div>;
      break;
    default:
      activePage = <div>Unknown Page</div>;
      break;
  }

  return (
    <div className="hidden sm:flex sm:w-full bg-primary">{activePage}</div>
  );
};

export default SecondarySection;
