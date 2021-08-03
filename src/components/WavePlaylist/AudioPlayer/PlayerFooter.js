import React, {useState, useEffect} from 'react';

const PlayerFooter = props => {
    const {playlist} = props;
    const [seekTime, UpdateSeekTime] = useState();
    const [format, UpdateFormat] = useState("seconds");
    const [playbackSpeed, UpdatePlaybackSpeed] = useState(1);
    // let audioPos = 0, startTime = 0, endTime = 0;
    // let downloadUrl = undefined;
    // retrieves the event emitter the playlist is using.
    const ee = playlist && playlist.getEventEmitter();
    // const cueFormatters = () => {
    //     function clockFormat(seconds, decimals) {
    //       var hours,
    //           minutes,
    //           secs,
    //           result;
      
    //       hours = parseInt(seconds / 3600, 10) % 24;
    //       minutes = parseInt(seconds / 60, 10) % 60;
    //       secs = seconds % 60;
    //       secs = secs.toFixed(decimals);
      
    //       result = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (secs < 10 ? "0" + secs : secs);
      
    //       return result;
    //     }
      
    //     var formats = {
    //       "seconds": function (seconds) {
    //           return seconds.toFixed(0);
    //       },
    //       "thousandths": function (seconds) {
    //           return seconds.toFixed(3);
    //       },
    //       "hh:mm:ss": function (seconds) {
    //           return clockFormat(seconds, 0);   
    //       },
    //       "hh:mm:ss.u": function (seconds) {
    //           return clockFormat(seconds, 1);   
    //       },
    //       "hh:mm:ss.uu": function (seconds) {
    //           return clockFormat(seconds, 2);   
    //       },
    //       "hh:mm:ss.uuu": function (seconds) {
    //           return clockFormat(seconds, 3);   
    //       }
    //     };
      
    //     return formats[format];
    // };
    // const updateSelect = (start, end) => {
    //     if (start < end) {
    //         document.querySelector('.btn-trim-audio').classList.remove('disabled');
    //         document.querySelector('.btn-loop').classList.remove('disabled');
    //     }else {
    //         document.querySelector('.btn-trim-audio').classList.add('disabled');
    //         document.querySelector('.btn-loop').classList.add('disabled');
    //     }      
    //     document.querySelector('.audio-start').value = cueFormatters(format)(start);
    //     document.querySelector('.audio-end').value = cueFormatters(format)(end);
      
    //     startTime = start;
    //     endTime = end;
    // };
    // const updateTime = (time) => {
    //     document.querySelector('.audio-pos').innerHTML = cueFormatters(format)(time);
    //     audioPos = time;
    // };
    // const seektTimeHandler = () => {
    //     var time = parseInt(seekTime, 10);
    //     ee.emit("select", time, time);
    // };
    // const timeFormatHandler = (e) => {
    //     const formatValue = e.target.value;
    //     ee.emit("durationformat", formatValue);
    //     UpdateFormat(formatValue);
    //     updateSelect(startTime, endTime, formatValue);
    //     // updateTime(audioPos, formatValue);
    // };
    const displayDownloadLink = (link) => {
        let dateString = (new Date()).toISOString();
        let $link = document.createElement("a");
        $link.href = link;
        $link.download = 'waveformplaylist' + dateString + '.wav';
        $link.text = 'Download mix ' + dateString;
        $link.className = 'btn btn-small btn-download-link';
        if(document.querySelector('.btn-download-link')){
            document.querySelector('.btn-download-link').remove();
        }
        document.querySelector('.btn-download').parentElement.appendChild($link);
    }

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
        
        // ee.on("select", updateSelect);
        
        // ee.on("timeupdate", updateTime);
        
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
           
        ee.on('audiorenderingfinished', function (type, data) {
            console.log(data)
            if (type === 'wav'){
                let downloadUrl = window.URL.createObjectURL(data);
                displayDownloadLink(downloadUrl);
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
            {/* <form className="form-inline">
                <select className="time-format form-control" onChange={e => timeFormatHandler(e)}>
                <option value="seconds" selected="selected">seconds</option>
                <option value="thousandths">thousandths</option>
                <option value="hh:mm:ss">hh:mm:ss</option>
                <option value="hh:mm:ss.u">hh:mm:ss + tenths</option>
                <option value="hh:mm:ss.uu">hh:mm:ss + hundredths</option>
                <option value="hh:mm:ss.uuu" >hh:mm:ss + milliseconds</option>
                </select>
                <input type="text" className="audio-start input-small form-control" />
                <input type="text" className="audio-end form-control" />
                <label className="audio-pos">00:00:00</label>
            </form> */}
                
            {/* <form className="form-inline">
                <div className="form-group">
                    <label htmlFor="master-gain">Speed change</label>
                    <input 
                        type="range" 
                        min="0.5" 
                        max="4" 
                        step="0.1"
                        className="master-gain form-control" 
                        id="master-gain"
                        defaultValue="1" 
                        onChange={e => speedUpdateHandler(e)}
                    />
                </div>
                <span className="playback-speed">{playbackSpeed}x</span>
            </form> */}
            {/* <form className="form-inline">
                <div className="control-group">
                <label htmlFor="time">Seek to time :</label>
                <input type="number" className="form-control" id="seektime" defaultValue="0" onChange={e => UpdateSeekTime(e.target.value)}/>
                <span className="btn btn-primary btn-seektotime" onClick={seektTimeHandler}>Seek !</span>
                </div>
            </form> */}
            </>
    )
}

export default PlayerFooter;