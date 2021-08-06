import React, {useEffect, useState} from 'react';

const PlayerControls = props => {
    const {playlist} = props;
    const [isLooping, updateLooping] = useState(false);
    // retrieves the event emitter the playlist is using.
    const ee = playlist && playlist.getEventEmitter();
    let playoutPromises;
    let startTime = 0;
    let endTime = 0;

    useEffect(() => {
        ee.on('finished', function () {
            console.log("The cursor has reached the end of the selection !");
          
            if (isLooping && playoutPromises) {
              playoutPromises.then(function() {
                playoutPromises = playlist.play(startTime, endTime);
              });
            }
          });
    }, [isLooping, ee, playlist, playoutPromises, startTime, endTime]);

    const toggleActive = node => {
        var active = node.parentNode.querySelectorAll('.active');
        var i = 0, len = active.length;
        for (; i < len; i++) {
          active[i].classList.remove('active');
        }
      
        node.classList.toggle('active');
    };
    const playVideo = () => {
        ee.emit("play");
    };
    const pauseVideo = () => {
        updateLooping(false);
        ee.emit("pause");
    };
    const stopAudio = () =>{
        updateLooping(false);
        ee.emit("stop");
    };
    const zoominOut = zoomIn => {
        if(zoomIn){
            ee.emit("zoomin");
        } else{
            ee.emit("zoomout");
        }
    };
    const cursorUpdate = e => {
        ee.emit("statechange", "cursor");
        toggleActive(e.target);
    };
    const playFromLastSelection = () => {
        updateLooping(true);
        playoutPromises = playlist.play(startTime, endTime);
    };
    const select = e => {
        ee.emit("statechange", "select");
        toggleActive(e.target);
    };
    // 
    const shiftWave = e => {
        ee.emit("statechange", "shift");
        toggleActive(e.target);
    };
      
    const fadeIn = e => {
        ee.emit("statechange", "fadein");
        toggleActive(e.target);
    };
    const fadeOut = e => {
        ee.emit("statechange", "fadeout");
        toggleActive(e.target);
    };
      
      //fade types
    const logarithmicWave = e => {
        ee.emit("fadetype", "logarithmic");
        toggleActive(e.target);
    };
      
    const linearWave = e => {
        ee.emit("fadetype", "linear");
        toggleActive(e.target);
    };
      
    const scurveWave = e => {
        ee.emit("fadetype", "sCurve");
        toggleActive(e.target);
    };
      
    const exponentialWave = e => {
        ee.emit("fadetype", "exponential");
        toggleActive(e.target);
    };
      
    const trimAudio = () => {
        ee.emit("trim");
    };
    // 
    const downloadAudio = () => {
        ee.emit('startaudiorendering', 'wav');
    };

    return (
        <>
        <div class="py-10">
    <nav class="items-center justify-between px-2 py-3 bg-gray-100 rounded">
      <div class="container px-2  mx-auto flex flex-wrap items-center justify-between">
        <div class="flex-grow items-center" id="example-navbar-warning">
          <ul class="flex flex-col lg:flex-row list-none ml-auto">
                <li class="nav-item">
                <span title="play">
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
                    onClick={playVideo}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                    </svg>
                </button>
              </a>
                </span>
                </li>
                <li class="nav-item">
                <span title="pause">
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
                    onClick={pauseVideo}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                </button>
              </a>
                </span>
                </li>
                <li class="nav-item">
                <span title="stop" >
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
                          onClick={stopAudio}
                      >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clip-rule="evenodd" />
                    </svg>
                </button>
              </a>
                </span>
                </li>
                <li class="nav-item">
                <span title="play from last selection">
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
                          onClick={playFromLastSelection}
                      >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                </button>
              </a>
                </span>
                </li>
                </ul>
                </div>
                </div>
                  <div class="container px-2  mx-auto flex flex-wrap items-center justify-between">
                    <div class="flex-grow items-center" id="example-navbar-warning">
                      <ul class="flex flex-col lg:flex-row list-none ml-auto">
                      <li class="nav-item">
                <span title="zoom in">
                <a class="px-2 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-100" >
                    <button 
                          class="text-gray-500 active:bg-green-700
                          bg-transparent border 
                          border-solid border-gray-500 
                          hover:bg-gray-900 hover:text-white 
                          active:bg-gray-900 font-bold 
                          uppercase px-2 py-2 rounded-full 
                          outline-none focus:outline-none 
                          ease-linear transition-all duration-150" type="button"
                          onClick={() => zoominOut(true)}
                      >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                </button>
              </a>
                </span>
                </li>
                <li class="nav-item">
                <span title="zoom out" >
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
                          onClick={() => zoominOut(false)}
                      >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                    </svg>
                </button>
              </a>
                </span>
                </li>
                <li class="nav-item">
                <span title="select cursor">
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
                          onClick={e => cursorUpdate(e)}
                      >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z" clip-rule="evenodd" />
                    </svg>
                </button>
              </a>
                </span>
                </li>
                <li class="nav-item">
                <span title="select audio region" onClick={e => select(e)}>
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
                          onClick={stopAudio}
                      >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 transform rotate-90" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                </button>
              </a>
                </span>
                </li>
                <li class="nav-item">
                <span title="trim the selected region" onClick={trimAudio}>
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
                          onClick={stopAudio}
                      >
                     <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M5.5 2a3.5 3.5 0 101.665 6.58L8.585 10l-1.42 1.42a3.5 3.5 0 101.414 1.414l8.128-8.127a1 1 0 00-1.414-1.414L10 8.586l-1.42-1.42A3.5 3.5 0 005.5 2zM4 5.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 9a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clip-rule="evenodd" />
                      <path d="M12.828 11.414a1 1 0 00-1.414 1.414l3.879 3.88a1 1 0 001.414-1.415l-3.879-3.879z" />
                    </svg>
                </button>
              </a>
                </span>
                </li>
                <li class="nav-item">
                <span title="shift audio in time" onClick={e => shiftWave(e)}>
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
                          onClick={stopAudio}
                      >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                        <path stroke="#374151" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8V4m0 0h4M3 4l4 4m8 0V4m0 0h-4m4 0l-4 4m-8 4v4m0 0h4m-4 0l4-4m8 4l-4-4m4 4v-4m0 4h-4" />
                    </svg>
                </button>
              </a>
                </span>
                </li>
                <li class="nav-item">
                <span title="set audio fade in" onClick={e => fadeIn(e)}>
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
                          onClick={stopAudio}
                      >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                    </svg>
                </button>
              </a>
                </span>
                </li>
                <li class="nav-item">
                <span title="set audio fade out" onClick={e => fadeOut(e)}>
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
                          onClick={stopAudio}
                      >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" style={{ transform: "rotateY(180deg)" }} viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                    </svg>
                </button>
              </a>
                </span>
                </li>
                <li class="nav-item">
                <span title="download processed audio" onClick={downloadAudio}>
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
                          onClick={stopAudio}
                      >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                </button>
              </a>
                </span>
                </li>
                </ul>
                </div>
                </div>
                </nav>
                </div>



                {/* <div className="btn-group btn-select-state-group">
                <span className="btn-loop btn btn-success disabled" title="loop a selected segment of audio" onClick={playFromLastSelection}>
                    <i className="fa fa-repeat"></i>
                </span>
                </div>
                <div className="btn-group">
                <span title="Download the current work as Wav file" className="btn btn-download btn-primary" onClick={downloadAudio}>
                    <i className="fa fa-download"></i>
                </span>
                </div> */}


                <div class="flex justify-center rounded-lg text-lg mb-4" role="group">
                <button 
                class="bg-blue-500 
                text-white active
                uppercase
                hover:bg-blue-400 rounded-l-lg px-4 py-2 mx-0 outline-none 
                focus:shadow-outline"><span onClick={e => logarithmicWave(e)}>Logarithmic</span></button>
                <button 
                class="bg-blue-500 text-white hover:bg-blue-400  
                px-4 py-2 mx-0 outline-none uppercase 
                focus:shadow-outline">
                <span onClick={e => linearWave(e)}>linear</span>
                </button>
                <button 
                class="bg-blue-500 text-white hover:bg-blue-400  
                px-4 py-2 mx-0 outline-none uppercase 
                focus:shadow-outline">
                 <span
                    onClick={e => scurveWave(e)}>
                    s-curve
                    </span>
                </button>
                <button 
                class="bg-blue-500 text-white hover:bg-blue-400 rounded-r-lg px-4 
                py-2 mx-0 outline-none uppercase
                focus:shadow-outline">
                <span 
                onClick={e => exponentialWave(e)}>exponential</span>
                </button>
                </div>
    </>
                
    )
}

export default PlayerControls;