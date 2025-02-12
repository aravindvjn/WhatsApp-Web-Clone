import React from "react";
import Text from "../../ui/text";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";

const Header = () => {
  return (
    <div className="flex justify-between items-center p-2 pt-3">
      <Text type="h4" fontWeight="semibold">
        Status
      </Text>
      <div className="flex items-center gap-3">
        <IoMdAdd size={25} />
        <BsThreeDotsVertical size={18} />
      </div>
    </div>
  );
};

export default Header;
