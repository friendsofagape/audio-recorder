import React, {useState, useEffect} from 'react';
import Crunker from "crunker"


const PlayerFooter = props => {
    const {playlist} = props;
    const [seekTime, UpdateSeekTime] = useState();
    const [format, UpdateFormat] = useState("seconds");
    const [playbackSpeed, UpdatePlaybackSpeed] = useState(1);
    const ee = playlist && playlist.getEventEmitter();

    const masterGain = (e) => {
        ee.emit("mastervolumechange", e.target.value);
    };
    const speedUpdateHandler = (e) => {
        const speed = e.target.value;
        UpdatePlaybackSpeed(speed);
        ee.emit("speedchange", speed);
    }

    useEffect(() => {
        /*
        * Code below receives updates from the playlist.
        */
        function displaySoundStatus(status) {
            document.querySelector(".sound-status").innerHTML = status;
        }
        
        ee.on("mute", function(track) {
            displaySoundStatus("Mute button pressed for " + track.name);
        });
        
        ee.on("solo", function(track) {
            displaySoundStatus("Solo button pressed for " + track.name);
        });
        
        ee.on("volumechange", function(volume, track) {
            displaySoundStatus(track.name + " now has volume " + volume + ".");
        });
        
        ee.on("mastervolumechange", function(volume) {
            displaySoundStatus("Master volume now has volume " + volume + ".");
        });
           
        ee.on('audiorenderingfinished', async function (type, data) {
            console.log(data)
            if (type === 'wav'){
                const crunker = new Crunker({ sampleRate: 48000 })
                await crunker.download(data, "processed_final_audio")
            }
        });
    }, [playlist, ee]);

    return (
        <>
            <div className="flex items-center ">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clip-rule="evenodd" />
                    </svg>
                        <input 
                            type="range" 
                            min="0" 
                            max="100"
                            id="master-gain"
                            defaultValue="70" 
                            onChange={e => masterGain(e)}
                        />
            </div>
        </>
    )
}

export default PlayerFooter;