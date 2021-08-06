```js
import React, { Fragment, useState } from 'react';
import Player from './Player';
import RecorderContextProvider from '../context/RecorderContext';
const BasicRecorder = () => {
	return (
		<RecorderContextProvider>
			<Player />
		</RecorderContextProvider>
	);
};
<BasicRecorder />;
```
