import React from 'react';
import ReactAudioPlayer from 'react-audio-player';

const Player = ({srcUrl}) => {
    return (  
        <ReactAudioPlayer
		src={srcUrl}
		controls
	/>
    );
}
 
export default Player;