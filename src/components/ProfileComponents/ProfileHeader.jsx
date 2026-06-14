import ProfileImage from "./ProfileImage";

const ProfileHeader = ({ name, username, bio, avatar, onAvatarChange }) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
      <ProfileImage name={name} avatar={avatar} onAvatarChange={onAvatarChange} />
      <div className="text-center md:text-left">
        <h1 className="font-titulos text-4xl text-white">{name}</h1>
        <p className="text-purple-400 text-lg">@{username}</p>
        <p className="text-gray-400 mt-2 max-w-md">{bio}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
