import React, {useEffect} from 'react';
import { useLocation } from 'react-router-dom';

const SearchPage = () => {
	const location = useLocation();
	useEffect(() => {
		console.log(location.pathname.replace('/search/', ''))
	}, []);

	return (
			<div className='search-page'>
                
			</div>
	)
}

export default SearchPage;