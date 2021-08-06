import React from 'react'
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import concateTracks from '../../core/concateTracks'
import Crunker from "crunker"
// import '../../../styles/globals.css'

const people = [
  {
    id: 1,
    name: '44100hz (CD Quality)',
    value: "44100"
  },
  {
    id: 2,
    name: '48000hz (Studio Quality)',
    value: "48000"
  }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
const BufferOptions = () => {
  const [selected, setSelected] = useState(people[1])
  const [files, setFiles] = useState(null)
  const [selectedValue, setSelectedValue] = useState("48000")
  const [loadingStatus, setLoadingStatus] = useState(null)
  const [blob, setblob] = useState(null)
    
  
  const handleReadFile = (e) => {
    e.preventDefault()
    setLoadingStatus(null)
    setFiles(e.target.files)
  }

  const handleBuffer = (e, option) => {
    e.preventDefault()
    setLoadingStatus(true)
    const out = concateTracks({
      inputSampleRate: selectedValue,
      audiofiles: files,
      bufferOption: option,
      filename: "final_audio"
    })
    out.then((res)=>{
        console.log(res)
        setLoadingStatus(false)
        setblob(res)
        
    })
  }

  const handleDowload = async() => {
    const crunker = new Crunker({ sampleRate: selectedValue })
    console.log(blob)
    await crunker.download(blob, "final_audio")
  }

  const handleSelectValue = (val) => {
    setLoadingStatus(null)
    setSelectedValue(val)
  }
  

  const MenuSelects = (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium text-gray-700">Sampling Rate:</Listbox.Label>
          <div className="mt-1 relative">
            <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <span className="flex items-center">
                <span onClick={() => handleSelectValue(selected.value)} className="ml-3 block truncate">{selected.name}</span>
              </span>
              <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                static
                className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
              >
                {people.map((person) => (
                  <Listbox.Option
                    key={person.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                        'cursor-default select-none relative py-2 pl-3 pr-9'
                      )
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                         
                          <span
                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                          >
                            {person.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
    
  return (
    <>
     <div class="mt-4 w-50 items-center justify-center bg-grey-lighter">
    {MenuSelects}
    </div>
    <div class="mt-4 w-50 items-center justify-center bg-grey-lighter">
    <label class="flex flex-col items-center px-2 py-6 text-blue rounded-lg uppercase border border-blue cursor-pointer hover:bg-gray-100">
        <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
        </svg>
        <span class="mt-2 w-50 text-base leading-normal">Select audio files</span>
        <input type='file' class="hidden" multiple onChange={(e) => handleReadFile(e)}/>
    </label>
    </div>
    <div>
    <span class="flex items-center">
      <form class="mt-3 grid grid-cols-2 gap-2" >
		    <div >
		    	<input disabled={loadingStatus} class="hidden" id="radio_2" type="radio" onClick={(e) => handleBuffer(e, "concatAudio")} name="radio" />
		    	<label class={`${loadingStatus? 'cursor-not-allowed':"cursor-pointer"}
                    disabled:opacity-50 flex flex-col p-4 border-2 border-gray-400`} for="radio_2">
		    		<span class="text-xs font-semibold uppercase">Concate Selected {files&&files.length} Tracks </span> 
          </label>
		    </div>
		    <div>
		    	<input disabled={loadingStatus} class="hidden" id="radio_3" type="radio" onClick={(e) => handleBuffer(e, "mergeAudio")} name="radio" />
		    	<label class={`${loadingStatus? 'cursor-not-allowed':"cursor-pointer"}
                    disabled:opacity-50 flex flex-col p-4 border-2 border-gray-400`} for="radio_3">
		    		<span class="text-xs font-semibold uppercase">Merge Selected {files&&files.length} Tracks</span>
		    	</label>
		    </div>
	    </form>
        {loadingStatus&& (
            	<div class="animate-spin ml-5 rounded-full h-20 w-20 border-t-2 border-b-2 border-purple-500"></div>
        )}
        {loadingStatus === false  && (
        <button onClick={() => handleDowload()} class="ml-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded bg-blue-200 inline-flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="animate-bounce h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
            <span class="ml-3">Download</span>
        </button>
        )}
        </span> 
      </div>
    </>
  )
}

export default BufferOptions
