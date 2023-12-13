import React, { useRef } from 'react';

const SearchBar = ({ setQuery, setPage }) => {
	console.log('search bar render');
	const inputRef = useRef();
	const handleSubmit = (e) => {
		e.preventDefault();
		setQuery(inputRef.current.value ? inputRef.current.value : 'random');
		setPage(1);
	};
	return (
		<form action="" onSubmit={handleSubmit}>
			<input
				className="mt-5 w-full py-3 px-2 rounded-md border border-slate-400 outline-slate-500"
				type="text"
				placeholder="Look for something..."
				autoComplete="off"
				onChange={(e) => {
					!e.target.value && setQuery('random');
				}}
				ref={inputRef}
			/>
		</form>
	);
};
export default React.memo(SearchBar);
