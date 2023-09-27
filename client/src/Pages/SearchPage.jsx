import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Card from '../Components/Card';
import { ToastContainer, toast } from 'react-toastify';
import Translate from '../Components/Translate';
import serverurl from '../serverurl';

const SearchPage = ({lang}) => {
	const location = useLocation();
	const [searchedByTags, setSearchedByTags] = useState([]);
	const [searchedByAuthor, setSearchedByAuthor] = useState([]);
	const [searchedByTitle, setSearchedByTitle] = useState([]);

	const fetchBooks = async(e) => {
		try {
			const response = await axios.get(serverurl + `/books/search/${e}`);

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
						<h2>{lang === 'bulgarian' ? Translate.BooksTitle.bulgarian : Translate.BooksTitle.british}</h2>
						<div className="scroll">
						{
							searchedByTitle?.map(book => {
								return(	
									<Card 
										lang={lang}
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
						<h2>{lang === 'bulgarian' ? Translate.BooksAuthor.bulgarian : Translate.BooksAuthor.british}</h2>
						<div className="scroll">
						{
							searchedByAuthor?.map(book => {
								return(	
									<Card 
										lang={lang}
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
						<h2>{lang === 'bulgarian' ? Translate.BooksTags.bulgarian : Translate.BooksTags.british}</h2>
						<div className="scroll">
						{
							searchedByTags?.map(book => {
								return(	
									<Card 
										lang={lang}
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
					searchedByAuthor.length  === 0 && searchedByTags.length === 0 && searchedByTitle.length === 0 && lang === 'bulgarian' ? <h1 id='sorry'>{Translate.NoBooks.bulgarian}</h1> : <></>
				}
				{
					searchedByAuthor.length  === 0 && searchedByTags.length === 0 && searchedByTitle.length === 0 && lang === 'british' ? <h1 id='sorry'>{Translate.NoBooks.british}</h1> : <></>
				}
			</div>
	)
}

export default SearchPage;