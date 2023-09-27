import React, { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfStroke, faSpinner} from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import RateCard from '../Components/RateCard';
import CommentSection from '../Components/CommentSection';
import Translate from '../Components/Translate';
import Page404 from './Page404';
import serverurl from '../serverurl';

// компонент, показващ страницата с повече информация за книгата
const BookDetail = ({user, setUser, lang}) => {
	const location = useLocation();
	const [book, setBook] = useState({});
	const navigate = useNavigate();
	const [comments, setComments] = useState([]);
	const [rating, setRating] = useState();
	const [stars, setStars] = useState();
	const [loading, setLoading] = useState(false);
	const [toggleCard, setToggleCard] = useState(false);
	const [pageExists, setPageExists] = useState(true);

	const getComments = async(data) => {
		try {	
			const response = await axios.get(serverurl + `/comments/byBook/${data.id}`);

			if(response.status === 200) {
				setComments(response.data);
			}
		}catch(err) {
			toast.error('Sorry, there was an error. Try again later', {
				autoClose: 2500,
				position: 'top-center'
			});
		}
	}

	const readAndBuyHandler = async() => {
		// ако книгата е безплатна или ти си автора, може да я четеш
		if(book.price === 0 || book.user_id === user.id || user.boughtbooks?.includes(book.id)) {
			try {
				const response = await axios.put(serverurl + `/users/addBook`, {userId: user.id, bookId: book.id});
				
				setUser(response.data);
				if(response.status === 200) {
					navigate('./read', { state: {...book} });
				}
			} catch(err) {
				toast.error('Sorry, there was an error. Try again later', {
					autoClose: 2500,
					position: 'top-center'
				});
			}
		} else if(book.price > 0) {
			//закупуване на книгата
			setLoading(true);
			try {
				console.log(user);
				const response = await axios.post(serverurl + `/stripe/payment`, {
					...book,
					userId: user.id
				});
				if(response.status === 200) {
					window.location.href = response.data;
				}

			}catch(err) {
				setLoading(false);
				toast.error('Sorry, there was an error. Try again later', {
					autoClose: 2500,
					position: 'top-center'
				});
			}
		}
	}

	const getInfo = async() => {
		try {
			const response = await axios.get(serverurl + `/books/details/${location.pathname.replace('/book/', '')}`);
			if(response.status === 200) {
				if(response.data) {
					setBook(response.data);				
					setRating(response.data.summedrating / response.data.numberofratings);
					getComments(response.data);
				} else {
					setPageExists(false);
				}

			}
		}catch(err) {
			toast.error('Sorry, there was an error. Try again later', {
				autoClose: 2500,
				position: 'top-center'
			});
		}
	}

	useEffect(() => {
		getInfo();
		window.scrollTo(0, 0);
		
	}, []);

	const rateHandler = () => {
		let isRated = false;
		for(let i = 0;user.ratedbooks && i < user.ratedbooks.length;i++) {
			if(user.ratedbooks[i] === book.id) {
				isRated = true;
			}
		}
		if(!isRated) {
			setToggleCard(!toggleCard)
		} else {
			toast.info('you have already rated this book', {
				autoClose: 2500,
				position: 'top-center'
			});
		}
	}

	useEffect(() => {
		// превръща рейтинга в звезди
		let starArr = [];
		if(!rating) {
			// ако няма рейтинг, се показват 5 празни звезди
			for(let i = 0;i < 5;i++) {
				starArr.push(<FontAwesomeIcon key={i} icon={faStar} className='empty' />);
			}
		} else {
			// запълнените звезди
			for(let i = 0;i < Math.floor(rating);i ++) {
				starArr.push(<FontAwesomeIcon key={i} icon={faStar} className='filled'/>);
			}
			//полузапълнени звезди
			if(rating >= Math.floor(rating) + 0.5) {
				starArr.push(
					<FontAwesomeIcon 
						icon={faStarHalfStroke} 
						key={Math.random() * 100} 
						className='filled'
					/>
				)
			}
			// останалите звезди са празни
			for(let i = starArr.length;i < 5;i++) {
				starArr.push(
					<FontAwesomeIcon 
						icon={faStar} 
						key={Math.random() * 100} 
						className='empty'
					/>
				)
			}
		}
		
		setStars(starArr);
	}, [rating]);
	return (
		<>
		{
		pageExists ? (
			<div className='detailsPage'>
				<ToastContainer />
				<div className='details'>
					<div className="left">
						<img src={book.cover} alt={book.title} />
						<p>{lang === 'bulgarian' ? Translate.About.bulgarian : Translate.About.british}:</p>
						<ul>
							<li>{lang === 'bulgarian' ? Translate.Name.bulgarian : Translate.Name.british}: <i>{book.name}</i></li>
							<li>{lang === 'bulgarian' ? Translate.Age.bulgarian : Translate.Age.british}: <i>{book.age}</i></li>
							<li>{lang === 'bulgarian' ? Translate.Bio.bulgarian : Translate.Bio.british}: <i>{book.bio}</i></li>
							<li>{lang === 'bulgarian' ? Translate.Gender.bulgarian : Translate.Gender.british}: <i>{book.gender}</i></li>
						</ul>
					</div>
					<div className="right">
						<h1 className="title">{book.title}</h1>
						<div className="tags">
							{
								book?.tags?.map((tag, index) => {
									return (
										<Link 
											to={`/search/${tag}`}
											key={index} 
											className="tag"
											title={`Search for ${tag}`}
										>
											{tag}
										</Link>
									)
								})
							}
						</div>
						<div className="stars" title={Math.floor(rating * 100) / 100 || 'No ratings'}>
						{
							stars
						}
						<h2 className='rate-btn' onClick={rateHandler}>{lang === 'bulgarian' ? Translate.Rate.bulgarian : Translate.Rate.british}</h2>
						</div>
						<p className='description'>{book.description}</p>
						<div className="flex">
							<p className='price'>
								{(book.price == 0 && lang ==='bulgarian') ? Translate.Free.bulgarian: <></>}
								{(book.price == 0 && lang ==='british') ? Translate.Free.british: <></>}
								{(book.price != 0) ? book.price + ' BGN': <></>}
							</p>
							<button className="btn" onClick={readAndBuyHandler}>
							{book.price == 0 || user.boughtbooks?.includes(book.id) || book.user_id === user.id ? Translate.StartReading.british: <>
								{ loading ? 
									<FontAwesomeIcon icon={faSpinner} className='spinner'/> : <></>
								} {lang === 'bulgarian' ? Translate.Buy.bulgarian : Translate.Buy.british}</>}
							</button>
						</div>
						
					</div>
				</div>
				{
					toggleCard ? <RateCard 
						user={user} 
						book={book} 
						lang={lang}
						setUser={setUser}
						setBook={setBook}
						setRating={setRating}
						setToggleCard={setToggleCard} 
					/> : <></>
				}
				<CommentSection 
					lang={lang}
					book={book} 
					user={user} 
					comments={comments} 
					setComments={setComments}
				/>
			</div>
		) : (<Page404 />) 
		}
		</>
	)
}

export default BookDetail;