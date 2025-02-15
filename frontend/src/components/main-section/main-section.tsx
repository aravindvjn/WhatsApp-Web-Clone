import { IoAddCircleOutline } from "react-icons/io5";
import CallScreen from "../call-screen/call-screen";
import ChannelScreen from "../channel-screen/channel-screen";
import ChatMainScreen from "../chat-screen/primary/chat-main-screen";

import type { PageType } from "../nav-bar/nav-bar";
import ProfileScreen from "../profile-screen/profile-screen";
import SettingsScreen from "../settings-screen/settings-screen";
import StatusPage from "../status-page/status-page";
import { IoMdAdd } from "react-icons/io";
import { Dispatch, SetStateAction } from "react";
import AddFriendScreen from "../add-friend-screen/add-friend-screen";

const MainSection = ({
  page,
  setPage,
}: {
  page: PageType;
  setPage: Dispatch<SetStateAction<PageType>>;
}) => {
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
    case "settings":
      activePage = <SettingsScreen />;
      break;
    case "status":
      activePage = <StatusPage />;
      break;
    case "add-friend":
      activePage = <AddFriendScreen setPage={setPage} />;
      break;
    default:
      activePage = <div />;
      break;
  }

  const handleAddUserPage = () => {
    setPage("add-friend");
  };

  const renderAddUser = () => {
    if (page === "chats") {
      return (
        <button
          onClick={handleAddUserPage}
          className="absolute bottom-5 right-5 rounded-full center bg-blue-600 h-10 w-10 hover:bg-blue-800"
        >
          <IoMdAdd size={30} />
        </button>
      );
    }
  };
  return (
    <div className="w-full flex flex-col sm:w-[550px] md:w-[575px] lg:w-[600px]  border-r border-border relative">
      {activePage}
      {renderAddUser()}
    </div>
  );
};

export default MainSection;
