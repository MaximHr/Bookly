import React, {useEffect, useState} from 'react';
import { useLocation, Link } from 'react-router-dom';
import Translate from '../Components/Translate';

const ReadingPage = ({user, lang}) => {
	const location = useLocation();
	const bookId = location.pathname.replace('/book/', '').replace('/read', '');
	const [available, setAvailable] = useState(false);

	useEffect(() => {
		if(location.state?.price == 0 || location.state?.user_id === user.id) {
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
					<h1>{lang === 'bulgarian' ? Translate.AccessDenied.bulgarian : Translate.AccessDenied.british}</h1>
					<h2>{lang === 'bulgarian' ? Translate.Security.bulgarian : Translate.Security.british}</h2>
					<Link to='/home' className='btn'>{lang === 'bulgarian' ? Translate.GoHome.bulgarian : Translate.GoHome.british}</Link>
				</div>
			}
		</div>
	)
}

export default ReadingPage;