import React from "react";
import Header from "./header";
import MyStatus from "./my-status";
import RecentStories from "./recents";
import { useStatus } from "../../hooks/useStatus";

const StatusPage = () => {
  const { data } = useStatus();
  return (
    <div>
      <Header />
      <MyStatus />
      <RecentStories statuses={data || []} />
    </div>
  );
};

export default StatusPage;
