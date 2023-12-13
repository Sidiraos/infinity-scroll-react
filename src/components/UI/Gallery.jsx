import React from 'react';

const Gallery = ({ children }) => {
	return (
		<div
			className="grid gap-4 auto-rows-[300px] mt-10 justify-center"
			style={{
				gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
			}}
		>
			{children}
		</div>
	);
};
export default React.memo(Gallery);
