import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Card from '../Components/Card';
import { ToastContainer, toast } from 'react-toastify';
import {Text} from '../Components/Translate';

const SearchPage = () => {
	const location = useLocation();
	const [searchedByTags, setSearchedByTags] = useState([]);
	const [searchedByAuthor, setSearchedByAuthor] = useState([]);
	const [searchedByTitle, setSearchedByTitle] = useState([]);

	const fetchBooks = async(e) => {
		try {
			const response = await axios.get(`/books/search/${e}`);

			setSearchedByTitle(response.data.title);
			setSearchedByAuthor(response.data.author);
			setSearchedByTags(response.data.tags);

		}catch(err) {
			toast.error("Sorry, couldn't load the books. Try again later", {
				autoClose: 2500,
				position: 'top-center'
			});
		}
	}
	useEffect(() => {
		fetchBooks(location.pathname.replace('/search/', ''));
	}, [location]);

	return (
			<div className='search-page'>
				<ToastContainer />
				{ searchedByTitle.length > 0 ? 
					<div className="row">
						<h2><Text>BooksTitle</Text></h2>
						<div className="scroll">
						{
							searchedByTitle?.map(book => {
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
				: <></>}

				{ searchedByAuthor.length > 0 ? 
					<div className="row">
						<h2><Text>BooksAuthor</Text></h2>
						<div className="scroll">
						{
							searchedByAuthor?.map(book => {
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
				: <></>}
				
				{ searchedByTags.length > 0 ? 
					<div className="row">	
						<h2><Text>BooksTags</Text></h2>
						<div className="scroll">
						{
							searchedByTags?.map(book => {
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
				: <></>}
				{
					searchedByAuthor.length  === 0 && searchedByTags.length === 0 && searchedByTitle.length === 0 ? <h1 id='sorry'><Text>NoBooks</Text></h1> : <></>
				}
			</div>
	)
}

export default SearchPage;