import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { X } from 'lucide-react';

const GoogleAuthDisableModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-50' onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'
        >
          <div className='fixed inset-0 bg-black bg-opacity-60' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='w-full relative max-w-md transform overflow-hidden rounded-lg bg-[#1A1A1A] p-6 text-left align-middle shadow-xl transition-all border border-[#333]'>
                  <button
                    onClick={onClose}
                    className='text-gray-400 hover:text-white text-right absolute top-4 right-4'
                  >
                    <X />
                  </button>
                <div className='flex justify-between items-center mb-4'>
                  <div className='flex items-center justify-center mx-auto size-20 border border-orange-500 rounded-full bg-orange-500/10 text-orange-500'>
                    <span className='text-orange-500 text-4xl font-bold'>
                      i
                    </span>
                  </div>
                </div>
                <div className='text-white text-sm mb-6'>
                  Disabling this verification method will decrease your
                  account’s security level.
                  <br />
                  Are you sure you want to proceed and disable it?
                </div>
                <div className='flex justify-between'>
                  <button
                    className='w-full bg-lime-400 text-black font-semibold py-2 rounded hover:bg-lime-500 mr-2'
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button
                    className='w-full bg-neutral-700 text-white font-semibold py-2 rounded hover:bg-neutral-600 ml-2'
                    onClick={onConfirm}
                  >
                    Disable
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default GoogleAuthDisableModal;
