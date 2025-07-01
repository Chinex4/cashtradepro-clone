import React from "react";
import { Listbox } from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";

const LanguageModal = ({ languages, selected, onChange, onSave }) => (
  <>
    <Listbox value={selected} onChange={onChange}>
      <div className='relative'>
        <Listbox.Button className='w-full p-2 bg-black border border-gray-600 rounded-md text-white flex justify-between items-center'>
          <span>{selected}</span>
          <ChevronDown className='w-4 h-4' />
        </Listbox.Button>
        <Listbox.Options className='absolute z-10 mt-2 w-full max-h-60 overflow-y-auto bg-[#111] text-white border border-gray-600 rounded-md shadow-lg'>
          {languages.map((lang, idx) => (
            <Listbox.Option
              key={idx}
              value={lang}
              className={({ active }) =>
                `cursor-pointer px-4 py-2 text-sm ${
                  active ? "bg-lime-400 text-black" : ""
                }`
              }
            >
              {({ selected }) => (
                <div className='flex justify-between items-center'>
                  <span>{lang}</span>
                  {selected && <Check className='w-4 h-4' />}
                </div>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
    <button
      onClick={onSave}
      className='mt-4 w-full py-2 bg-lime-400 text-black font-semibold rounded-md'
    >
      Save
    </button>
  </>
);

export default LanguageModal;
