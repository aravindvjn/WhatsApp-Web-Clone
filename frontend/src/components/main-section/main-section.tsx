import ChatMainScreen from "../chat-screen/primary/chat-main-screen";

import type { PageType } from "../nav-bar/nav-bar";
import ProfileScreen from "../profile-screen/profile-screen";

const MainSection = ({ page }: { page: PageType }) => {
  let activePage;

  switch (page) {
    case "chats":
      activePage = <ChatMainScreen />;
      break;
    case "profile":
      activePage = <ProfileScreen />;
      break;
    default:
      activePage = <div>Unknown Page</div>;
      break;
  }

  return (
    <div className="w-full flex flex-col sm:w-[550px] md:w-[575px] lg:w-[600px]  border-r border-border">
      {activePage}
    </div>
  );
};

export default MainSection;
