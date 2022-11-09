import React, { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CommentSection from '../Components/CommentSection';

const BookDetail = ({user, setUser}) => {
	const location = useLocation();
	const [book, setBook] = useState({});
	const navigate = useNavigate();
	const [comments, setComments] = useState([]);

	const getComments = async(data) => {
		try {	
			const response = await axios.get(`http://localhost:5000/comments/byBook/${data.id}`);

			if(response.status === 200) {
				console.log(response.data)
				setComments(response.data);
			}
		}catch(err) {
			console.log(err);
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
			console.log('buy this book')
		}
	}

	const getInfo = async() => {
		try {
			const response = await axios.get(`http://localhost:5000/books/details/${location.pathname.replace('/book/', '')}`);
			if(response.status === 200) {
				setBook(response.data);
				getComments(response.data);
			}
		}catch(err) {
			console.log(err);
		}
	}
	useEffect(() => {
		getInfo();
		
	}, []);
	return (
		<div className='detailsPage'>
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
									<div key={index} className="tag">
										{tag}
									</div>
								)
							})
						}
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
			<CommentSection book={book} user={user} comments={comments} setComments={setComments}/>
		</div>
	)
}

export default BookDetail;