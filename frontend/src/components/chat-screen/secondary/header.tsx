import { MdAccountCircle } from "react-icons/md";
import Text from "../../../ui/text";
import { BiSearch } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaVideo } from "react-icons/fa";

const Header = () => {
  return (
    <div className="h-[60px] bg-secondary w-full absolute top-0 right-0 flex items-center px-[10px] gap-[10px]">
      <MdAccountCircle size={40} />{" "}
      <div className="flex py-[10px] w-full gap-[10px] justify-between items-center">
        <div>
          <Text fontWeight="semibold" className="line-clamp-1">
            Aravind
          </Text>
        </div>
        <div className="flex items-center sm:gap-[30px] pr-[20px] text-secondaryText">
          <FaVideo size={20} />
          <BiSearch size={17} />
          <BsThreeDotsVertical size={17} />
        </div>
      </div>
    </div>
  );
};

export default Header;
