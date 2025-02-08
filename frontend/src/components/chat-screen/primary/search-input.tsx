import { useRef, useState } from "react";
import { BiArrowBack, BiSearch } from "react-icons/bi";

const SearchInput = () => {
  const [input, setInput] = useState<string>();

  const inputRef = useRef(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className="mx-[10px] text-secondaryText relative flex items-center mb-[10px] h-[34px] group">
      <div
        className="cursor-pointer absolute h-[34px] w-[34px] flex items-center justify-center top-0 left-0 pointer-events-none"
      >
        <BiSearch className="transition-opacity duration-200 opacity-100 group-focus-within:hidden" />
        <BiArrowBack className="transition-opacity duration-200 hidden group-focus-within:flex " />
      </div>
      <input
        ref={inputRef}
        value={input}
        onChange={handleInputChange}
        className="rounded bg-secondary w-full h-[34px] text-primaryText focus:outline-none text-[12px] pl-[36px] group-focus-within:outline-none"
        placeholder="Search"
      />
    </div>
  );
};

export default SearchInput;
