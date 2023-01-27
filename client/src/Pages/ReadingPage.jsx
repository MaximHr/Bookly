import React from 'react';
import { useLocation } from 'react-router-dom';

const ReadingPage = () => {
	const location = useLocation();
	const bookId = location.pathname.replace('/book/', '').replace('/read', '');

	return (
		<div className='reading-page'>
			<iframe 
				src={require(`../files/${bookId}.pdf`) + "#view=FitH"}
			>

			</iframe>
		</div>
	)
}

export default ReadingPage;