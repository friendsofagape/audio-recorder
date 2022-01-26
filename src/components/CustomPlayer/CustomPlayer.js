import React ,  { useState }from 'react';
import { useReactMediaRecorder } from "react-media-recorder";
import { useCallback, useEffect, useRef } from "react";
import { RecorderContext } from "../context/RecorderContext";
import WaveSurfer from "wavesurfer.js";
import WaveformPlayer from "../WaveformPlayer/WaveformPlayer";
import MicrophonePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.microphone.js';
import { TrashIcon, MicrophoneIcon, VolumeUpIcon, PlayIcon, PauseIcon, RefreshIcon, MinusIcon, PlusIcon, CogIcon, StopIcon } from '@heroicons/react/outline';
import saveToLocalforage from '../../core/saveToLocalforage';

const microphone = MicrophonePlugin.create()

const formWaveSurferOptions = (ref) => ({
  container: ref,
  waveColor: "#DC143C",
  progressColor: "green",
  cursorColor: "red",
  interact: false,
  responsive: 1000,
  cursorWidth: 1,
  height: 200,
  // If true, normalize by the maximum peak instead of 1.0.
  // Use the PeakCache to improve rendering speed of large waveforms.
  plugins:[
    microphone
  ],
});

export default function CustomPlayer() {
  const [url, setUrl] = useState('')
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [startTime, setStartTime] = useState("00:00:00")
  const [endTime, setEndTime] = useState("00:00:00")
  const [totalTime, setTotalTime] = useState("00:00:00")
  const [remainingTime, setRemainingTime] = useState("00:00:00")
  const [recordingStatus, setRecordingStatus] = useState('idle')
  const [audioFormat, setAudioFormat] =  useState("audio/mp3")
  const [selectedRevision, setSelectedRevision] = useState('A')
  const [recordStop, setRecordStop] = useState(false)

  const playRecordingFeedback = useCallback(
    async (blobUrl, blob) => {
      console.log(blob, blobUrl)
      setUrl(blobUrl)
      setRecordingStatus("stop")
      saveToLocalforage({ verse: "verse1", version: selectedRevision, verseBatchNum: 1, blobUrl: blobUrl })
      // const playRecordedAudio = getPlayRecord(blobUrl);
      // await playRecordedAudio();
    },
    []
  );

  const {
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    clearBlobUrl,
    mediaBlobUrl,
    error,
    status
    } = useReactMediaRecorder({
        audio: true,
        onStop: playRecordingFeedback,
        blobPropertyBag : { type: audioFormat }
    });

  useEffect(() => {
    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);
    wavesurfer.current.microphone.on('deviceReady', function(stream) {
      console.log('Device ready!', stream);
    });
    wavesurfer.current.microphone.on('deviceError', function(code) {
      console.warn('Device error: ' + code);
    });
    return () => wavesurfer.current.microphone.destroy();
  },[])

  useEffect(() => {
    if(recordingStatus === "stop"){
      console.log(">>>>stoppppppppp")
      
      // saveToLocalforage({ verse: "verse2", version: selectedRevision, verseBatchNum: 1, blobUrl: url })
    }
  },[recordingStatus])

  const start = () => {
      setRecordStop(false)
      clearBlobUrl()
      startRecording()
      setRecordingStatus("start")
      wavesurfer.current.microphone.start();
  }

  const pause = () => {
      pauseRecording()
      setRecordingStatus('pause')
      wavesurfer.current.microphone.pause();
  }

  const resume = () => {
      resumeRecording()
      setRecordingStatus('resume')
      wavesurfer.current.microphone.play();
  }

  const stop = () => {
    stopRecording()
    setRecordingStatus('stop')
    wavesurfer.current.microphone.stop();
    console.log("DSdasadasdasd")
    setRecordStop(true)
  }

  return (
    <>
    <div style={{ width: '90%', height: '200px', borderRadius: '20px' }} className='bg-black text-white'>
        <div style={{ borderRadius: '20px', height: '80px', width: '80%' }} >
            <div style={{ borderRadius: '20px'}} className="flex p-2 px-4 justify-between items-center bg-black text-white">
                <div className="px-2 py-4 font-bold text-white text-sm tracking-wider">
                  10:30
                </div>
                
                    <div className="flex gap-5">
                    <div 
                    style={{
                    width:'30px', 
                    height: '0px', 
                    marginTop:'18px',
                    left:'97px',
                     top: '1.5px', /* White */ 
                     border: '1px solid #FFFFFF', 
                     transform: `rotate(${90}deg)`,
                     opacity: 0.5
                     }}>
                    </div>
                        <button type="button" style={{background: '#FF4D4D'}} className="p-2 rounded-md hover:bg-error">
                          <RefreshIcon
                            className="w-5 h-5"
                            aria-hidden="true"
                          />
                        </button>
                        <button 
                        type="button" 
                        style={{background: '#FF4D4D'}} 
                        className="p-2 rounded-md hover:bg-error"
                        disabled={(recordingStatus === 'stop' || status === 'idle') ? false : true}
                        type="button"
                        onClick={start}
                        >
                          <MicrophoneIcon
                            className="w-5 h-5"
                            aria-hidden="true"
                          />
                        </button>
                        {recordingStatus === 'pause' && (
                        <button 
                        type="button" 
                        className="p-2 bg-dark rounded-md hover:bg-primary"
                        onClick={resume}
                        >
                            <PlayIcon
                              className="w-5 h-5"
                              aria-hidden="true"
                            />
                          </button>
                        )}
                        {(recordingStatus === "start" || recordingStatus === 'idle'|| recordingStatus === 'resume' ||  recordingStatus === 'stop') && (
                          <button 
                            type="button" 
                            disabled={(recordingStatus === 'start' || status === 'recording') ? false : true}
                            className={`p-2 bg-dark rounded-md hover:bg-primary
                            ${(recordingStatus === 'stop' || (status !=='recording' || recordingStatus === 'idle'))? '' : 'cursor-not-allowed'} `}
                            onClick={pause}
                            >
                            <PauseIcon
                              className="w-5 h-5"
                              aria-hidden="true"
                            />
                          </button>
                        )}

                          <button 
                            type="button" 
                            className="p-2 bg-dark rounded-md hover:bg-primary"
                            onClick={stop}
                            >
                            <StopIcon
                              className="w-5 h-5"
                              aria-hidden="true"
                            />
                          </button>
                          <button type="button" className="p-2 bg-dark rounded-md hover:bg-error">
                            <TrashIcon
                              className="w-5 h-5"
                              aria-hidden="true"
                            />
                          </button>
                          <button type="button" className="rounded-md hover:bg-error">
                            <MinusIcon
                              className="w-5"
                              aria-hidden="true"
                            />
                          </button>
                          
                          <div style={{ backgroundColor: '#FFFFFF', marginTop:'18px', borderRadius: '20px', width: '100px',height: '8px', left: '340px',top: '12px'}}>
                            <div style={{ backgroundColor: '#0073E6', borderRadius: '20px', width: '70px',height: '8px', left: '340px',top: '12px'}}>
                            </div>
                          </div>
                          <button type="button" className="rounded-md hover:bg-error">
                            <PlusIcon
                              className="w-5"
                              aria-hidden="true"
                            />
                          </button>
                            <div style={{width:'30px', height: '0px', marginTop:'18px',left:'97px',top: '1.5px', /* White */ border: '1px solid #FFFFFF', transform: `rotate(${90}deg)`,opacity: 0.5}} />
                                <div className="flex p-2.5 justify-between items-center"
                                onClick={() => setSelectedRevision('A')}
                                style={{ borderRadius:'50%', width:"40px", height: '40px', backgroundColor:"#40C000", left: "8.82%", right: "8.82%", top: "8.82%", bottom: "8.82%", }}>
                                    <span className="flex font-bold">
                                        A
                                    </span>
                                </div>
                                <div className="flex p-2.5 justify-between items-center"
                                onClick={() => setSelectedRevision('B')}
                                style={{ borderRadius:'50%', width:"40px", height: '40px', backgroundColor: selectedRevision=== 'B'? "grey" : "#FFFF", left: "8.82%", right: "8.82%", top: "8.82%", bottom: "8.82%", }}>
                                <span className={`flex font-bold ${selectedRevision === 'B' ? 'text-grey' : 'text-dark' }`}>
                                    B
                                </span>
                                </div>
                                <div className="flex p-2.5 justify-between items-center"
                                onClick={() => setSelectedRevision('C')}
                                style={{ borderRadius:'50%', width:"40px", height: '40px', backgroundColor: selectedRevision=== 'C'? "grey" : "#FFFF", left: "8.82%", right: "8.82%", top: "8.82%", bottom: "8.82%", }}>
                                <span className={`flex font-bold ${selectedRevision === 'C' ? 'text-grey' : 'text-dark' }`}>
                                    C
                                </span>
                                </div>
                            <div style={{width:'30px', height: '0px', marginTop:'18px',left:'97px',top: '1.5px', /* White */ border: '1px solid #FFFFFF', transform: `rotate(${90}deg)`,opacity: 0.5}} />
                            <button type="button" className="mb-1.5 rounded-md hover:bg-error">
                            <CogIcon
                              className="w-5 h-5"
                              aria-hidden="true"
                            />
                          </button>
                    </div>
                        
                </div>
            </div>
            <div className="flex p-2 px-4 justify-between items-center bg-black text-white">
                <button type="button" className="rounded-md hover:bg-error">
                    <div className="flex p-2.5 justify-between items-center" style={{ borderRadius:'50%', width:"40px", height: '40px',  backgroundColor:"#FFFF", left: "8.82%", right: "8.82%", top: "8.82%", bottom: "8.82%", }}>
                        <span className="flex font-bold text-dark">
                            1
                        </span>
                        <div>
                          {recordingStatus!== 'stop' && (
                            <div id="waveform" ref={waveformRef} />
                          )}
                          {url && (
                            <>
                            <WaveformPlayer 
                            src={url} 
                            setStartTime={setStartTime}
	                          setEndTime={setEndTime}
	                          setRemainingTime={setRemainingTime}
	                          totalDuration={setTotalTime}
                            />
                            </>
                          )}
                        </div>
                    </div>
                </button>
                <button type="button" className="rounded-md hover:bg-error">
                <div className="flex p-2.5 justify-between items-center" style={{ borderRadius:'50%', width:"40px", height: '40px',  backgroundColor:"#FFFF", left: "8.82%", right: "8.82%", top: "8.82%", bottom: "8.82%", }}>
                    <span className="flex font-bold text-dark">
                        2
                    </span>
                </div>
                </button>
                <button type="button" className="rounded-md hover:bg-error">
                <div className="flex p-2.5 justify-between items-center" style={{ borderRadius:'50%', width:"40px", height: '40px',  backgroundColor:"#FFFF", left: "8.82%", right: "8.82%", top: "8.82%", bottom: "8.82%", }}>
                    <span className="flex font-bold text-dark">
                        3
                    </span>
                </div>
                </button>
                <button type="button" className="rounded-md hover:bg-grey">
                <div className="flex p-2.5 justify-between hover:bg-grey items-center" style={{ borderRadius:'50%', width:"40px", height: '40px',  backgroundColor:"#FFFF", left: "8.82%", right: "8.82%", top: "8.82%", bottom: "8.82%", }}>
                    <span className="flex font-bold text-dark">
                        4
                    </span>
                </div>
                </button>
            </div>
            
    </div>
    </>
  );
}
