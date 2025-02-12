import ProfilePic from "../helper-components/profile-picture";

const SingleChannel = () => {
  return (
    <div className="flex pl-3 gap-3 items-center">
      <ProfilePic profilePic="" size={36} />
      <div className="flex justify-between gap-3 pr-3 items-center border-b border-border">
        <div className=" pr-[12px]  w-full py-2 ">
          <p className="text-primaryText line-clamp-1 text-[14px]">
            Sun News
          </p>
          <p className="text-secondaryText line-clamp-1 text-[12px]">
            5M followers
          </p>
        </div>
        <button className="px-3 py-1 text-[12px] text-green border border-green rounded-full">Follow</button>
      </div>
    </div>
  );
};

export default SingleChannel;
