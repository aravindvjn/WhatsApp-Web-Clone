import Header from "./header";
import MyStatus from "./my-status";
import RecentStories from "./recents";
import { StatusResultsType, useStatus } from "../../hooks/useStatus";
import { useCurrentUser } from "../../hooks/useCurrentUser";

const StatusPage = () => {
  const { data: statuses, isLoading } = useStatus();
  const { data: currentUser } = useCurrentUser();

  let yourStatuses: StatusResultsType[] = [];
  let otherStatuses: StatusResultsType[] = [];

  // Separate your and other user's statuses
  if (statuses?.length) {
    statuses.forEach((status) => {
      if (status.userId === currentUser?._id) {
        yourStatuses.push(status);
      } else {
        otherStatuses.push(status);
      }
    });
  }

  return (
    <div>
      <Header />
      <MyStatus statuses={yourStatuses[0] || {}} />
      <RecentStories isLoading={isLoading} statuses={otherStatuses || []} />
    </div>
  );
};

export default StatusPage;
