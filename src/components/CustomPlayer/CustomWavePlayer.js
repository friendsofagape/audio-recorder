import React, { useEffect, useRef, useState } from "react";

import WaveSurfer from "wavesurfer.js";
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions';
import { timeConvert } from "../BufferManupulation/helper";
let regions = RegionsPlugin.create({
  regions: [
    
  ],
  dragSelection: false,
  slop: 10,
})


const formWaveSurferOptions = (ref) => ({
  container: ref,
  waveColor: '#D2EDD4',
  progressColor: '#46B54D',
  cursorColor: "red",
  barWidth: 4,
  barRadius: 4,
  responsive: 1000,
  cursorWidth: 1,
  height: 200,
  // If true, normalize by the maximum peak instead of 1.0.
  normalize: true,
  // Use the PeakCache to improve rendering speed of large waveforms.
  partialRender: true,
  plugins:[
    regions
  ],
});


export default function CustomWavePlayer({
    src, 
    totalDuration, 
    setStartTime,
    setEndTime,
    setRemainingTime    
}) {
    const waveformRef = useRef(null);
    const wavesurfer = useRef(null);
    const [playing, setPlay] = useState(false);
    const [playingRegion, setPlayRegion] = useState(false);
    const [volume, setVolume] = useState(0.5);

  // create new WaveSurfer instance
  // On component mount and when src changes
  useEffect(() => {
    setPlay(false);
    console.log(src)
    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);

    wavesurfer.current.load(src);
    
    wavesurfer.current.on("ready", function () {
      // wavesurfer.current.play();
      // setPlay(true);
      // wavesurfer.current.enableDragSelection({});
      wavesurfer.current.regions.clear();
      wavesurfer.current.regions.add({
        start: 0,
        end: wavesurfer.current.getDuration() - (wavesurfer.current.getDuration() / 60),
        color: 'hsla(200, 50%, 70%, 0.3)',
      });
      
      // make sure object stillavailable when file loaded
      if (wavesurfer.current) {
        wavesurfer.current.setVolume(volume);
        setVolume(volume);
      }
      totalDuration(timeConvert(wavesurfer.current.getDuration()))
    });

    wavesurfer.current.on('region-update-end', function(region, e) {
      // console.log(timeConvert(region.start));
      // console.log(timeConvert(region.end));
      e.stopPropagation();
      setStartTime(timeConvert(region.start))
      setEndTime(timeConvert(region.end))
      //  wavesurfer.current.play(region.start, region.end);
    });

    wavesurfer.current.on('audioprocess', function() {
      if(wavesurfer.current.isPlaying()) {
          var totalTime = wavesurfer.current.getDuration(),
              currentTime = wavesurfer.current.getCurrentTime();
              // remainingTime = totalTime - currentTime;
              setRemainingTime(timeConvert(totalTime - currentTime))
      }
    });

    // Removes events, elements and disconnects Web Audio nodes.
    // when component unmount
    return () => wavesurfer.current.destroy();
  }, [src]);

  const handlePlayPause = () => {
    setPlay(!playing);
    wavesurfer.current.playPause();
  };

  const onVolumeChange = (e) => {
    const { target } = e;
    const newVolume = +target.value;
    if (newVolume) {
      setVolume(newVolume);
      wavesurfer.current.setVolume(newVolume || 1);
    }
  };

  const playRegion = () => {
    setPlayRegion(!playingRegion)
    console.log(playingRegion)
    playingRegion=== true ? 
    wavesurfer.current.playPause():
    wavesurfer.current.regions.list[Object.keys(wavesurfer.current.regions.list)[0]].play()
    
  }
  return (
    <>
    <div>
      <div id="waveform" ref={waveformRef} />
      <div className=" flex items-center ">
        {!playing ? (
              <a class="px-2 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-100" >
              <button 
                    title="Play/Pause" 
                    class="text-pink-500 
                    bg-transparent border 
                    border-solid border-pink-500 
                    hover:bg-pink-500 hover:text-white 
                    active:bg-pink-600 font-bold 
                    uppercase px-2 py-2 rounded-full 
                    outline-none focus:outline-none 
                    ease-linear transition-all duration-150" type="button"
                    onClick={handlePlayPause}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                    </svg>
                </button>
              </a>
        ) : (
              <a class="px-2 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-100" >
              <button
                    title="Play/Pause" 
                    class="text-gray-500 
                    bg-transparent border 
                    border-solid border-gray-500 
                    hover:bg-gray-900 hover:text-white 
                    active:bg-gray-900 font-bold 
                    uppercase px-2 py-2 rounded-full 
                    outline-none focus:outline-none 
                    ease-linear transition-all duration-150" type="button"
                    onClick={handlePlayPause}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                </button>
              </a>
        )}
        <input
          type="range"
          id="volume"
          name="volume"
          min="0.01"
          max="1"
          step=".025"
          onChange={onVolumeChange}
          defaultValue={volume}/>
      </div>
    </div>
    </>
  );
}