import Text from "../../../ui/text";
import { MdAccountCircle } from "react-icons/md";

const SingleChat = () => {
  return (
    <div className="flex items-center px-[10px] gap-[10px] hover:bg-secondary cursor-pointer">
      <MdAccountCircle size={40} />{" "}
      <div className="flex py-[15px] w-full border-b border-white/10 gap-[10px] justify-between">
        <div>
          <Text fontWeight="semibold" className="line-clamp-1">Aravind</Text>
          <p className="text-[11px] line-clamp-1 opacity-55">Hello Man</p>
        </div>
        <p className="text-[10px] opacity-55 pr-[5px]">Yesterday</p>
      </div>
    </div>
  );
};

export default SingleChat;
