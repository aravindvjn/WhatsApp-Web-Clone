import React from "react";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import Text from "../../ui/text";
import ProfileSvg from "../../ui/profilesvg";
import { users } from "../../data/user";
import EditInput from "./edit-input";

const ProfileScreen = () => {
  const { data: user } = useCurrentUser();

  const details = [
    {
      label: "Your name",
      value: user?.displayName || "Meta User",
    },
    {
      label: "Your username",
      value: user?.username || "unavailable",
    },
    {
      label: "About",
      value: user?.status || "",
    },
  ];

  return (
    <div className="p-5 overflow-y-scroll scrollbar-hide">
      <Text type="h4" fontWeight="bold">
        Profile
      </Text>
      <div className="w-[200px] mt-5  rounded-full aspect-square overflow-hidden mx-auto">
        {user?.profilePic ? (
          <img
            src={
                user?.profilePic
            }
            alt="profile picture"
          />
        ) : (
          <ProfileSvg size={200} />
        )}
      </div>
      <div>
        {details?.map((detail) => (
          <EditInput
            key={detail.label}
            label={detail.label}
            value={detail.value}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfileScreen;
