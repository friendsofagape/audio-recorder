```js
import React, { Component, createRef, useEffect, useState } from 'react';
import { Decoder, BufferManipulations, Encoder } from 'alamp';
import WaveformEditor from './WaveformEditor';

const tracks = [
	{
		id: 1,
		title: 'Ever Be Instrumental',
		file: '../../../public/media/everbe.mp3',
	},
];
const CompoentTestCode = () => {
	const [selectedTrack, setSelectedTrack] = useState(tracks[0]);
	const [startTime, setStartTime] = useState('00:00:00');
	const [endTime, setEndTime] = useState('00:00:00');
	const [totalTime, setTotalTime] = useState('00:00:00');
	const [remainingTime, setRemainingTime] = useState('00:00:00');

	const handleReadFile = (selectorFiles) => {
		const file = selectorFiles.item(0);
		console.log(file);
		window.fileURL = URL.createObjectURL(file);
		setSelectedTrack({
			title: file.name,
			file: window.fileURL,
		});
	};
	const handleStartTime = (e) => {
		if (e.target.value >= 0) {
			setStartTime(e.target.value);
		}
	};
	const handleEndTime = (e) => {
		if (e.target.value >= 0) {
			setEndTime(e.target.value);
		}
	};

	return (
		<>
			<div class='mt-4 w-100 items-center justify-center bg-grey-lighter'>
				<label class='flex flex-col items-center px-2 py-6 text-blue rounded-lg uppercase border border-blue cursor-pointer hover:bg-gray-100'>
					<svg
						class='w-8 h-8'
						fill='currentColor'
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 20 20'>
						<path d='M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z' />
					</svg>
					<span class='mt-2 w-50 text-center text-base leading-normal'>
						Select audio files
					</span>
					<input
						type='file'
						class='hidden'
						multiple
						onChange={(e) => handleReadFile(e.target.files)}
					/>
				</label>
				<span class='custom-number-input h-10 '>
					<label
						for='custom-input-number'
						class='text-gray-700 text-sm font-semibold'>
						Start Time
					</label>
					<input
						class='text-xs ml-2 md:text-base border h-10 border-gray-400 rounded-lg focus:outline-none text-center'
						name='custom-input-number'
						value={startTime}
						onChange={(e) => handleStartTime(e)}
					/>
				</span>
				<span class='custom-number-input ml-2 h-10 '>
					<label
						for='custom-input-number'
						class='text-gray-700 text-sm font-semibold'>
						End Time
					</label>
					<input
						class='text-xs ml-2 md:text-base border h-10 border-gray-400 rounded-lg focus:outline-none text-center'
						name='custom-input-number'
						value={endTime}
						onChange={(e) => handleEndTime(e)}
					/>
				</span>
				<div class='custom-number-input ml-2 h-10 '>
					<label
						for='custom-input-number'
						class='text-gray-700 text-sm font-semibold'>
						<span class='text-xs ml-2 md:text-base h-10 text-center'>
							{remainingTime}
						</span>
					</label>
				</div>
			</div>
			<span class='inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-indigo-100 bg-indigo-700 rounded'>
				{selectedTrack.title}
			</span>
			<WaveformEditor
				src={selectedTrack.file}
				setStartTime={setStartTime}
				setEndTime={setEndTime}
				setRemainingTime={setRemainingTime}
				totalDuration={setTotalTime}
			/>
		</>
	);
};
<CompoentTestCode />;
```
