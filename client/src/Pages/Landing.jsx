import React from 'react';
import person from '../Images/Person.png';
import { Link } from 'react-router-dom';
import {Text} from '../Components/Translate';

const Landing = () => {
	return (
		<div className='landing container'>
		<div>
			<h1 className="title">Bookly</h1>
			<p><Text>BooklyInfo</Text></p>
			<Link className="btn" to='/signUp'><Text>CreateAcc</Text></Link>
		</div>
		<div>
			<img src={person} alt='Person reading book' />
		</div>
		</div>
	)
}

export default Landing;