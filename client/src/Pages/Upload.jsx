import React, {useState, useEffect } from 'react';
import Card from '../Components/Card';
import img from '../Images/cover2.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Upload = ({user}) => {
	const [title, setTitle] = useState('');
	const [price, setPrice] = useState(0);
	const [image, setImage] = useState(img);
	const [description, setDescription] = useState('');
	const [tagInput, setTagInput] = useState('');
	const [tags, setTags] = useState([]);
	const [pdf, setPdf] = useState('');
	const [canSell, setCanSell] = useState(false);

	const getStripeAccount = async(req, res) => {
		try {
			if(user.stripe_account) {
				const response = await axios.get(`http://localhost:5000/stripe/account/${user.stripe_account}`);

				if(response.status === 200) {
					setCanSell(response.data.details_submitted);
				}
			}
		}catch(err) {
			console.log(err);
		}
	}

	useEffect(() => {
		getStripeAccount();
	}, []);

	const addTag = (tag) => {
		if(tags.length < 10) {
			setTagInput('');
			setTags([...tags, tag]);
		} else {
			toast.error('Не може да имате повече от 10 тага', {
				autoClose: 2500,
				position: 'top-center'
			});
		}
	}
	const deleteTag = (tag) => {
		const newTags = tags.filter( el => el !== tag);
		setTags(newTags);
	}
	const uploadImage = async(e) => {
		const file = e.target.files[0];
		const formData = new FormData();
        formData.append("image", file);
		  
		try {
			const response = await axios.post("https://api.imgur.com/3/image", formData, {
				headers: {
					Authorization: "Client-ID " + process.env.REACT_APP_imgur_client_id,
					Accept: "application/json",
				}
			})
			
			if(response.status === 200) {
				setImage(response.data.data.link)
			}

		}catch(err) {
			toast.error("Sorry, couldn't upload this image. Try again later", {
				autoClose: 2500,
				position: 'top-center'
			});
		}
	}

	const uploadFile = async(e) => {
		try {		
			let formData = new FormData();
			formData.append('file', pdf);

			await fetch('http://localhost:5000/books/uploadFile', {
				method: 'POST',
				body: formData
			});

		}catch(err) {
			toast.error("Sorry, couldn't upload this file. Try again later", {
				autoClose: 2500,
				position: 'top-center'
			});
		}
	}
	const uploadBook = async(e) => {
		e.preventDefault();
		if(title.replaceAll(' ', '').length === 0 || description.replaceAll(' ', '').length === 0 || tags.length === 0 || pdf.name === undefined){
			toast.error('Please fill out the forms !', {
				autoClose: 2500,
				position: 'top-center'
			})
		} else if(price < 0) {
			toast.error('The price can not be a negative number', {
				autoClose: 2500,
				position: 'top-center'
			})
		} else if(price !== 0 && price !== '' && canSell === false) {
			toast.error('You can publish your books for free but you can not sell them because you do not have a verified stripe account.', {
				autoClose: 4500,
				position: 'top-center'
			});
		} else {
			try {
				uploadFile();
				const response = await axios.post('http://localhost:5000/books/upload', {
					title,
					description,
					price,
					cover: image,
					tags,
					user_id: user.id
				});
				if(response.status === 200) {
					toast.success('Your book is published!', {
						autoClose: 2500,
						position: 'top-center'
					});
					setTitle('');
					setPrice(0);
					setDescription('');
					setImage(img);
					setPdf('');
					setTagInput('');
					setTags([]);
				}

			}catch(err) {
				console.log(err);
				toast.error("Sorry, couldn't publish the books. Try again later", {
					autoClose: 2500,
					position: 'top-center'
				});
			}
		}
	}

	return (
		<div className='uploadPage'>
			<ToastContainer  />
			<h1 className="title">Upload Your Book!</h1>
			<div className='together'>
				<div className="left">
					<div className='dflex'>
						<label>Title: </label>
						<input 
							type="text" 
							className="input" 
							placeholder='Title'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</div>
					<div className='dflex'>
						<label>Price (in bgn leva): </label>
						<input 
							type="number" 
							placeholder="Price"
							className='input' 
							value={price}
							onChange={(e) => setPrice(e.target.value)}
							min={0} 
						/>
					</div>
					<div className='dflex'>
						<label>Image: </label>
						<div>	
							<input 
								type="file" 
								accept="image/*" 
								className='btn' 
								onChange={(e) => uploadImage(e)}
							/>
						</div>
					</div>
					<div className="dflex">
						<label>Description: </label>
						<textarea 
							className='textarea' 	placeholder="Description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						>	
						</textarea>
					</div>
					<div className="dflex">
						<label>Add tags to help readers find your content.</label>
						<div className="flex">
							<input 
								type="text" 
								value={tagInput}
								className="input" 
								style={{marginBottom: '0rem'}}
								placeholder='Genre, topics...'
								onKeyUp={(e) => {
									if(e.key === "Enter"){
										addTag(tagInput)
									}
								}}
								onChange={(e) => {
									setTagInput(e.target.value)
								}}
							/>
							<button 
								className="btn" 
								onClick={() => addTag(tagInput)}>Add
							</button>
						</div>
						<div className="tags">
						{
							tags.map((tag, index) => {
								return(
									<div key={index} className='tag'>
										{tag}
										<FontAwesomeIcon icon={faXmark} onClick={() => deleteTag(tag)}/>
									</div>
								)
							})
						}
						</div>
					</div>
					<div className="dflex">
						<label>Upload your book in pdf format.</label>
						<input 
							type="file" 
							accept='application/pdf' 
							className='file' 
							onChange={(e) => {
								setPdf(e.target.files[0])
							}}
						/>
					</div>
					
				</div>
				<div className="right">
					<Card 
						img={image} 
						title={title} 
						price={price} 
						author={user.name}
						rating={5}
					/>
				</div>
			</div>
			<div className='mtb5'>
				<button onClick={uploadBook} className="btn green publish" >Publish</button>
			</div>
		</div>
	)
}

export default Upload;