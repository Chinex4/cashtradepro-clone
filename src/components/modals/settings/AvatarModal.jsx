import React from "react";
import { Tab } from "@headlessui/react";
import Cropper from "react-easy-crop";

const AvatarModal = ({
  selectedTab,
  setSelectedTab,
  avatarList,
  selectedAvatar,
  setSelectedAvatar,
  handleAvatarSave,
  uploadedImagePreview,
  fileInputRef,
  onSelectFile,
  crop,
  setCrop,
  zoom,
  setZoom,
  onCropComplete,
  isSaveEnabled,
  onCancel,
}) => (
  <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
    <Tab.List className='flex border-b mb-4'>
      {["Select Avatar", "Upload Image"].map((tab, i) => (
        <Tab
          key={i}
          className={({ selected }) =>
            `py-2 px-4 ${
              selected ? "border-b-2 border-white font-bold" : "text-gray-400"
            }`
          }
        >
          {tab}
        </Tab>
      ))}
    </Tab.List>
    <Tab.Panels>
      <Tab.Panel>
        <div className='grid grid-cols-4 gap-3'>
          {avatarList.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`avatar-${i}`}
              onClick={() => setSelectedAvatar(src)}
              className={`w-16 h-16 rounded-full cursor-pointer border-2 ${
                selectedAvatar === src ? "border-lime-400" : (
                  "border-transparent"
                )
              }`}
            />
          ))}
        </div>
        <div className='flex justify-end gap-3 mt-4'>
          <button
            onClick={onCancel}
            className='px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-md'
          >
            Cancel
          </button>
          <button
            disabled={!isSaveEnabled}
            onClick={handleAvatarSave}
            className={`px-4 py-2 rounded-md font-semibold ${
              isSaveEnabled ?
                "bg-lime-400 text-black hover:bg-lime-500"
              : "bg-gray-500 text-white cursor-not-allowed"
            }`}
            
          >
            Save
          </button>
        </div>
      </Tab.Panel>
      <Tab.Panel>
        {!uploadedImagePreview ?
          <div
            className='border border-dashed border-gray-400 py-16 text-center rounded-md cursor-pointer'
            onClick={() => fileInputRef.current.click()}
          >
            <input
              type='file'
              accept='image/*'
              className='hidden'
              ref={fileInputRef}
              onChange={onSelectFile}
            />
            <p>Upload or drag and drop</p>
          </div>
        : <div className='relative w-full h-64 bg-black mb-4'>
            <Cropper
              image={uploadedImagePreview}
              crop={crop}
              zoom={zoom}
              aspect={1}
              cropShape='round'
              showGrid={false}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
        }
        <div className='flex justify-end gap-3 mt-4'>
          <button
            onClick={onCancel}
            className='px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-md'
          >
            Cancel
          </button>
          <button
            onClick={handleAvatarSave}
            className={`px-4 py-2 rounded-md font-semibold ${
              isSaveEnabled ?
                "bg-lime-400 text-black hover:bg-lime-500"
              : "bg-gray-500 text-white cursor-not-allowed"
            }`}

          >
            Save
          </button>
        </div>
      </Tab.Panel>
    </Tab.Panels>
  </Tab.Group>
);

export default AvatarModal;
