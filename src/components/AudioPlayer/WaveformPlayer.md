```js
import React, { useState } from 'react';
import WaveformPlayer from './WaveformPlayer';

const tracks = [
	{
		id: 1,
		title: 'Ever Be Instrumental',
		file: '../../../public/media/everbe.mp3',
	},
];

function AudioPlayer() {
	const [selectedTrack, setSelectedTrack] = useState(tracks[0]);

	const handleReadFile = (selectorFiles) => {
		const file = selectorFiles.item(0);
		window.fileURL = URL.createObjectURL(file);
		setSelectedTrack({
			title: file.name,
			file: window.fileURL,
		});
	};

	return (
		<div>
			<div class='mt-4 w-50 items-center justify-center bg-grey-lighter'>
				<label class='flex flex-col items-center px-2 py-6 text-blue rounded-lg uppercase border border-blue cursor-pointer hover:bg-gray-100'>
					<svg
						class='w-8 h-8'
						fill='currentColor'
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 20 20'>
						<path d='M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z' />
					</svg>
					<span class='mt-2 w-50 text-base leading-normal'>
						Select audio files
					</span>
					<input
						type='file'
						class='hidden'
						multiple
						onChange={(e) => handleReadFile(e.target.files)}
					/>
				</label>
			</div>
			<span class='inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-indigo-100 bg-indigo-700 rounded'>
				{selectedTrack.title}
			</span>
			<WaveformPlayer src={selectedTrack.file} />
		</div>
	);
}

<AudioPlayer />;
```
