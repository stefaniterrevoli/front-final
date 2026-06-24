import { useState } from "react";
import { ProfileProvider, useProfile } from "../context/ProfileContext";
import { ObrasProvider } from "../context/ObrasContext";
import ProfileHeader from "../components/ProfileComponents/ProfileHeader";
import ProfileStats from "../components/ProfileComponents/ProfileStats";
import ProfileSubs from "../components/ProfileComponents/ProfileSubs";
import ProfileDonate from "../components/ProfileComponents/ProfileDonate";
import ProfileChapters from "../components/ProfileComponents/ProfileChapters";
import ProfileContent from "../components/ProfileComponents/ProfileContent";
import ProfileReports from "../components/ProfileComponents/ProfileReports";
import BecomeCreatorModal from "../components/ProfileComponents/BecomeCreatorModal";

const ProfileContentPage = () => {
  const { isCreator, name, username, avatar, bio, obras, followers, following, donations, totalLikes, chapterSales, updateAvatar, updateProfile, createCreatorProfile, addArtwork, updateArtwork, reloadProfile } = useProfile();
  const [showCreatorModal, setShowCreatorModal] = useState(false);

  return (
    <section className="min-h-screen bg-black text-white font-textos">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <ProfileHeader name={name} username={username} bio={bio} avatar={avatar} onAvatarChange={updateAvatar} onUpdateProfile={updateProfile} />

        {isCreator ? (
          <>
            <ProfileStats stats={{ obras: obras.length, likes: totalLikes }} />
            <div className="space-y-10">
              <ProfileSubs followers={followers} following={following} />
              <ProfileDonate donations={donations} />
              <ProfileChapters sales={chapterSales} />
              <ProfileContent obras={obras} addArtwork={addArtwork} updateArtwork={updateArtwork} reloadProfile={reloadProfile} />
            </div>
            <div className="mt-10">
              <ProfileReports />
            </div>
          </>
        ) : (
          <>
            <ProfileReports />
            <div className="text-center py-16">
              <img src="/crear.webp" alt="crear" className="w-24 h-24 mx-auto mb-6 object-contain" />
              <h2 className="font-titulos text-3xl text-white mb-4">
                ¿Quieres compartir tu arte?
              </h2>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                Crea un perfil de creador para subir obras, recibir donaciones y
                construir una comunidad de seguidores.
              </p>
              <button
                onClick={() => setShowCreatorModal(true)}
                className="bg-pink-700 hover:bg-pink-800 text-white font-bold px-8 py-3 text-lg transition-colors"
              >
                ¡Convertirse en Creador!
              </button>
            </div>
          </>
        )}

        {showCreatorModal && (
          <BecomeCreatorModal
            onClose={() => setShowCreatorModal(false)}
            onSubmit={createCreatorProfile}
          />
        )}
      </div>
    </section>
  );
};

const ProfilePage = () => (
  <ProfileProvider>
    <ObrasProvider>
      <ProfileContentPage />
    </ObrasProvider>
  </ProfileProvider>
);

export default ProfilePage;
