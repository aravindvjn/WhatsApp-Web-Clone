import React from "react";
import Text from "../../ui/text";
import SingleStory from "./single-story";
import {
  StatusResultsType,
  StatusType,
  useStatus,
} from "../../hooks/useStatus";

const RecentStories = ({ statuses }: { statuses: StatusResultsType[] }) => {
  return (
    <div>
      <Text type="p" fontWeight="light" className="px-[12px] text-green py-3">
        RECENT
      </Text>
      {statuses?.map((status: StatusResultsType, index: number) => {
        return (
          <SingleStory
            key={index}
            {...status.statuses[status.statuses.length - 1]}
            statuses={status.statuses}
          />
        );
      })}
    </div>
  );
};

export default RecentStories;
