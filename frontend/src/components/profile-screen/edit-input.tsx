import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { IoClose } from "react-icons/io5";
import { MdDone, MdEdit } from "react-icons/md";

const EditInput = ({
  label,
  value,
  name,
}: {
  label: string;
  value: string;
  name: string;
}) => {
  const [input, setInput] = useState<string>(value);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-2 select-none pt-6">
      <label className="text-[12px] text-mychat">{label}</label>
      <div className="flex items-center justify-between gap-2 text-[14px]">
        {isEditing ? (
          <input
            name={name}
            value={input}
            onChange={handleChange}
            type="text"
            className="focus:outline-none bg-transparent w-full"
            autoFocus={isEditing}
          />
        ) : (
          <p>{value}</p>
        )}
        {isEditing ? (
          <div className="text-secondaryText cursor-pointer flex items-center gap-1">
            <MdDone size={20} />
            <IoClose onClick={() => setIsEditing(false)} size={20} />
          </div>
        ) : (
          <MdEdit
            onClick={() => setIsEditing(true)}
            className="text-secondaryText cursor-pointer"
            size={18}
          />
        )}
      </div>
    </div>
  );
};

export default EditInput;
