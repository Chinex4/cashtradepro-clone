import React from "react";

const NicknameModal = ({ value, onChange, onCancel, onSave }) => (
  <>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className='bg-black border border-gray-600 rounded-md p-2 w-full'
      placeholder='Max 20 characters'
    />
    <div className='flex gap-2 mt-4'>
      <button
        onClick={onCancel}
        className='w-full py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-md'
      >
        Cancel
      </button>
      <button
        onClick={onSave}
        className='w-full py-2 bg-lime-400 text-black font-semibold rounded-md'
      >
        Save
      </button>
    </div>
  </>
);

export default NicknameModal;
