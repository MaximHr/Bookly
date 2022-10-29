import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = ({setUser}) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [age, setAge] = useState('');
	const [school, setSchool] = useState('');

	const navigate = useNavigate();
	const [isScaled, setIsScaled] = useState(false);
	const [error, setError] = useState('no errors');

	useEffect(() => {
		setIsScaled(true);
	}, []); 

	const submitHandler = async(e) => {
		e.preventDefault();
		try {
			if(name && email && age && school && password.length > 5) {
				const body = {name, email, password, age, school};
				const response = await axios.post('http://localhost:5000/users/register', body);
				
				if(response.status === 200) {
					setUser(response.data);
					navigate('/home');
				}
	
			} else if(password.length <= 5) {
				setError('Password is too short.');
			} else {
				setError('Please fill out the forms.');
			}
		}catch(err) {
			if(err.response.data === `duplicate key value violates unique constraint "users_email_key"`) {
				setError('User with this email already exists.')
			}
		}
		
	}
	const closeHandler = (e) => {
		if(e.target.classList.contains('dark')) {
			navigate('/')
		}
	}

	return (
		<div className="dark"  onClick={(e) => closeHandler(e)}>
			<div className={isScaled ? 'card scaled' : 'card'}>
				<FontAwesomeIcon icon={faXmark}  onClick={() => navigate('/')}/>
				<h1>Create an account</h1>
				<form className="form" onSubmit={(e) => submitHandler(e)}>
					<div>
						<label>Name: </label>
						<input 
							className='input'
							value={name} 
							onChange={(e) => setName(e.target.value)} 
							type="text" 
							placeholder='Username'
						/>
					</div>
					<div>
						<label>Email: </label>
						<input 
							className='input'
							type="email" 
							placeholder='Email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}

						/>
					</div>
					<div>
						<label>Age: </label>
						<input 
							className='input'
							type="number" 
							placeholder='Age'
							value={age}
							min='1'
							onChange={(e) => setAge(e.target.value)}

						/>
					</div>
					<div>
						<label>School: </label>
						<input 
							className='input'
							type="text" 
							placeholder='School'
							value={school}
							onChange={(e) => setSchool(e.target.value)}
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

					<button className="btn" type='submit'>Submit</button>
					
					<p className={error === 'no errors' ? 'hidden error' : 'error'}>{error}</p>
				</form>
				
			</div>
		</div>
	)
}

export default SignUp;