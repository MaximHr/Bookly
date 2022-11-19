import axios from 'axios';
import React, {useState, useEffect} from 'react';
import Draggable from 'react-draggable';
import Card from '../Components/Card';

const Home = ({user}) => {
	//books
	const [yourBooks, setYourBooks] = useState([]);
	const [popularBooks, setPopularBooks] = useState([]);
	const [newBooks, setNewBooks] = useState([]);
	const [highestRatedBooks, setHighestRatedBooks] = useState([]);
	//custom scrollbar
	const [yourBooksScroll, setYourBooksScroll] = useState(0);
	const [newBooksScroll, setNewBooksScroll] = useState(0);
	const [popularBooksScroll, setPopularBooksScroll] = useState(0);
	const [highestRatedBooksScroll, setHighestRatedBooksScroll] = useState(0);

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

			// взима книгите с най-много четения
			const getPopularBooks = await axios.get(`http://localhost:5000/books/popular/0/8`);

			if(getPopularBooks.status === 200) {
				setPopularBooks(getPopularBooks.data);
			}

			// взима най-скорошните книги
			const getNewBooks = await axios.get(`http://localhost:5000/books/new/0/8`);

			if(getNewBooks.status === 200){
				setNewBooks(getNewBooks.data);
			}

			//взима най-високо оценените книги
			const getHighestRated = await axios.get(`http://localhost:5000/books/highestRated/0/8`);

			if(getHighestRated.status === 200) {
				setHighestRatedBooks(getHighestRated.data);
			}

		}catch(err) {
			console.log(err);
		}
	}
	useEffect(() => {
		fetchBooks();
	}, []);

	return (
		<div className='home'>
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
								scroll={yourBooksScroll}
							/>
						)
					})
				}
					<Draggable 
						axis='x' 
						bounds='parent' 
						onDrag={(e,data) => setYourBooksScroll(data.x)}
					>
						<div className="scrollbar"></div>
					</Draggable>
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
								scroll={popularBooksScroll}
							/>
						)
					})
				}
					<Draggable 
						axis='x' 
						bounds='parent' 
						onDrag={(e,data) => setPopularBooksScroll(data.x)}
					>
						<div className="scrollbar"></div>
					</Draggable>
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
								scroll={highestRatedBooksScroll}
							/>
						)
					})
				}
					<Draggable 
						axis='x' 
						bounds='parent' 
						onDrag={(e,data) => setHighestRatedBooksScroll(data.x)}
					>
						<div className="scrollbar"></div>
					</Draggable>
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
								scroll={newBooksScroll}
							/>
						)
					})
				}		
				
					<Draggable 
						axis='x' 
						bounds='parent' 
						onDrag={(e,data) => setNewBooksScroll(data.x)}
					>
						<div className="scrollbar"></div>
					</Draggable>
				</div>	
			</div>
		</div>
	)
}

export default Home;