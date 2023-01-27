import React, { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfStroke} from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import RateCard from '../Components/RateCard';
import CommentSection from '../Components/CommentSection';

// компонент, показващ страницата с повече информация за книгата
const BookDetail = ({user, setUser}) => {
	const location = useLocation();
	const [book, setBook] = useState({});
	const navigate = useNavigate();
	const [comments, setComments] = useState([]);
	const [rating, setRating] = useState();
	const [stars, setStars] = useState();
	const [toggleCard, setToggleCard] = useState(false);

	const getComments = async(data) => {
		try {	
			const response = await axios.get(`http://localhost:5000/comments/byBook/${data.id}`);

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
		let isItRead = false;
		user.readbooks?.map((userBook) => {
			if(userBook === book.id) {
				isItRead = true;
			}
		})
		if(book.price === '' || book.price === 0) {
			if(!isItRead) {
				const response = await axios.put('http://localhost:5000/users/addBook', {userId: user.id, bookId: book.id});

				setUser(response.data)
				if(response.status === 200) {
					navigate('./read');
				}
			} else {
				navigate('./read');
			}
		} else {
			console.log('buy this book');
		}
	}

	const getInfo = async() => {
		try {
			const response = await axios.get(`http://localhost:5000/books/details/${location.pathname.replace('/book/', '')}`);
			if(response.status === 200) {
				setBook(response.data);				
				setRating(response.data.summedrating / response.data.numberofratings);
				getComments(response.data);
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
		<div className='detailsPage'>
			<ToastContainer />
			<div className='details'>
				<div className="left">
					<img src={book.cover} alt={book.title} />
					<p>About the author:</p>
					<ul>
						<li>Name: <i>{book.name}</i></li>
						<li>Age: <i>{book.age}</i></li>
						<li>School: <i>{book.school}</i></li>
						<li>Gender: <i>{book.gender}</i></li>
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
					<h2 className='rate-btn' onClick={rateHandler}>Rate</h2>
					</div>
					<p className='description'>{book.description}</p>
					<div className="flex">
						<p className='price'>
							{book.price == 0 || book.price == '' ? 'Free': book.price + " BGN"}
						</p>
						<button className="btn" onClick={readAndBuyHandler}>
							{book.price == 0 || book.price == '' ? 'Start reading': "Buy now"}
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
	)
}

export default BookDetail;