import { useState, useEffect } from 'react';

const usePhotos = (query, page) => {
	const [err, setErr] = useState(null);
	const [loading, setLoading] = useState(true);
	const [gallery, setGallery] = useState([]);
	const [maxPages, setMaxPages] = useState(0);

	useEffect(() => {
		if (gallery.length > 0 && maxPages > 0) {
			setGallery([]);
			setMaxPages(0);
			setLoading(true);
		}
	}, [query]);

	useEffect(() => {
		const API_KEY = import.meta.env.VITE_API_KEY;
		setLoading(true);
		fetch(`https://api.unsplash.com/search/photos?client_id=${API_KEY};page=${page}&per_page=30&query=${query}`)
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
				throw new Error('Something went wrong , Error : ', res.status);
			})
			.then((data) => {
				const images = data.results.map((result) => {
					return {
						id: result.id,
						src: result.urls.regular,
						alt: result.alt_description,
					};
				});
				setGallery((state) => [...state, ...images]);
				setMaxPages(data.total_pages);
				setLoading(false);
				setErr(null);
			})
			.catch((error) => {
				setErr(error.message);
				console.log(error.message);
				setLoading(false);
			});
	}, [page, query]);

	return {
		gallery,
		loading,
		err,
		maxPages,
		setLoading,
	};
};

export default usePhotos;
