import { useState, useEffect, useRef } from 'react';
import Image from './components/Image';
import Gallery from './components/UI/Gallery';
import SearchBar from './components/UI/SearchBar';
import InfoApp from './components/UI/InfoApp';
import Loading from './components/Loading';
import Error from './components/Error';
import React from 'react';
import usePhotos from './hooks/usePhotos';

function App() {
	const [page, setPage] = useState(1);
	// console.log(page);
	const [query, setQuery] = useState('random');
	const photoAPIdata = usePhotos(query, page);
	// console.log(photoAPIdata);
	const { gallery, loading, err, maxPages } = photoAPIdata;
	console.log(maxPages, page);
	const lastImageRef = useRef(null);

	// console.dir(photoAPIdata);

	useEffect(() => {
		// console.log(lastImageRef.current);
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting && page < maxPages) {
				setPage(page + 1);
				lastImageRef.current = null;
				observer.disconnect();
				// console.log('intersecting');
			}
		});

		lastImageRef.current && observer.observe(lastImageRef.current);
	}, [photoAPIdata]);

	// console.log('app render');
	// console.log(loading);

	return (
		<div className="min-h-screen bg-gray-100 px-5 pt-20 pb-5">
			<div className="max-w-4xl mx-auto">
				<InfoApp />
				<SearchBar setQuery={setQuery} setPage={setPage} />
				{/* No error but no result */}
				{!err && gallery.length === 0 && !loading && (
					<Error errMsg="No images found" />
				)}
				{/* Error but there are not data */}
				{err && gallery.length === 0 && <Error errMsg={err} />}

				<Gallery>
					{gallery.length > 0 &&
						gallery.map((image, index) => {
							if (gallery.length === index + 1) {
								return (
									<Image
										key={image.id}
										image={image}
										ref={lastImageRef}
									/>
								);
							} else {
								return <Image key={image.id} image={image} />;
							}
						})}
				</Gallery>

				{loading && <Loading />}

				{/* Error but there are data */}
				{err && gallery.length > 0 && <Error errMsg={err} />}

				{/* if we reach the end of the scroll */}
				{page === maxPages && (
					<Error errMsg="No more images , try new search" />
				)}
			</div>
		</div>
	);
}

export default React.memo(App);
