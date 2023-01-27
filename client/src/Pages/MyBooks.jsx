import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Card from '../Components/Card';
import { ToastContainer, toast } from 'react-toastify';

// страницата, която показва качените от авторът книги
const MyBooks = ({user}) => {
	const [books, setBooks] = useState([]);
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
	}
	useEffect(() => {
		getBooks();
	});

	return (
		<div className='myBooks'>
			<ToastContainer />
			<h1>Hello, {user.name} !</h1>
			{
				books.length > 0 ? (
					<div className="row">
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
					<h2>You have not published any books yet.</h2>
				)
			}
		</div>
	)
}

export default MyBooks;