import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Translate from '../Components/Translate';

const SignUp = ({setUser, lang}) => {
	const [page, setPage] = useState(0);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [age, setAge] = useState('');
	const [bio, setBio] = useState('');
	const [gender, setGender] = useState('');

	const navigate = useNavigate();
	const [isScaled, setIsScaled] = useState(false);
	const [error, setError] = useState('no errors');

	useEffect(() => {
		setIsScaled(true);
	}, []); 
	

	const submitHandler = async(e) => {
		e.preventDefault();
		if(age.length > 255 || email.length > 255 || name.length > 255 || bio.length > 500) {
			if(lang === 'british') {
				setError('Some of the fields are too long.')
			} else {
				setError('Някои от полетата са твърде дълги.');
			}	
		} else {
			try {
				if(name && email && age > 0 && age < 150 && bio && gender && password.length > 5) {
					const body = {name, email, password, age, bio, gender};
					const response = await axios.post('http://188.138.70.154:8000/users/register', body);
					
					if(response.status === 200) {
						setUser(response.data);
						sessionStorage.setItem('user', JSON.stringify(response.data));
						navigate('/stripeAuth');
					}
		
				} else if(password.length > 0 && password.length <= 5) {
					if(lang === 'british') {
						setError('Password is too short.');
					} else {
						setError('Паролата трябва да е поне 6 символа.');
					}
				} else if(age < 0 || age > 150) {
					if(lang === 'british') {
						setError('Please type your correct age.')
					} else {
						setError('Моля напишете правилната Ви възраст.');
					}
				} else {
					if(lang === 'british') {
						setError('Please fill out the forms.');
					} else {
						setError('Моля попълнете всички полета.');
					}
				}
			}catch(err) {
				console.log(err);
				if(err.response.data === `duplicate key value violates unique constraint "users_email_key"`) {
					setError('User with this email already exists.')
				} else {
					setError('Sorry, there was an error. Try again later.')
				}
			}
		}
	}
	const closeHandler = (e) => {
		if(e.target.classList.contains('dark')) {
			navigate('/')
		}
	}


	return (
		<div className="dark"  onMouseDown={(e) => closeHandler(e)}>
			<div className={isScaled ? 'card scaled' : 'card'}>
				<FontAwesomeIcon className='icon' icon={faXmark}  onClick={() => navigate('/')}/>
				<h1>{lang === 'bulgarian' ? Translate.CreateAcc.bulgarian : Translate.CreateAcc.british}</h1>
				<form className="form">
					{
						page === 0 ? (
							<>
							<div>
								<label>{lang === 'bulgarian' ? Translate.Name.bulgarian : Translate.Name.british}: </label>
								<input 
									className='input'
									value={name} 
									onChange={(e) => setName(e.target.value)} 
									type="text" 
									placeholder='Username'
								/>
							</div>
							<div>
								<label>{lang === 'bulgarian' ? Translate.Email.bulgarian : Translate.Email.british}: </label>
								<input 
									className='input'
									type="email" 
									placeholder='example@gmail.com'
									value={email}
									onChange={(e) => setEmail(e.target.value)}

								/>
							</div>
							<div>	
								<label>{lang === 'bulgarian' ? Translate.Password.bulgarian : Translate.Password.british}: </label>
								<input 
									className='input'
									type="password" 
									placeholder={lang === 'british'  ? 'min 6 characters' : 'мин 6 символа'}
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
							<button className="btn" type='submit' onClick={() => setPage(1)}>{lang === 'bulgarian' ? Translate.Next.bulgarian : Translate.Next.british} <FontAwesomeIcon icon={faArrowRight} /></button>
							</>
						) : (
							<>
							<div>
								<label>{lang === 'bulgarian' ? Translate.Age.bulgarian : Translate.Age.british}: </label>
								<input 
									className='input'
									type="number" 
									placeholder={lang === 'british'  ? 'Age' : 'Възраст'}
									value={age}
									min='1'
									onChange={(e) => setAge(e.target.value)}

								/>
							</div>
							<div>
								<label>{lang === 'bulgarian' ? Translate.Bio.bulgarian : Translate.Bio.british}: </label>
								<input 
									className='input'
									type="text" 
									placeholder={lang === 'british'  ?'Tell us about you (max 500 characters)' : 'Разкажи ни за теб (до 500 символа)'}
									value={bio}
									onChange={(e) => setBio(e.target.value)}
								/>
							</div>
							<div>
								<label>{lang === 'bulgarian' ? Translate.Gender.bulgarian : Translate.Gender.british}: </label>
								<div className='radio-container'>
									<input 
										type="radio" 
										name='gender' 
										value="Male"
										onChange={(e) => setGender(e.target.value)}
									/>
									<label>{lang === 'bulgarian' ? Translate.Male.bulgarian : Translate.Male.british}</label>
								</div>
								<div className='radio-container'>
									<input 
										type="radio" 
										name='gender' 
										value="Female"
										onChange={(e) => setGender(e.target.value)}
									/>
									<label>{lang === 'bulgarian' ? Translate.Female.bulgarian : Translate.Female.british}</label>
								</div>
								<div className='radio-container'>
									<input 
										type="radio" 
										name='gender' 
										value="Other" 
										onChange={(e) => setGender(e.target.value)}
									/>
									<label>{lang === 'bulgarian' ? Translate.Other.bulgarian : Translate.Other.british}</label>
								</div>
							</div>
							<div className='btn-container'>
								<button className="btn outline" onClick={() => setPage(0)}>{lang === 'bulgarian' ? Translate.Back.bulgarian : Translate.Back.british}</button>
								<button className="btn" onClick={submitHandler}>{lang === 'bulgarian' ? Translate.Submit.bulgarian : Translate.Submit.british}</button>
							</div>
								
							</>
						)
					}
					<p className={error === 'no errors' ? 'hidden error' : 'error'}>{error}</p>
				</form>
				
			</div>
		</div>
	)
}

export default SignUp;