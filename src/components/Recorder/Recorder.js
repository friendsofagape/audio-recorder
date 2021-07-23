import { useReactMediaRecorder } from "react-media-recorder";
import { useCallback } from "react";
import React, { Fragment, useState } from 'react';
import { RecorderContext } from "../context/RecorderContext";
import ReactAudioPlayer from 'react-audio-player';
import '../../tailwind.output.css';
import Player from "./Player";

const Recorder = () => {
    const [url, setUrl] = useState('')
    const [recordingStatus, setRecordingStatus] = useState('idle')
    const [audioFormat, setAudioFormat] =  useState("audio/mp3")
    const {
        actions: {
            setSnackBar,
            setSnackText
        }
    } = React.useContext(RecorderContext)
    
    const playRecordingFeedback = useCallback(
        async (blobUrl, blob) => {
          console.log(blob, blobUrl)
          setUrl(blobUrl)
          setSnackBar(true)
          setSnackText("Recording stopped!")
          setRecordingStatus("stop")
          const playRecordedAudio = getPlayRecord(blobUrl);
          await playRecordedAudio();
        },
        []
    );
    const {
        startRecording,
        stopRecording,
        pauseRecording,
        resumeRecording,
        clearBlobUrl,
        error,
        status
    } = useReactMediaRecorder({
        audio: {},
        onStop: playRecordingFeedback,
        blobPropertyBag : { type: audioFormat }
    });

    const start = () => {
        clearBlobUrl()
        startRecording()
        setRecordingStatus("start")
    }

    const pause = () => {
        pauseRecording()
        setRecordingStatus('pause')
    }

    const resume = () => {
        resumeRecording()
        setRecordingStatus('resume')
    }

    return (
    <div className="App ">
    <Player srcUrl={url}/>
    <div class=" py-5">
    <nav class="items-center justify-between px-2 py-3 bg-gray-100 rounded">
      <div class="container px-2  mx-auto flex flex-wrap items-center justify-between">
        <div class="flex-grow items-center" id="example-navbar-warning">
          <ul class="flex flex-col lg:flex-row list-none ml-auto">
          
            <li class="nav-item">
              <a class="px-2 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-100" >
                <button
                    disabled={(recordingStatus === 'stop' || (status !=='recording' || status === 'idle'))? false : true}
                    class={`text-pink-700 
                    bg-transparent border 
                    ${(recordingStatus === 'stop' || (status !=='recording' || status === 'idle'))? '' : 'cursor-not-allowed' }
                    disabled:opacity-50
                    border-solid border-pink-500 
                    hover:bg-pink-500 hover:text-white 
                    active:bg-pink-600 font-bold 
                    uppercase px-2 py-2 rounded-full 
                    outline-none focus:outline-none 
                    ease-linear transition-all duration-150`}
                    type="button"
                    onClick={start}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                </button>
              </a>
            </li>
          {(recordingStatus === "start" || recordingStatus === 'resume') && (
            <li class="nav-item">
              <a class="px-2 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-100" >
              <button 
                    class="text-gray-500 
                    bg-transparent border 
                    border-solid border-gray-500 
                    hover:bg-gray-900 hover:text-white 
                    active:bg-gray-900 font-bold 
                    uppercase px-2 py-2 rounded-full 
                    outline-none focus:outline-none 
                    ease-linear transition-all duration-150" type="button"
                    onClick={pause}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                </button>
              </a>
            </li>
          )}
          {recordingStatus=== 'pause' && (
            <li class="nav-item">
              <a class="px-2 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-100" >
              <button 
                    class="text-pink-500 
                    bg-transparent border 
                    border-solid border-pink-500 
                    hover:bg-pink-500 hover:text-white 
                    active:bg-pink-600 font-bold 
                    uppercase px-2 py-2 rounded-full 
                    outline-none focus:outline-none 
                    ease-linear transition-all duration-150" type="button"
                    onClick={resume}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                    </svg>
                </button>
              </a>
            </li>
          )}
            <li class="nav-item">
              <a class="px-2 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-100" >
              <button 
                    class="text-gray-500 
                    bg-transparent border 
                    border-solid border-gray-500 
                    hover:bg-gray-900 hover:text-white 
                    active:bg-gray-900 font-bold 
                    uppercase px-2 py-2 rounded-full 
                    outline-none focus:outline-none 
                    ease-linear transition-all duration-150" type="button"
                    onClick={stopRecording}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clip-rule="evenodd" />
                    </svg>
                </button>
              </a>
            </li>
          </ul>
            <div class="mt-4">
                <span class="text-gray-700">Audio Format</span>
                <div onChange={(e) => setAudioFormat(e.target.value)} class="mt-2">
                  <label class="inline-flex items-center ">
                    <input type="radio" class="form-radio" name="accountType" value="audio/mp3" checked={audioFormat==="audio/mp3"? true: false}/>
                    <span class="ml-2">.mp3</span>
                  </label>
                  <label class="inline-flex items-center ml-6">
                    <input type="radio" class="form-radio" name="accountType" value="audio/wav" checked={audioFormat==="audio/wav"? true: false}/>
                    <span class="ml-2">.wav</span>
                  </label>
                </div>
            </div>
        </div>
      </div>
    </nav>
</div>
</div>
  );
}
 
export default Recorder;