import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Translate from '../Components/Translate';

const SignIn = ({setUser, lang}) => {
	const [email, setEmail] = useState('');
	const navigate = useNavigate();
	const [password, setPassword] = useState('');
	const [isScaled, setIsScaled] = useState(false);
	const [error, setError] = useState('no errors');

	useEffect(() => {
		setIsScaled(true);
	}, []); 


	const submitHandler = async(e) => {
		e.preventDefault();
		try {
			if(email && password.length > 5) {
				const body = {email, password};
				const response = await axios.post('/users/login', body);
				
				if(response.status === 200) {
					setUser(response.data);
					sessionStorage.setItem('user', JSON.stringify(response.data));
					navigate('/home');
				}
			} else if(!email) {
				if(lang === 'british') {
					setError('Please fill out the forms.');
				} else {
					setError('Моля попълнете всички форми.')
				}
			} else if(password.length <= 5) {
				if(lang === 'british') {
					setError('Password is too short.');
				} else {
					setError('Паролата трябва да е поне 6 символа.')
				}
			}
		}catch(err) {
			setError(err.response.data)
		}
	}
	const closeHandler = (e) => {
		if(e.target.classList.contains('dark')) {
			navigate('/')
		}
	}

	return (
		<div className="dark" onMouseDown={(e) => closeHandler(e)}>
			<div className={isScaled ? 'card scaled' : 'card'}>
				<FontAwesomeIcon 
					className='icon' 
					icon={faXmark} 
					onClick={() => navigate('/')}
				/>
				<h1>{lang === 'bulgarian' ? Translate.Welcome.bulgarian : Translate.Welcome.british}</h1>
				<form className="form" onSubmit={(e) => submitHandler(e)}>
					<div>
						<label>{lang === 'bulgarian' ? Translate.Email.bulgarian : Translate.Email.british}: </label>
						<input 
							className='input'
							type="text" 
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
					
					<button className="btn" type='submit'>{lang === 'bulgarian' ? Translate.SignIn.bulgarian : Translate.SignIn.british}</button>

					
					<p className={error === 'no errors' ? 'hidden error' : 'error'}>{error}</p>

				</form>
			</div>
		</div>
	)
}

export default SignIn;