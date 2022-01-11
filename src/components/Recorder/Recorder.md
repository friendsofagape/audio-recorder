```js
import React, { Fragment, useState } from 'react';
import RecorderContextProvider from '../context/RecorderContext';
import SnackBar from '../SnackBar';

const BasicRecorder = () => {
	return (
		<RecorderContextProvider>
			<Recorder />
		</RecorderContextProvider>
	);
};
<BasicRecorder />;
```
