import { useEffect, useState } from "react";
import NavBar, { PageType } from "../components/nav-bar/nav-bar";
import MainSection from "../components/main-section/main-section";
import SecondarySection from "../components/secondary-section/secondary-section";
import { useSocket } from "../utils/socket/socket";

const HomePage = () => {
  const [page, setPage] = useState<PageType>("chats");
  const [status, setStatus] = useState<boolean>(false);
  const { socket } = useSocket();

  useEffect(() => {
    if (!status) {
      socket?.emit("online");
      setStatus(true);
    }
  }, [socket]);

  return (
    <div className="flex h-dvh overflow-hidden">
      <NavBar setPage={setPage} page={page} />
      <MainSection page={page} />
      <SecondarySection page={page} />
    </div>
  );
};

export default HomePage;
