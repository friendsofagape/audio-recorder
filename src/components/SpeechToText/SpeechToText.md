```js
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import SpeechRecognition from './SpeechRecognition';
import { useState } from 'react';
import languages from './languages.json';
const SpeechToText = () => {
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
			<SpeechRecognition langaugeCode={langaugeCode} />
			<div class='mt-4'>
				<span class='text-gray-700 mr-4'>Select language</span>
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
