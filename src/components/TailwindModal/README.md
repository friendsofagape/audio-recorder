```js
import React, { Fragment, useState } from 'react';

const SetModel = () => {
	let [isOpen, setIsOpen] = useState(false);

	function openModal() {
		setIsOpen(true);
	}
	const Custombutton = (
		<div className='inset-0 flex items-center justify-center'>
			<button
				type='button'
				onClick={openModal}
				className='px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
				Open dialog
			</button>
		</div>
	);
	return (
		<TailwindModal
			button={Custombutton}
			isOpen={isOpen}
			setIsOpen={setIsOpen}
		/>
	);
};
<SetModel />;
```
