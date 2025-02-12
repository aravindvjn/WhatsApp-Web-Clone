import React from "react";
import Text from "../../ui/text";
import { IoMdAdd } from "react-icons/io";

const Header = () => {
  return (
    <div className="p-2 pt-3 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <Text type="h4" fontWeight="semibold">Channels</Text>
        <IoMdAdd />
      </div>
      <p className="text-[14px]">Stay updated on your favourite topic</p>
      <p className="text-secondaryText text-[12px] text-center">Find channels to follow below</p>
    </div>
  );
};

export default Header;
