import { ProfileProvider, useProfile } from "../context/ProfileContext";
import ProfileHeader from "../components/ProfileComponents/ProfileHeader";
import ProfileStats from "../components/ProfileComponents/ProfileStats";
import ProfileSubs from "../components/ProfileComponents/ProfileSubs";
import ProfileDonate from "../components/ProfileComponents/ProfileDonate";
import ProfileContent from "../components/ProfileComponents/ProfileContent";

const ProfileContentPage = () => {
  const { name, username, avatar, bio, stats, subs, donations, content, updateAvatar } = useProfile();

  return (
    <section className="min-h-screen bg-black text-white font-textos">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <ProfileHeader name={name} username={username} bio={bio} avatar={avatar} onAvatarChange={updateAvatar} />
        <ProfileStats stats={stats} />
        <div className="space-y-10">
          <ProfileSubs subs={subs} />
          <ProfileDonate donations={donations} />
          <ProfileContent content={content} />
        </div>
      </div>
    </section>
  );
};

const ProfilePage = () => (
  <ProfileProvider>
    <ProfileContentPage />
  </ProfileProvider>
);

export default ProfilePage;
