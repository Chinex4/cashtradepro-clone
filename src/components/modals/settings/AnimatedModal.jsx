import { Dialog, Transition, Tab, Listbox } from "@headlessui/react";
import { Fragment } from "react";

const AnimatedModal = ({ isOpen, onClose, title, children }) => {
  if (typeof isOpen !== "boolean") {
    console.warn("AnimatedModal: Missing `isOpen` prop");
    return null;
  }

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-50' onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black/80 backdrop-blur-sm' />
        </Transition.Child>

        <div className='fixed inset-0 flex items-center justify-center p-4'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <Dialog.Panel className='bg-[#111] p-6 rounded-md w-[90%] max-w-md space-y-4 text-white shadow-xl'>
              <Dialog.Title className='text-lg font-semibold'>
                {title}
              </Dialog.Title>
              {children}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AnimatedModal;
