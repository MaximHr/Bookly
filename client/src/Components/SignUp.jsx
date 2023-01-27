import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = ({setUser}) => {
	const [page, setPage] = useState(0);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [age, setAge] = useState('');
	const [school, setSchool] = useState('');
	const [gender, setGender] = useState('');

	const navigate = useNavigate();
	const [isScaled, setIsScaled] = useState(false);
	const [error, setError] = useState('no errors');

	useEffect(() => {
		setIsScaled(true);
	}, []); 

	const submitHandler = async(e) => {
		e.preventDefault();
		try {
			if(name && email && age && school && gender && password.length > 5) {
				const body = {name, email, password, age, school, gender};
				const response = await axios.post('http://localhost:5000/users/register', body);
				
				if(response.status === 200) {
					setUser(response.data);
					sessionStorage.setItem('user', JSON.stringify(response.data));
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
			} else {
				setError('Sorry, there was an error. Try again later.')
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
				<h1>Create an account</h1>
				<form className="form">
					{
						page === 0 ? (
							<>
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
								<label>Password: </label>
								<input 
									className='input'
									type="password" 
									placeholder='Password'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
							<button className="btn" type='submit' onClick={() => setPage(1)}>Next <FontAwesomeIcon icon={faArrowRight} /></button>
							</>
						) : (
							<>
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
								<label>Gender: </label>
								<div className='radio-container'>
									<input 
										type="radio" 
										name='gender' 
										value="Male"
										onChange={(e) => setGender(e.target.value)}
									/>
									<label>Male</label>
								</div>
								<div className='radio-container'>
									<input 
										type="radio" 
										name='gender' 
										value="Female"
										onChange={(e) => setGender(e.target.value)}
									/>
									<label>Female</label>
								</div>
								<div className='radio-container'>
									<input 
										type="radio" 
										name='gender' 
										value="Other" 
										onChange={(e) => setGender(e.target.value)}
									/>
									<label>Other</label>
								</div>
							</div>
							<div className='btn-container'>
								<button className="btn outline" onClick={() => setPage(0)}>Go back</button>
								<button className="btn" onClick={submitHandler}>Submit</button>
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