import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = ({user}) => {
	const navigate = useNavigate();

	return (
		<div className='navbar container' style={user ? {backgroundColor:'white', paddingBottom: '2rem'} : {}}>

			<div className="logo">
				<h1>Logo</h1>
			</div>
			{
				user ? (
					<input type="text" className='input searchbar' placeholder='Search for a book or author'/>
				): (<></>)
			}
			<div className="navigation">
				{
					!user ? (
						<>
							<button className='btn' onClick={() => navigate('/signIn')}>Sign In</button>
							<button className='btn' onClick={() => navigate('/signUp')}>Sign Up</button>
						</>
					) : (
						<>
							<Link to='/upload' className="btn">Upload</Link>
						</>
					)
				}
			</div>
		</div>
	)
}

export default Navbar;