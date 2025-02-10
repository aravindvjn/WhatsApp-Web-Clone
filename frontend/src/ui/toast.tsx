import toast from "react-hot-toast";
import ProfileSvg from "./profilesvg";
import { motion } from "framer-motion";
const Toast = ({
  profilePic,
  displayName,
  username,
  message,
  t,
}: {
  profilePic: string;
  displayName?: string;
  username: string;
  message: string;
  t: any;
}) => {
  return (
    <motion.div
      initial={{ translateY: "-100%" }}
      animate={{ translateY: t.visible ? "0%" : "-200%" }}
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            {profilePic ? (
              <img className="h-10 w-10 rounded-full" src={profilePic} alt="" />
            ) : (
              <ProfileSvg size={40} />
            )}
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">
              {displayName || username}
            </p>
            <p className="mt-1 line-clamp-2 text-sm text-gray-500">{message}</p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Close
        </button>
      </div>
    </motion.div>
  );
};

export default Toast;
