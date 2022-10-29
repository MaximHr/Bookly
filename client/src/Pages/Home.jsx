import axios from 'axios';
import React, {useState, useEffect} from 'react';
import Card from '../Components/Card';
import cover from '../Images/cover.jpg';

const Home = () => {
	const [yourBooks, setYourBooks] = useState([]);
	const [popularBooks, setPopularBooks] = useState([]);
	const [newBooks, setNewBooks] = useState([]);
	const fetchNewBooks = async() => {
		try {
			const getNewBooks = await axios.get(`http://localhost:5000/books/new/0/10`);
			
			if(getNewBooks.status === 200){
				setNewBooks(getNewBooks.data);
			}
		}catch(err) {
			console.log(err);
		}
	}
	useEffect(() => {
		fetchNewBooks();
	}, []);

	return (
		<div className='home'>
			<div className="row"> 
				<h2>Your reading list</h2>
				<div>
				{

				}
				</div>
			</div>
			<div className="row">
				<h2>Popular books</h2>
				<div>
				{

				}
				</div>
			</div>
			<div className="row">
				<h2>New realeses</h2>
				<div>	
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
								rating='4.2 '
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