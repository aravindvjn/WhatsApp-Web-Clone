import React from "react";
import Text from "../../ui/text";
import { BiSearch } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";

const Header = () => {
  return (
    <div className="px-2 py-3 flex justify-between items-center">
      <Text type="h4" fontWeight="semibold">Calls</Text>
      <div className="flex items-center gap-3">
        <BiSearch size={18} />
        <BsThreeDotsVertical size={16} />
      </div>
    </div>
  );
};

export default Header;
