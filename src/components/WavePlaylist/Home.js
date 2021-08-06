import React, {useState, useEffect} from 'react';
import PageContainer from './common/PageContainer';
import UploadForm from './UploadForm.js';
import AudioPlayer from './AudioPlayer/index.js';
import EventEmitter  from 'event-emitter';
import {init} from 'waveform-playlist';

const Home = () => {
    const [inputFiles, setFileValue] = useState([]);
    const [playlist, updatePlaylist] = useState();
    const [list, updateList] = useState([]);
    const updateFile = event => {
        setFileValue(event.target.files);
    };
    
    useEffect(() => {
        if(document.getElementById("playlist")){
            let pl = init(
            {   
                samplesPerPixel: 3000,
                mono: true,
                waveHeight: 200,
                container: document.getElementById("playlist"),
                state: "cursor",
                barWidth: 4,
                barRadius: 4,
                responsive: 1000,
                cursorWidth: 1,
                normalize: true,
                waveBackgroundColor: "#f3f3f3",
                // Use the PeakCache to improve rendering speed of large waveforms.
                partialRender: true,
                colors: {
                    waveOutlineColor: "#D2EDD4",
                    timeColor: "#46B54D",
                    fadeColor: "blue"
                },
                controls: {
                    // whether or not to include the track controls
                    show: true,
                
                    // width of controls in pixels
                    width: 200,
                    
                    // whether to render the widget or not in the controls panel.
                    widgets: {
                      // Mute & solo button widget
                      muteOrSolo: true,
                      
                      // Volume slider
                      volume: true,
                      
                      // Stereo pan slider
                      stereoPan: true,
                      
                      // Collapse track button
                      collapse: true,
                      
                      // Remove track button
                      remove: true,
                      
                    },
                  },
                zoomLevels: [500, 1000, 3000, 5000],
                play:"start",
                timescale: true,
            },
        
            // you can pass your own event emitter
            EventEmitter()
          );
          updatePlaylist(pl);
        }
    }, [updatePlaylist]);

    function truncate(str, n){
        return (str.length > n) ? str.substr(0, n-1) + '... .mp3' : str;
    };

    useEffect(() => {
        if(inputFiles){
            let newList = [];
            for (var i = 0; i < inputFiles.length; i++) {
                var obj = {
                    src: inputFiles[i],
                    name: truncate(inputFiles[i].name, 14)
                }
                newList.push(obj);
            }
            updateList(newList);
        }
    }, [inputFiles, updateList]);

    useEffect(() => {
        if(playlist){
            playlist
            .load(list)
            .then(function() {
                // can do stuff with the playlist.
                //initialize the WAV exporter.
                playlist.initExporter();
            });
        }
      }, [playlist, list])

    return (
        <PageContainer componentClass="home">
            <AudioPlayer inputValue={inputFiles} playlist={playlist} />
            <UploadForm updateInputValue={updateFile} />                  
        </PageContainer>
    )
}

export default Home;