import React, {useEffect, useState} from 'react';
import { useLocation, Link } from 'react-router-dom';
import {Text} from '../Components/Translate';

const ReadingPage = ({user}) => {
	const location = useLocation();
	const bookId = location.pathname.replace('/book/', '').replace('/read', '');
	const [available, setAvailable] = useState(false);

	useEffect(() => {
		if(location.state?.price === 0 || location.state?.id === user.id) {
			setAvailable(true);
		} else if(location.state === null){
			setAvailable(false);
		} else if(location.state?.price > 0 && user.boughtbooks?.includes(location.state.id)) {
			setAvailable(true);
		}
	}, [location]);

	return (
		<div className='reading-page'>
			{
			available ? 
				<iframe 
					title='Book'
					src={require(`../files/${bookId}.pdf`) + "#view=FitH"}
				></iframe> : 
				<div className='access-denied'>
					<h1><Text>AccessDenied</Text></h1>
					<h2><Text>Security</Text></h2>
					<Link to='/home' className='btn'><Text>GoHome</Text></Link>
				</div>
			}
		</div>
	)
}

export default ReadingPage;