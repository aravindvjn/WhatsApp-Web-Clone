import { useEffect, useState } from "react";
import NavBar, { PageType } from "../components/nav-bar/nav-bar";
import MainSection from "../components/main-section/main-section";
import SecondarySection from "../components/secondary-section/secondary-section";
import { useSocket } from "../utils/socket/socket";
import { useOnlineUsers } from "../hooks/useOnlineUsers";

const HomePage = () => {
  const [page, setPage] = useState<PageType>("chats");
  const [status, setStatus] = useState<boolean>(false);
  const { socket } = useSocket();
  const { updateOnlineUsers } = useOnlineUsers();

  useEffect(() => {
    if (!status && socket) {
      socket?.emit("online");
      setStatus(true);
    }

    socket?.on("onlineUsers", (users) => {
      updateOnlineUsers(users);
    });
  }, [socket]);

  return (
    <div className=" flex h-dvh overflow-hidden">
      <NavBar setPage={setPage} page={page} />
      <MainSection page={page} setPage={setPage} />
      <SecondarySection page={page} />
    </div>
  );
};

export default HomePage;
