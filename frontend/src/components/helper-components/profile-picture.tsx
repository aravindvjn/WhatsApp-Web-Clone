import ProfileSvg from "../../ui/profilesvg";

const ProfilePic = ({
  profilePic,
  size = 42,
}: {
  profilePic: string;
  size: number;
}) => {

  const renderProfile = () => {

    if (profilePic) {
      return (
        <img
          src={profilePic}
          alt="profile"
          className="rounded-full aspect-square object-cover"
        />
      );
    }
    
    return <ProfileSvg size={size} />;
  };

  return (
    <div
      className=" rounded-full"
      style={{
        width: size,
        height: size,
        backgroundColor: "gray",
      }}
    >
      {renderProfile()}
    </div>
  );
};

export default ProfilePic;
