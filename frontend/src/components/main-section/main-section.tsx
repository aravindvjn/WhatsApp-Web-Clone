import ChatMainScreen from "../chat-screen/primary/chat-main-screen";

import type { PageType } from "../nav-bar/nav-bar";

const MainSection = ({ page }: { page: PageType }) => {
  let activePage;

  switch (page) {
    case "chats":
      activePage = <ChatMainScreen />;
      break;
    case "profile":
      activePage = <div>Profile Page</div>;
      break;
    default:
      activePage = <div>Unknown Page</div>;
      break;
  }

  return <div className="w-full flex flex-col sm:w-[500px] md:w-[550px] lg:w-[600px]  border-r border-white/10">{activePage}</div>;
};

export default MainSection;
