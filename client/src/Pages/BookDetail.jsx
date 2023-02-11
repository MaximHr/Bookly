import React, { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfStroke, faSpinner} from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import RateCard from '../Components/RateCard';
import CommentSection from '../Components/CommentSection';
import {Text} from '../Components/Translate';
import Page404 from './Page404';

// компонент, показващ страницата с повече информация за книгата
const BookDetail = ({user, setUser}) => {
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
			const response = await axios.get(`/comments/byBook/${data.id}`);

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
				const response = await axios.put('/users/addBook', {userId: user.id, bookId: book.id});
				
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
				const response = await axios.post('/stripe/payment', {
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
			const response = await axios.get(`/books/details/${location.pathname.replace('/book/', '')}`);
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
						<p><Text>About</Text>:</p>
						<ul>
							<li><Text>Name</Text>: <i>{book.name}</i></li>
							<li><Text>Age</Text>: <i>{book.age}</i></li>
							<li><Text>Bio</Text>: <i>{book.bio}</i></li>
							<li><Text>Gender</Text>: <i>{book.gender}</i></li>
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
						<h2 className='rate-btn' onClick={rateHandler}><Text>Rate</Text></h2>
						</div>
						<p className='description'>{book.description}</p>
						<div className="flex">
							<p className='price'>
								{book.price === 0 ? <Text>Free</Text>: book.price + " BGN"}
							</p>
							<button className="btn" onClick={readAndBuyHandler}>
								{book.price === 0 || user.boughtbooks?.includes(book.id) || book.user_id === user.id ? <Text>StartReading</Text>: <>
								{ loading ? 
									<FontAwesomeIcon icon={faSpinner} className='spinner'/> : <></>
								} <Text>Buy</Text></>}
							</button>
						</div>
						
					</div>
				</div>
				{
					toggleCard ? <RateCard 
						user={user} 
						book={book} 
						setUser={setUser}
						setBook={setBook}
						setRating={setRating}
						setToggleCard={setToggleCard} 
					/> : <></>
				}
				<CommentSection 
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