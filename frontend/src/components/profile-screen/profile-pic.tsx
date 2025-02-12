import React, { useRef, useState } from "react";
import ProfileSvg from "../../ui/profilesvg";
import { BsCamera } from "react-icons/bs";

const ProfilePic = ({ profilePic }: { profilePic: string }) => {
  const [hover, setHover] = useState(false); 
  const [profile, setProfile] = useState<File | string>(profilePic);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleProfilePicClick = () => {
    inputRef.current?.click();
  };

  const handleProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setProfile(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleProfilePicClick}
      className="w-[200px] mt-5 relative rounded-full aspect-square overflow-hidden mx-auto cursor-pointer"
    >
      {hover && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50  rounded-full flex-col">
          <BsCamera size={50} />
          <p className="w-2/3 text-center">Change Profile Picture</p>
        </div>
      )}
      {profile ? (
        <img
          src={profile as string}
          alt="profile"
          className="w-full h-full object-cover"
        />
      ) : (
        <ProfileSvg size={200} />
      )}
      <input
        onChange={handleProfile}
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
      />
    </div>
  );
};

export default ProfilePic;
