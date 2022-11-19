import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignIn = ({setUser}) => {
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
				const response = await axios.post('http://localhost:5000/users/login', body);
				
				if(response.status === 200) {
					setUser(response.data);
					sessionStorage.setItem('user', JSON.stringify(response.data));
					navigate('/home');
				}
			} else if(!email) {
				setError('Please fill out the forms.')
			} else if(password.length <= 5) {
				setError('Password is too short.')
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
				<h1>Hello, again !</h1>
				<form className="form" onSubmit={(e) => submitHandler(e)}>
					<div>
						<label>Email: </label>
						<input 
							className='input'
							type="text" 
							placeholder='Email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}

						/>
					</div>
					<div>	
						<label>Password: </label>
						<input 
							className='input'
							type="password" 
							placeholder='Password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					
					<button className="btn" type='submit'>Sign In</button>

					
					<p className={error == 'no errors' ? 'hidden error' : 'error'}>{error}</p>

				</form>
			</div>
		</div>
	)
}

export default SignIn;