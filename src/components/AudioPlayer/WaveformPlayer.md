```js
import React, { useState } from 'react';
// import "./styles.css";

import WaveformPlayer from './WaveformPlayer';

// const fileurl = "../../../public/media/everbe.mp3";

const tracks = [
	{
		id: 1,
		title: 'Ever Be Instrumental',
		file: '../../../public/media/everbe.mp3',
	},
];

function AudioPlayer() {
	const [selectedTrack, setSelectedTrack] = useState(tracks[0]);

	return (
		// pass file or fileUrl
		<div>
			<WaveformPlayer src={selectedTrack.file} />
		</div>
	);
}

<AudioPlayer />;
```
