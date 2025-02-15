import { BsLockFill } from "react-icons/bs";
import { FaWhatsapp } from "react-icons/fa6";

const LoadingScreen = () => {
  return (
    <div className="center animate-pulse h-dvh">
      <div className="center flex-col gap-2">
        <FaWhatsapp className="opacity-40" size={60} />
        <p>WhatsApp</p>
        <p className="flex items-center opacity-50 gap-1 text-[12px]"><BsLockFill /> End to End Encryption</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
