import React from 'react';
const InfoApp = () => {
	console.log('info App render');
	return (
		<>
			<h1 className="text-4xl">Unsplash Clone.</h1>
			<p className="">Look for images...</p>
		</>
	);
};
export default React.memo(InfoApp);
