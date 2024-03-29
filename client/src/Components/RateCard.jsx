import React, {useState} from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import {Text} from '../Components/Translate';

const RateCard = ({user, book, setToggleCard, setUser, setBook, setRating}) => {
	const [yourRating, setYourRating] = useState();
	
	const addRating = async() => {
		try {
			if(JSON.parse(yourRating) >=1 && JSON.parse(yourRating) <= 5) {
				const response = await axios.put(`/books/addRating`, 
				{
					bookId: book.id,
					rating: yourRating,
					userId: user.id
				});
				if(response.status === 200) {
					setBook(response.data.updatedBook.rows[0]);
					setUser(response.data.updatedUser.rows[0]);
					setRating(response.data.updatedBook.rows[0].summedrating / response.data.updatedBook.rows[0].numberofratings);
					setToggleCard(false);
				}

			} else {
				toast.error('Your rating must be between 1 and 5',
				{
					autoClose: 2500,
					position: 'top-center'
				})
			}
		}catch(err) {
			toast.error('Sorry, there was an error. Try again later', {
				autoClose: 2500,
				position: 'top-center'
			});
		}
	}

	return (
		<>
			<ToastContainer />
			<div className='toggle-card rate-card'>
				<FontAwesomeIcon 
					className='close'
					icon={faXmark} 
					onClick={() => {
						setToggleCard(false);
					}} 
				/>
				<div>
					<h1><Text>Rate2</Text> {book.title}</h1>
					<p>(<Text>FromTо</Text>)</p>
				</div>
				<input 
					type="number" 
					className='input' 
					min={1} 
					max={5} 
					value={yourRating}
					onChange={(e) => setYourRating(e.target.value)}
				/>
				<button className="btn" onClick={addRating}><Text>Submit</Text></button>
			</div>
		</>
  	)
}

export default RateCard;