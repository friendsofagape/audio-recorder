import React, { Fragment, useState, useEffect, useContext } from 'react';
import { XIcon } from '@heroicons/react/outline';
import { Dialog, Transition } from '@headlessui/react';
import { RecorderContext } from '../context/RecorderContext';

const SnackBar = () => {
    const {
        state: {
            snackBar,
            snackText
        },
        actions: {
            setSnackBar,
            setSnackText
        }
    } = React.useContext(RecorderContext)

    const closeSnackBar = () => {
        setSnackBar(false);
        setSnackText("")
    }

    return ( 
        <Transition appear show={snackBar} as={Fragment}>
        <Dialog
          as={Fragment}
          // className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => { }}
        >
          <div className="static">

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              // className="inline-block h-screen align-bottom"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >

              <div className="inline-block absolute bottom-0 left-0 align-top transform transition-all w-2/5 p-4">

                <div className="relative bg-green-100 p-5 mt-5 bg-validation rounded-lg text-sm font-semibold text-gray-600">
                  <button
                    type="button"
                    className="bg-black absolute top-0 right-0 h-6 w-6 rounded-full text-center text-white p-1 -mt-2 -mr-2 focus:outline-none"
                    onClick={() => closeSnackBar(false)}
                  >
                    <XIcon />
                  </button>
                  <p>
                    {snackText}
                  </p>
                </div>

                {/* <div className="relative p-5 mt-5 bg-light rounded-lg text-sm font-semibold text-gray-500">
                  <button
                    type="button"
                    className="bg-black absolute top-0 right-0 h-6 w-6 rounded-full text-center text-white p-1 -mt-2 -mr-2 focus:outline-none"
                    onClick={() => closeSnackBar(false)}
                  >
                    <XIcon />
                  </button>
                  <p>This is a Notifiction.</p>
                </div>
                <div className="relative p-5 mt-5 bg-validation rounded-lg text-sm font-semibold text-gray-500">
                  <button
                    type="button"
                    className="bg-black absolute top-0 right-0 h-6 w-6 rounded-full text-center text-white p-1 -mt-2 -mr-2 focus:outline-none"
                    onClick={() => closeSnackBar(false)}
                  >
                    <XIcon />
                  </button>
                  <p>This is a Notifiction.</p>
                </div> */}

              </div>

            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
     );
}
 
export default SnackBar;