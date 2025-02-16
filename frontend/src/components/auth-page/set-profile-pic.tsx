import React, { Dispatch, SetStateAction, useState } from "react";
import ProfilePic from "../profile-screen/profile-pic";
import Text from "../../ui/text";

const SetProfilePic = ({
  setProfile,
  profile,
}: {
  setProfile: Dispatch<SetStateAction<string>>;
  profile: string;
}) => {


  return (
    <div className="flex flex-col py-3">
      <Text type="h4" fontWeight="semibold">Set Profile</Text>
      <ProfilePic profile={profile || ""} setProfile={setProfile} />
    </div>
  );
};

export default SetProfilePic;
