import React from 'react';
import person from '../Images/Person.png';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
	const navigate = useNavigate();

	return (
		<div className='landing container'>
		<div>
			<h1 className="title">Bookly</h1>
			<p>Bookly is a website that allows you to explore and buy books written from students to students. Here you can choose between dozens of topics and categories, check out new releases, top books and much more !</p>
			<div className="btn" onClick={() => navigate('/signUp')}>Create an account</div>
		</div>
		<div>
			<img src={person} alt='Person reading book' />
		</div>
		</div>
	)
}

export default Landing;