import React from "react";
import { MdEdit } from "react-icons/md";

const EditInput = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex flex-col gap-2 pt-6">
      <label className="text-[12px] text-mychat">{label}</label>
      <div className="flex items-center justify-between gap-2 text-[14px]">
        <p>{value}</p>
        <MdEdit className="text-secondaryText" size={18}/>
      </div>
    </div>
  );
};

export default EditInput;
