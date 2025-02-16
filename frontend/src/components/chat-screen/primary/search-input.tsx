import { Dispatch, SetStateAction, useRef, useState } from "react";
import { BiArrowBack, BiSearch } from "react-icons/bi";
import { UserType } from "../types";

const SearchInput = ({
  searchInput,
  setSearchInput,
}: {
  searchInput?: string;
  setSearchInput?: Dispatch<SetStateAction<string | undefined>>;
}) => {
  const inputRef = useRef(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput?.(e.target.value);
  };

  return (
    <div className="mx-[10px] text-secondaryText relative flex items-center mb-[10px] h-[34px] group">
      <div className="cursor-pointer absolute h-[34px] w-[34px] flex items-center justify-center top-0 left-0 pointer-events-none">
        <BiSearch className="transition-opacity duration-200 opacity-100 group-focus-within:hidden" />
        <BiArrowBack className="transition-opacity duration-200 hidden group-focus-within:flex " />
      </div>
      <input
        ref={inputRef}
        value={searchInput}
        onChange={handleInputChange}
        className="rounded bg-secondary w-full h-[34px] text-primaryText focus:outline-none text-[12px] pl-[36px] group-focus-within:outline-none"
        placeholder="Search"
      />
    </div>
  );
};

export default SearchInput;
