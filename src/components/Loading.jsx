import Spinner from '../assets/spinner.svg';
import React from 'react';

const Loading = () => {
	return (
		<div className="flex justify-center items-center w-[200px] h-[200px] mx-auto">
			<img src={Spinner} alt="spinner" className="w-full h-full" />
		</div>
	);
};

export default Loading;
