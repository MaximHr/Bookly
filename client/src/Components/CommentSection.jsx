import React, {useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import Translate from '../Components/Translate';

const CommentSection = ({book, user, comments, setComments, lang}) => {
	const [input, setInput] = useState('');
	const [updateCard, setUpdateCard] = useState(false);
	const [updateValue, setUpdateValue] = useState('');
	
	const updateComment = async(id) => {
		try {
			const response = await axios.put(`http://188.138.70.154:8000/comments/update/`, {
				id: id,
				text: updateValue
			});
			if(response.status === 200) {
				setUpdateCard(false);

				let newComments = [...comments];
				newComments.find(c => c.id === id).text = updateValue;

				setComments(newComments);

				toast.success('Comment Updated', {
					autoClose: 2500,
					position: 'top-center'
				});
			}

		}catch(err) {
			toast.error('Sorry, there was an error. try again later', {
				autoClose: 2500,
				position: 'top-center'
			});
		}
	}
	const deleteComment = async(id) => {
		try {
			const response = await axios.delete(`http://188.138.70.154:8000/comments/delete/${id}`);

			if(response.status === 200) {
				const newComments = comments.filter(comment => comment.id !== id);
				setComments(newComments);

				toast.success('Comment deleted', {
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
	const submitComment = async() => {
		if(input.replaceAll(' ', '') !== '') {
			try {
				const response = await axios.post('http://188.138.70.154:8000/comments/create', {
					text: input,
					user_id: user.id,
					book_id: book.id
				});
				if(response.status === 200) {
					toast.success('Comment sent !', {
						autoClose: 2500,
						position: 'top-center'
					})
					setComments([...comments, response.data])
					setInput('');
				}

			}catch(err) {
				toast.error('Sorry, there was an error. Try again later', {
					autoClose: 2500,
					position: 'top-center'
				});
			}
		}
	}

    return (
        <div className="comments container">
			<ToastContainer />
			{
				!updateCard ? (
					<></>
				) : (
					<div className='toggle-card'>
						<FontAwesomeIcon 
							className='close'
							icon={faXmark} 
							onClick={() => {
								setUpdateCard(false);
								setUpdateValue('');
							}} 
						/>
						<input 
							className='input'
							type="text" 
							placeholder='Your Comment' 
							value={updateValue} 
							onChange={(e) => setUpdateValue(e.target.value)}
						/>
						<button 
							className='btn' 
							onClick={() => updateComment(updateCard)}>Update !
						</button>
					</div>
				)
			}
			<h2>{lang === 'bulgarian' ? Translate.Comments.bulgarian : Translate.Comments.british}: </h2>
			<div className='send-comment'>
				<input 
					type="text" 
					placeholder='Add a comment'
					className='input'
					value={input}
					onKeyUp={(e) => {
						if(e.key === "Enter"){
							submitComment()
						}
					}}
					onChange={(e) => setInput(e.target.value)}
				/>
				<button className="btn" onClick={submitComment}>{lang === 'bulgarian' ? Translate.Send.bulgarian : Translate.Send.british}</button>
			</div>
			<div>
			{
				comments.map(comment => {
					return (
						<div className="comment" key={comment.id}>
							<p><span className='name'>{comment.name ? comment.name : user.name}: </span> {comment.text}</p>
							{
								comment.user_id === user.id ? (
									<div className="more">
										<FontAwesomeIcon 
											icon={faPenToSquare} className='update-icon' 
											onClick={() => {
												setUpdateCard(comment.id)
												setUpdateValue(comment.text)
											}}
										/>
										<FontAwesomeIcon 
											icon={faTrash} className='trash-icon'
											onClick={() => deleteComment(comment.id)}
										/>
									</div>
								) : (<></>)
							}
						</div>
					)
				})
			}
			</div>
		</div>
    )
}

export default CommentSection;