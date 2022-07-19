import React, {useEffect, useState} from 'react';
import PlayerControls from './PlayerControls';
import PlayerFooter from './PlayerFooter';

import '../../static/css/playlist.scss';

const AudioPlayer = props => {
    const {playlist} = props;
    const [srcRenderState, updatesrcRenderState] = useState(0);
    const ee = playlist && playlist.getEventEmitter();
    useEffect(() => {
        if(playlist && ee){
            ee.on("audiorequeststatechange", function(state, src) {
                updatesrcRenderState(state);
            });
        }
    }, [playlist, ee])
    const renderControls = () => {
        if(srcRenderState === 3){
            return <PlayerControls playlist={playlist} />;
        }         
    }
    const renderFooter = () => {
        if(srcRenderState === 3){
            return <PlayerFooter playlist={playlist} />;
        }         
    }
    
    return (
        <div className="audio-player">
            {renderControls()}
            <div id="playlist"></div>
            {renderFooter()}
            {
                (srcRenderState !== 0 && srcRenderState !== 3) &&
                <div class="animate-spin ml-5 rounded-full h-20 w-20 border-t-2 border-b-2 border-purple-500"></div>
            }
            {(srcRenderState === 0 && srcRenderState === 0) &&
                <img title="import files to activate" class="disabled opacity-30" alt='' src="src\components\WavePlaylist\AudioPlayer\demo.PNG"></img>
            }
        </div>
    )
}

export default AudioPlayer;