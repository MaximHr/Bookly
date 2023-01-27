import React from 'react';
import person from '../Images/Person.png';
import { Link } from 'react-router-dom';

const Landing = () => {
	return (
		<div className='landing container'>
		<div>
			<h1 className="title">Bookly</h1>
			<p>Bookly is a website that allows you to explore and buy books written from aspiring authors. Here you can share your own literary work with a community of readers and receive feedback and comments. You can also read the latest, highest rated, and most popular books on the platform or search for a specific one. Whether you are a writer looking to improve your craft or a reader looking for new stories to enjoy, this app has something for everyone.</p>
			<Link className="btn" to='/signUp'>Create an account</Link>
		</div>
		<div>
			<img src={person} alt='Person reading book' />
		</div>
		</div>
	)
}

export default Landing;