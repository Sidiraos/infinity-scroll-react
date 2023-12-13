import React, { forwardRef } from 'react';
const Image = forwardRef(({ image }, ref) => {
	return (
		<img
			className={`w-full h-full object-cover`}
			src={image.src}
			alt={image.alt}
			id={image.id}
			ref={ref}
		/>
	);
});

export default React.memo(Image);
