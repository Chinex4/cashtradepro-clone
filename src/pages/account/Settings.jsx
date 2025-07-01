import { useState, useEffect, useRef, Fragment } from "react";
import { Globe, UserCircle2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../api/axiosInstance";
import { showPromise } from "../../utils/toast";
import { maskEmail } from "../../functions/helper";
import useFetchLoggedInUser from "../../hooks/useFetchedLoggedInUser";
import {
  updateNickname,
  updateLanguage,
} from "../../redux/user/userSettingsSlice";
import { getCroppedImg } from "../../utils/cropImageUtil";

// Components
import AnimatedModal from "../../components/modals/settings/AnimatedModal";
import NicknameModal from "../../components/modals/settings/NicknameModal";
import AvatarModal from "../../components/modals/settings/AvatarModal";
import LanguageModal from "../../components/modals/settings/LanguageModal";

const languages = [
  "English",
  "French",
  "German",
  "Chinese",
  "Spanish",
  "Arabic",
  "Portuguese",
  "Hindi",
  "Russian",
  "Japanese",
];
const avatarList = Array.from(
  { length: 16 },
  (_, i) => `/avatars/a${i + 1}.png`
);

const Settings = () => {
  const dispatch = useDispatch();
  const { user: fetchedUser } = useFetchLoggedInUser();
  const { nickname, language } = useSelector((state) => state.userSettings);

  const username = fetchedUser?.message?.userDetails?.username;
  const email = fetchedUser?.message?.userDetails?.email;
  const userNickname = nickname || username || email;

  const fileInputRef = useRef();

  // Modal control
  const [openModal, setOpenModal] = useState(null);
  const closeModal = () => setOpenModal(null);

  // Nickname
  const [nicknameInput, setNicknameInput] = useState(username);
  useEffect(() => setNicknameInput(nickname || username), [nickname, username]);

  // Language
  const [languageInput, setLanguageInput] = useState("English");
  useEffect(() => setLanguageInput(language || "English"), [language]);

  // Avatar state
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedAvatar, setSelectedAvatar] = useState("/avatars/a1.png");
  const [uploadedImagePreview, setUploadedImagePreview] = useState(null);
  const [rawImageFile, setRawImageFile] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const isSaveEnabled = selectedAvatar || uploadedImagePreview;

  // File handling
  const onSelectFile = (e) => {
    const file = e.target.files[0];
    if (file?.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setUploadedImagePreview(reader.result);
      reader.readAsDataURL(file);
      setRawImageFile(file);
    }
  };

  const onCropComplete = (_, croppedPixels) =>
    setCroppedAreaPixels(croppedPixels);

  // Save handlers
  const handleSaveNickname = async () => {
    try {
      await showPromise(
        axiosInstance.patch("/user/updateNickname", {
          nickname: nicknameInput,
        }),
        {
          loading: "Updating nickname...",
          success: "Nickname updated!",
          error: "Failed to update nickname",
        }
      );
      dispatch(updateNickname(nicknameInput));
      closeModal();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveLanguage = async () => {
    await showPromise(dispatch(updateLanguage(languageInput)).unwrap(), {
      loading: "Updating language...",
      success: "Language updated!",
      error: "Failed to update language",
    });
    closeModal();
  };

  const handleAvatarSave = async () => {
    try {
      const formData = new FormData();
      if (selectedTab === 0 && selectedAvatar) {
        const res = await fetch(selectedAvatar);
        const blob = await res.blob();
        const filename = selectedAvatar.split("/").pop();
        formData.append("documents", blob, filename);
      } else if (rawImageFile && croppedAreaPixels) {
        const croppedBlob = await getCroppedImg(
          rawImageFile,
          croppedAreaPixels,
          true
        );
        formData.append("documents", croppedBlob, rawImageFile.name);
      }

      await showPromise(
        axiosInstance.post("/user/updateAvatar", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        }),
        {
          loading: "Uploading image...",
          success: "Profile picture updated!",
          error: "Failed to update profile picture",
        }
      );
      closeModal();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='p-4 text-white max-w-6xl mx-auto space-y-8'>
      {/* Profile Info */}
      <section>
        <h2 className='text-xl font-bold mb-4'>Profile</h2>
        <div className='space-y-6'>
          {/* Nickname */}
          <div className='bg-[#111] p-4 rounded-md flex justify-between items-center'>
            <div>
              <div className='flex items-center gap-3 text-lime-400'>
                <UserCircle2 size={20} />
                <h3 className='font-semibold text-white'>Nickname</h3>
              </div>
              <p className='text-gray-400 text-xs'>Customize your nickname.</p>
            </div>
            <div className='flex gap-1 items-center text-xs'>
              <span>
                {(nickname || username || email)?.includes("@") ?
                  maskEmail(nickname || username || email)
                : nickname || username || email}{" "}
                |
              </span>

              <button
                onClick={() => setOpenModal("nickname")}
                className='text-lime-400 font-medium'
              >
                Change
              </button>
            </div>
          </div>

          {/* Avatar */}
          <div className='bg-[#111] p-4 rounded-md flex justify-between items-center'>
            <div>
              <div className='flex items-center gap-3 text-lime-400'>
                <UserCircle2 size={20} />
                <h3 className='font-semibold text-white'>Profile</h3>
              </div>
              <p className='text-gray-400 text-xs'>
                Choose or upload a profile picture.
              </p>
            </div>
            <div className='flex gap-2 items-center'>
              <img
                className='w-10 h-10 rounded-full'
                src={selectedAvatar || uploadedImagePreview}
                alt='avatar'
              />
              <button
                onClick={() => setOpenModal("avatar")}
                className='text-lime-400 font-medium text-xs'
              >
                Change
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Language Preference */}
      <section>
        <h2 className='text-xl font-bold mb-4'>Push</h2>
        <div className='bg-[#111] p-4 rounded-md'>
          <div className='flex items-center gap-3 text-lime-400'>
            <Globe size={20} />
            <h3 className='font-semibold text-white'>Language</h3>
          </div>
          <p className='text-gray-400 text-sm'>
            Used for push/email/message preferences.
          </p>
          <div className='flex justify-between mt-2'>
            <span>{language || "English"}</span>
            <button
              onClick={() => setOpenModal("language")}
              className='text-lime-400 font-medium text-xs'
            >
              Change
            </button>
          </div>
        </div>
      </section>

      {/* Modals */}
      {openModal === "nickname" && (
        <AnimatedModal
          isOpen={true}
          title='Change Nickname'
          onClose={closeModal}
        >
          <NicknameModal
            value={nicknameInput}
            onChange={setNicknameInput}
            onCancel={closeModal}
            onSave={handleSaveNickname}
          />
        </AnimatedModal>
      )}

      {openModal === "avatar" && (
        <AnimatedModal
          isOpen={true}
          title='Change Profile Picture'
          onClose={closeModal}
        >
          <AvatarModal
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            avatarList={avatarList}
            selectedAvatar={selectedAvatar}
            setSelectedAvatar={setSelectedAvatar}
            handleAvatarSave={handleAvatarSave}
            uploadedImagePreview={uploadedImagePreview}
            fileInputRef={fileInputRef}
            onSelectFile={onSelectFile}
            crop={crop}
            setCrop={setCrop}
            zoom={zoom}
            setZoom={setZoom}
            onCropComplete={onCropComplete}
            isSaveEnabled={isSaveEnabled}
            onCancel={closeModal}
          />
        </AnimatedModal>
      )}

      {openModal === "language" && (
        <AnimatedModal
          isOpen={true}
          title='Change Language'
          onClose={closeModal}
        >
          <LanguageModal
            languages={languages}
            selected={languageInput}
            onChange={setLanguageInput}
            onSave={handleSaveLanguage}
          />
        </AnimatedModal>
      )}
    </div>
  );
};

export default Settings;
