import { useState } from "react";
import NavBar, { PageType } from "../components/nav-bar/nav-bar";
import MainSection from "../components/main-section/main-section";
import SecondarySection from "../components/secondary-section/secondary-section";

const HomePage = () => {
  const [page, setPage] = useState<PageType>("chats");

  return (
    <div className="flex">
      <NavBar setPage={setPage} page={page} />
      <MainSection page={page} />
      <SecondarySection page={page} />
    </div>
  );
};

export default HomePage;
