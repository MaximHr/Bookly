import React, {useState} from 'react';
import logo from '../Images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, Link, useLocation } from 'react-router-dom';

const Navbar = ({user}) => {
	const [searchValue, setSearchValue] = useState('');
	const navigate = useNavigate();
	const location = useLocation();

	const navType = (location.pathname === '/' || location.pathname === '/signIn' || location.pathname === '/signUp') || (!sessionStorage.getItem('user') || !user);

	const searchHandler = () => {
		if(searchValue.replaceAll(' ', '') !== '') {
			navigate(`/search/${searchValue}`);
		}
	}
	return (
		<div className='navbar container' style={ !navType ? {backgroundColor:'white', paddingBottom: '2rem'} : {}}>

			<div className="logo">
				<img src={logo} alt="Logo" />
			</div>
			{
				!navType ? (
					<div className='search-container'>
						<input 
							onChange={(e) => setSearchValue(e.target.value)}
							type="text" 
							value={searchValue}
							onKeyUp={(e) => {
								if(e.key === 'Enter') {
									searchHandler();
								}
							}}
							className='input searchbar' 
							placeholder='Search for books, authors or tags'
						/>
						<button className="btn" onClick={searchHandler}>
							<FontAwesomeIcon icon={faSearch}/>
						</button>
					</div>
					
				): (<></>)
			}
			<div className="navigation">
				{
					navType ? (
						<>
							<Link className='btn' to='/signIn'>Sign In</Link>
							<Link className='btn' to='/signUp'>Sign Up</Link>
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