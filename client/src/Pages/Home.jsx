import axios from 'axios';
import React, {useState, useEffect} from 'react';
import Card from '../Components/Card';
import { ToastContainer, toast } from 'react-toastify';

//страницата с книгите за клиентът
const Home = ({user}) => {
	const [yourBooks, setYourBooks] = useState([]);
	const [popularBooks, setPopularBooks] = useState([]);
	const [newBooks, setNewBooks] = useState([]);
	const [highestRatedBooks, setHighestRatedBooks] = useState([]);


	const fetchBooks = async() => {
		try {
			//взима книгите, които чете потребителя
			let readingList = [];
			user.readbooks?.map(async(book) => {
				try {
					const getYourBook = await axios.get(`http://localhost:5000/books/${book}`);
					if(getYourBook.status === 200) {
						readingList.push(getYourBook.data);
					}
				}catch(err) {
					console.log(err);
				}
			})
			setYourBooks(readingList);

		}catch(err) {
			toast.error("Sorry, your reading list couldn't load.", {
				autoClose: 2500,
				position: 'top-center'
			});
		}

		try {
			// взима книгите с най-много четения
			const getPopularBooks = await axios.get(`http://localhost:5000/books/popular/0/250`);

			if(getPopularBooks.status === 200) {
				setPopularBooks(getPopularBooks.data);
			}
		}catch(err) {
			toast.error("Sorry, the most popular books couldn't load", {
				autoClose: 2500,
				position: 'top-center'
			});
		}

		try {
			// взима най-скорошните книги
			const getNewBooks = await axios.get(`http://localhost:5000/books/new/0/250`);

			if(getNewBooks.status === 200){
				setNewBooks(getNewBooks.data);
			}
		}catch(err) {
			toast.error("Sorry, the newest books couldn't load", {
				autoClose: 2500,
				position: 'top-center'
			});
		}

		try {
			//взима най-високо оценените книги
			const getHighestRated = await axios.get(`http://localhost:5000/books/highestRated/0/250`);

			if(getHighestRated.status === 200) {
				setHighestRatedBooks(getHighestRated.data);
			}
		}catch(err) {
			toast.error("Sorry, the highest rated books couldn't load", {
				autoClose: 2500,
				position: 'top-center'
			});
		}
	}
	useEffect(() => {
		fetchBooks();
	}, []);

	return (
		<div className='home'>
			<ToastContainer />
			<div className="row"> 
				<h2>Your reading list</h2>
				<div className='scroll'>
				{
					yourBooks.map(book => {
						return(	
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
			<div className="row">
				<h2>Popular books</h2>
				<div className='scroll'>
				{
					popularBooks.map(book => {
						return(	
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
			<div className="row">
				<h2>Highest rated books</h2>
				<div className='scroll'>
				{
					highestRatedBooks.map(book => {
						return(	
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
			<div className="row">
				<h2>New realeses</h2>
				<div className='scroll' >	
				{
					newBooks.map(book => {
						return(	
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
		</div>
	)
}

export default Home;