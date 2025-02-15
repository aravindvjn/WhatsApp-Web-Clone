import Text from "../../ui/text";
import SingleStory from "./single-story";
import { StatusResultsType } from "../../hooks/useStatus";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const RecentStories = ({
  statuses,
  isLoading,
}: {
  statuses: StatusResultsType[];
  isLoading: boolean;
}) => {

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
       {isLoading && (
        <AiOutlineLoading3Quarters className="animate-spin opacity-50 mx-auto mt-5" />
      )}
    </div>
  );
};

export default RecentStories;
