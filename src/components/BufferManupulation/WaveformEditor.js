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
  waveColor: "#cff",
  progressColor: "green",
  cursorColor: "red",
  barWidth: 3,
  barRadius: 3,
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

export default function WaveformEditor({ 
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
      // https://wavesurfer-js.org/docs/methods.html
      // wavesurfer.current.play();
      // setPlay(true);
      // wavesurfer.current.enableDragSelection({});
      wavesurfer.current.regions.clear();
      wavesurfer.current.regions.add({
        start: 5,
        end: wavesurfer.current.getDuration() - (wavesurfer.current.getDuration() / 60),
        color: 'hsla(200, 50%, 70%, 0.3)',
      });
      
      // make sure object stillavailable when file loaded
      if (wavesurfer.current) {
        wavesurfer.current.setVolume(volume);
        setVolume(volume);
      }
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
              totalDuration(totalTime)
      }
    });

    // Removes events, elements and disconnects Web Audio nodes.
    // when component unmount
    return () => wavesurfer.current.destroy();
  }, [src]);
  
  const trimRegion = () => {
    // I had to fixed to two decimal if I don't do this not work, I don't know whyyy
    const start = wavesurfer.current.regions.list[Object.keys(wavesurfer.current.regions.list)[0]].start.toFixed(2);
    const end = wavesurfer.current.regions.list[Object.keys(wavesurfer.current.regions.list)[0]].end.toFixed(2);
    const originalBuffer = wavesurfer.current.backend.buffer;
    console.log(end, start,end , start,originalBuffer, (end - start) * (originalBuffer.sampleRate * 1))
    var emptySegment = wavesurfer.current.backend.ac.createBuffer(
      originalBuffer.numberOfChannels,
      //segment duration
      (end - start) * (originalBuffer.sampleRate * 1),
      originalBuffer.sampleRate
    );
    
    for (var i = 0; i < originalBuffer.numberOfChannels; i++) {
        var chanData = originalBuffer.getChannelData(i);
        var segmentChanData = emptySegment.getChannelData(i);
        for (var j = 0, len = chanData.length; j < end * originalBuffer.sampleRate; j++) {
            segmentChanData[j] = chanData[j + (start * originalBuffer.sampleRate)];
        }
    }
  
    wavesurfer.current.loadDecodedBuffer(emptySegment); // Here you go!
                // Not empty anymore, contains a copy of the segment!
    console.log(end, start, end-start)
  }
  
  const deleteSelectedRegion = () => {
    // I had to fixed to two decimal if I don't do this not work, I don't know whyyy
    const start = wavesurfer.current.regions.list[Object.keys(wavesurfer.current.regions.list)[0]].start.toFixed(2);
    const end = wavesurfer.current.regions.list[Object.keys(wavesurfer.current.regions.list)[0]].end.toFixed(2);
    const originalBuffer = wavesurfer.current.backend.buffer;
    console.log(end, start,end , start,originalBuffer, (end - start) * (originalBuffer.sampleRate * 1))
    var emptySegment = wavesurfer.current.backend.ac.createBuffer(
      originalBuffer.numberOfChannels,
      (wavesurfer.current.getDuration() - (end - start)) * (originalBuffer.sampleRate * 1),
      originalBuffer.sampleRate
    );
    console.log("Current wave duration",wavesurfer.current.getDuration(), end, start)
    
    for (let i = 0; i < originalBuffer.numberOfChannels; i++) {
      let chanData = originalBuffer.getChannelData(i);
      let segmentChanData = emptySegment.getChannelData(i);
      let offset = end * originalBuffer.sampleRate;
      for (let j = 0; j < originalBuffer.length; j++) {
        if (j < (start * originalBuffer.sampleRate)) {
          //TODO: contemplate other cases when the region is at the end
          segmentChanData[j] = chanData[j];
        } else {
          segmentChanData[j] = chanData[offset];
          offset++;
        }
      }
    }
  //   wavesurfer.current.drawer.clearWave();
    
  // wavesurfer.empty();
  //  reload()
    wavesurfer.current.loadDecodedBuffer(emptySegment); // Here you go!
                // Not empty anymore, contains a copy of the segment!
    console.log(end, start, end-start)
    //wavesurfer.drawBuffer();
  
  }

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
        <a class="px-2 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-100" >
              <button 
                    title="Trim selected region"
                    class="text-gray-500 
                    bg-transparent border 
                    border-solid border-blue-500 
                    hover:bg-blue-900 hover:text-white 
                    active:bg-blue-900 font-bold 
                    uppercase px-2 py-2 rounded-full 
                    outline-none focus:outline-none 
                    ease-linear transition-all duration-150" type="button"
                    onClick={trimRegion}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M5.5 2a3.5 3.5 0 101.665 6.58L8.585 10l-1.42 1.42a3.5 3.5 0 101.414 1.414l8.128-8.127a1 1 0 00-1.414-1.414L10 8.586l-1.42-1.42A3.5 3.5 0 005.5 2zM4 5.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 9a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clip-rule="evenodd" />
                      <path d="M12.828 11.414a1 1 0 00-1.414 1.414l3.879 3.88a1 1 0 001.414-1.415l-3.879-3.879z" />
                    </svg>
                </button>
          </a>
        <a class="px-2 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-100" >
              <button 
                    title="Remove selected region"
                    class="text-gray-500 
                    bg-transparent border 
                    border-solid border-gray-500 
                    hover:bg-gray-900 hover:text-white 
                    active:bg-gray-900 font-bold 
                    uppercase px-2 py-2 rounded-full 
                    outline-none focus:outline-none 
                    ease-linear transition-all duration-150" type="button"
                    onClick={deleteSelectedRegion}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                </button>
              </a>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clip-rule="evenodd" />
        </svg>
        <input
          type="range"
          id="volume"
          name="volume"
          // waveSurfer recognize value of `0` same as `1`
          //  so we need to set some zero-ish value for silence
          min="0.01"
          max="1"
          step=".025"
          onChange={onVolumeChange}
          defaultValue={volume}/>
          <span  class="flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-100" >
              <button 
                    style={{display:"inline-flex"}}
                    title="Play selected region"
                    class="m-2 text-blue-500 
                    bg-transparent border 
                    border-solid border-blue-500 
                    hover:bg-blue-900 hover:text-white 
                    active:bg-blue-900 font-bold 
                    uppercase px-2 py-2 rounded-full 
                    outline-none focus:outline-none 
                    ease-linear transition-all duration-150" type="button"
                    onClick={playRegion}
                >
                
                {!playingRegion ? (
                  <>
                  <span><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                </svg></span>
                <span class="px-2 ml-2">
                  Play Region
                </span>
                </>
                ):(
                  <>
                  <span><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                  </span>
                  <span class="px-1 ml-2">
                    Pause Region
                </span>
                </>
                )}
                </button>
              </span>
      </div>
    </div>
  );
}
