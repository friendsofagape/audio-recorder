
import React from 'react';
import useSpeech from './useSpeech';
export default function SpeechRecognition({langaugeCode,intermediateTranscript}) {
  const { startfunc,stopfunc,transcript }=useSpeech(langaugeCode,intermediateTranscript);
  return (
    <>
      <p className="p-2 text-sm bg-gray-200 text-justify min-h-[100px]">{transcript}</p>
      <div className="p-2 bg-dark rounded-md w-fit">
        <button type="button" class='mt-2 mr-2' onClick={()=>startfunc()}>
          <span>🎙️</span>
        </button>
        <button type="button" class='mt-2' onClick={()=>stopfunc()}>
          <span>🛑</span>
        </button>
      </div>
    </>
  );
}