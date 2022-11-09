import React, {useState} from 'react';
import logo from '../Images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = ({user}) => {
	const [searchValue, setSearchValue] = useState('');
	const navigate = useNavigate();

	const searchHandler = () => {
		if(searchValue.replaceAll(' ', '') !== '') {
			navigate(`/search/${searchValue}`);
		}
	}
	return (
		<div className='navbar container' style={user ? {backgroundColor:'white', paddingBottom: '2rem'} : {}}>

			<div className="logo">
				<img src={logo} alt="Logo" />
			</div>
			{
				user ? (
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
							placeholder='Search for a book or author'
						/>
						<button className="btn" onClick={searchHandler}>
							<FontAwesomeIcon icon={faSearch}/>
						</button>
					</div>
					
				): (<></>)
			}
			<div className="navigation">
				{
					!user ? (
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