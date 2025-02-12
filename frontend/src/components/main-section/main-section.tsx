import CallScreen from "../call-screen/call-screen";
import ChannelScreen from "../channel-screen/channel-screen";
import ChatMainScreen from "../chat-screen/primary/chat-main-screen";

import type { PageType } from "../nav-bar/nav-bar";
import ProfileScreen from "../profile-screen/profile-screen";
import StatusPage from "../status-page/status-page";

const MainSection = ({ page }: { page: PageType }) => {
  let activePage;

  switch (page) {
    case "chats":
      activePage = <ChatMainScreen />;
      break;
    case "profile":
      activePage = <ProfileScreen />;
      break;
    case "channel":
      activePage = <ChannelScreen />;
      break;
    case "calls":
      activePage = <CallScreen />;
      break;
    case "status":
      activePage = <StatusPage />;
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
