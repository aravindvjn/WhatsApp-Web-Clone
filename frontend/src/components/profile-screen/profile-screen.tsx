import { useState } from "react";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import Text from "../../ui/text";
import EditInput from "./edit-input";
import Logout from "./logout";
import ProfilePic from "./profile-pic";
import { getImageUrl } from "../../utils/helper/getImageUrl";

const ProfileScreen = () => {
  const { data: user } = useCurrentUser();
  const [profile, setProfile] = useState<string>(getImageUrl(user?.profilePic  || ""));
  const details = [
    {
      label: "Your name",
      value: user?.displayName || "Meta User",
      name: "displayName",
    },
    {
      label: "Your username",
      value: user?.username || "unavailable",
      name: "username",
    },
    {
      label: "About",
      value: user?.status || "",
      name: "status",
    },
  ];

  return (
    <div className="p-5 overflow-y-scroll scrollbar-hide">
      <Text type="h4" fontWeight="bold">
        Profile
      </Text>
      <ProfilePic profile={profile} setProfile={setProfile}/>
      <div>
        {details?.map((detail) => (
          <EditInput
            name={detail.name}
            key={detail.label}
            label={detail.label}
            value={detail.value}
          />
        ))}
      </div>
      <Logout />
    </div>
  );
};

export default ProfileScreen;
