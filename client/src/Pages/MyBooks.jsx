import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Card from '../Components/Card';
import { ToastContainer, toast } from 'react-toastify';

// страницата, която показва качените от авторът книги
const MyBooks = ({user}) => {
	const [books, setBooks] = useState([]);
	const [boughtBooks, setBoughtBooks] = useState([]);

	const getBooks = async() => {
		try {
			const books = await axios.get(`http://localhost:5000/books/byAuthor/${user.id}`);
			setBooks(books.data);

			
		}catch(err) {
			toast.error("Sorry, couldn't load your books.", {
				autoClose: 2500,
				position: 'top-center'
			});
		}

		try {
			for(let i = 0;i < user.boughtbooks.length;i ++) {
				const response = await axios.get(`http://localhost:5000/books/${user.boughtbooks[i]}`);
				if(response.status === 200 && response.data.user_id !== user.id) {
					setBoughtBooks([...boughtBooks, response.data])
				}
			}
		}catch(err) {
			toast.error("Sorry, couldn't load your bought books.", {
				autoClose: 2500,
				position: 'top-center'
			});
		}
	}
	useEffect(() => {
		getBooks();
	}, []);

	return (
		<div className='myBooks'>
			<ToastContainer />
			<h1>Hello, {user.name} !</h1>
			{
				books.length > 0 ? (
					<div className="row">
						<h2>Here are the books you have published:</h2>
						<div className='scroll'>
						{
							books.map(book => {
								return (
									<Card 
										key={book.id}
										id={book.file}
										img={book.cover}
										title={book.title}
										price={book.price}
										author={book.name}
										rating={Math.floor((book.summedrating / book.numberofratings) * 100) / 100}
										views={book.views}
									/>
								)
							})
						}
						</div>
					</div>
				) : (
					<h3 className='not-yet'>You have not published any books yet.</h3>
				)
			}
			{
				boughtBooks.length > 0 ? (
					<div className="row">
						<h2>Here are the books you have bought:</h2>
						<div className='scroll'>
						{
							boughtBooks.map(book => {
								return (
									<Card 
										key={book.id}
										id={book.file}
										img={book.cover}
										title={book.title}
										price={book.price}
										author={book.name}
										rating={Math.floor((book.summedrating / book.numberofratings) * 100) / 100}
									/>
								)
							})
						}
						</div>
					</div>
				) : (
					<h3 className='not-yet'>You have not bought any books yet.</h3>
				)
			}
		</div>
	)
}

export default MyBooks;