import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useRef,
} from "react";
import { StatusType } from "../../hooks/useStatus";
import { createPortal } from "react-dom";
import { getImageUrl } from "../../utils/helper/getImageUrl";
import { GrNext, GrPrevious } from "react-icons/gr";
import { IoClose } from "react-icons/io5";

const DetailedStatus = ({
  statuses,
  setShowStatus,
}: {
  statuses: StatusType[];
  setShowStatus: Dispatch<SetStateAction<boolean>>;
}) => {
  
  const [statusIndex, setStatusIndex] = useState(0);
  const [statusProgress, setStatusProgress] = useState(0);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const length = statuses.length || 0;
  const buttonClasses =
    "w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm center";

  const handleNextnPrevious = (next: boolean) => {
    setStatusIndex((prev) => {
      const newIndex = next ? prev + 1 : prev - 1;
      if (newIndex >= length) {
        setShowStatus(false);
        return prev;
      }
      return newIndex >= 0 ? newIndex : prev;
    });
  };

  useEffect(() => {
    setStatusProgress(0);
    if (progressInterval.current) clearInterval(progressInterval.current);

    progressInterval.current = setInterval(() => {
      setStatusProgress((prev) => {
        if (prev >= 100) {
          handleNextnPrevious(true);
          return 0;
        }
        return prev + 0.5;
      });
    }, 50);

    return () => clearInterval(progressInterval.current as NodeJS.Timeout);
  }, [statusIndex]);

  return createPortal(
    <div
      onClick={(e) => e.stopPropagation()}
      className="fixed inset-0 z-10 flex items-center justify-center w-full h-full bg-black/60 backdrop-blur-sm"
    >
      <button
        onClick={() => setShowStatus(false)}
        className="absolute top-4 right-4 flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/20"
      >
        <IoClose size={30} />
      </button>

      <div
        onClick={() => {
          clearInterval(progressInterval.current as NodeJS.Timeout);
        }}
        key={statuses[statusIndex]._id}
        style={{
          backgroundImage: `url(${getImageUrl(
            statuses[statusIndex].mediaUrl
          )})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="relative h-full aspect-[9/16] rounded shadow-lg"
      >
        <div className="absolute top-0 flex items-center w-full h-1 gap-1 px-2 mt-1">
          {statuses.map((_, index) => (
            <div
              key={index}
              className="relative flex items-center w-full h-full bg-white/40 rounded-full"
            >
              {statusIndex === index && (
                <div
                  style={{ width: `${statusProgress}%` }}
                  className="absolute left-0 h-full bg-white rounded-full"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute flex items-center justify-between w-full px-8">
        <button
          onClick={() => handleNextnPrevious(false)}
          className={buttonClasses}
        >
          <GrPrevious size={20} />
        </button>
        <button
          onClick={() => handleNextnPrevious(true)}
          className={buttonClasses}
        >
          <GrNext size={20} />
        </button>
      </div>
    </div>,
    document.body
  );
};

export default DetailedStatus;
