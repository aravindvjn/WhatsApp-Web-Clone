import ProfileSvg from "../../ui/profilesvg";

const ProfilePic = ({
  profilePic,
  size = 42,
}: {
  profilePic: string;
  size: number;
}) => {
  return (
    <div
      className=" rounded-full"
      style={{
        width: size,
        height: size,
        backgroundColor: "gray",
      }}
    >
      {profilePic ? (
        <img
          src={profilePic}
          alt="profile"
          className="rounded-full aspect-square object-cover"
        />
      ) : (
        <ProfileSvg size={size} />
      )}
    </div>
  );
};

export default ProfilePic;
