import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Card from '../Components/Card';
import { ToastContainer, toast } from 'react-toastify';
import Translate from '../Components/Translate';

// страницата, която показва качените и закупените от авторa книги
const MyBooks = ({user, lang}) => {
	const [books, setBooks] = useState([]);
	const [boughtBooks, setBoughtBooks] = useState([]);

	const getBooks = async() => {
		try {
			const books = await axios.get(`/books/byAuthor/${user.id}`);
			setBooks(books.data);
		}catch(err) {
			toast.error("Sorry, couldn't load your books.", {
				autoClose: 2500,
				position: 'top-center'
			});
		}
		try {
			for(let i = 0;i < user.boughtbooks?.length;i ++) {
				const response = await axios.get(`/books/${user.boughtbooks[i]}`);
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
						<h2>{lang === 'bulgarian' ? Translate.PublishedBooks.bulgarian : Translate.PublishedBooks.british}</h2>
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
					<h3 className='not-yet'>{lang === 'bulgarian' ? Translate.NoPublishedBooks.bulgarian : Translate.NoPublishedBooks.british}</h3>
				)
			}
			{
				boughtBooks.length > 0 ? (
					<div className="row">
						<h2>{lang === 'bulgarian' ? Translate.BoughtBooks.bulgarian : Translate.BoughtBooks.british}</h2>
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
					<h3 className='not-yet'>{lang === 'bulgarian' ? Translate.NoBoughtBooks.bulgarian : Translate.NoBoughtBooks.british}</h3>
				)
			}
		</div>
	)
}

export default MyBooks;