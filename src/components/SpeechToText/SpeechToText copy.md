```js
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import SpeechRecognition from './SpeechRecognition';
import { useState } from 'react';
import languages from './languages.json';
const SpeechToText = () => {
	const [intermediateTranscript, setIntermediateTranscript] =
		useState('onEnd');
	const [langaugeCode, setLanguageCode] = useState('en-IN');
	const [open, setOpen] = useState(false);

	const handleChange = (event) => {
		setLanguageCode(event.target.value);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleOpen = () => {
		setOpen(true);
	};

	return (
		<>
			<SpeechRecognition
				langaugeCode={langaugeCode}
				intermediateTranscript={intermediateTranscript}
			/>
			{/*<div class='mt-4'>
				<span class='text-gray-700'>Text to be written</span>
				<div
					onChange={(e) => setIntermediateTranscript(e.target.value)}
					class='mt-2'>
					<label class='inline-flex items-center '>
						<input
							type='radio'
							class='form-radio'
							name='accountType'
							value={'intermediate'}
							checked={
								intermediateTranscript === 'intermediate'
									? true
									: false
							}
						/>
						<span class='ml-2'>while speaking</span>
					</label>
					<label class='inline-flex items-center ml-6'>
						<input
							type='radio'
							class='form-radio'
							name='accountType'
							value={'onEnd'}
							checked={
								intermediateTranscript === 'onEnd'
									? true
									: false
							}
						/>
						<span class='ml-2'>at the End</span>
					</label>
				</div>
			</div>*/}
			<div>
				<span class='text-gray-700'>Select language</span>
				<Select
					labelId='demo-controlled-open-select-label'
					id='demo-controlled-open-select'
					defaultValue={languages['English-IN']}
					open={open}
					onClose={handleClose}
					onOpen={handleOpen}
					value={langaugeCode}
					onChange={handleChange}>
					{Object.entries(languages).map(([lang, code]) => (
						<MenuItem value={code}>{lang}</MenuItem>
					))}
				</Select>
			</div>
		</>
	);
};
<SpeechToText />;
```
