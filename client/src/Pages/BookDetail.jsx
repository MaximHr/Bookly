import React, { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import axios from 'axios';

const BookDetail = () => {
	const location = useLocation();
	const [book, setBook] = useState({});

	const getInfo = async() => {
		try {
			const response = await axios.get(`http://localhost:5000/books/details/${location.pathname.replace('/book/', '')}`);
			if(response.status === 200) {
				setBook(response.data)
			}
		}catch(err) {
			console.log(err);
		}
	}
	useEffect(() => {
		getInfo();
		
	}, []);
	return (
		<div className='detailsPage container'>
			<div className="left">
				<img src={book.cover} alt={book.title} />
				<p>About the author:</p>
				<ul>
					<li>Name: <i>{book.name}</i></li>
					<li>Age: <i>{book.age}</i></li>
					<li>School: <i>{book.school}</i></li>
				</ul>
			</div>
			<div className="right">
				<h1 className="title">{book.title}</h1>
				<p className='description'>{book.description}</p>
				<div className="flex">
					<p className='price'>{book.price == 0 || book.price == '' ? 'Free': book.price + " BGN"}</p>
					<button className="btn">{book.price == 0 || book.price == '' ? 'Start reading': "Buy now"}</button>
				</div>
				
			</div>
		</div>
	)
}

export default BookDetail;