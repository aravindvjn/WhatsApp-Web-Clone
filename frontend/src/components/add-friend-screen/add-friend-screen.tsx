import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { PageType } from "../nav-bar/nav-bar";
import SearchInput from "../chat-screen/primary/search-input";
import { BiArrowBack } from "react-icons/bi";
import { UserType } from "../chat-screen/types";
import { useAllUsers } from "../../hooks/useAllUsers";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import SingleUser from "./single-user";

const AddFriendScreen = ({
  setPage,
}: {
  setPage: Dispatch<SetStateAction<PageType>>;
}) => {
  const [searchInput, setSearchInput] = useState<string | undefined>();

  const { data: users, isLoading } = useAllUsers(searchInput || "");

  return (
    <div className="pt-2 flex flex-col gap-1">
      <BiArrowBack
        className="p-1 cursor-pointer rounded-full bg-secondary m-[8px]"
        size={33}
        onClick={() => setPage("chats")}
      />
      <SearchInput setSearchInput={setSearchInput} />
      <div className="flex flex-col w-full">
        {isLoading && (
          <AiOutlineLoading3Quarters className="self-center animate-spin" />
        )}
        {users?.map((user: UserType) => (
          <SingleUser key={user._id} {...user} />
        ))}
        {!isLoading && searchInput && users?.length === 0 && (
          <p className="text-[12px] text-secondaryText text-center">
            No users found!
          </p>
        )}
      </div>
    </div>
  );
};

export default AddFriendScreen;
