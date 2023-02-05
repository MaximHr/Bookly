import React, {useState} from 'react';
import logo from '../Images/logo.png';
import DropDown from './DropDown';
import logoLight from '../Images/logo-light.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCaretDown, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useEffect } from 'react';
import {Text} from '../Components/Translate';

const Navbar = ({user, themeToggle, setThemeToggle, lang, setLang}) => {
	const navigate = useNavigate();
	const location = useLocation();
	const isTablet = useMediaQuery({
		query: '(max-width: 820px)'
	});
	const [showBar, setShowBar] = useState(false);
	const [searchValue, setSearchValue] = useState('');
	const [dropDown, setDropDown] = useState(false);

	// навбарът се променя спрямо размера на устройството
	const showSearchbar = () => {
		setShowBar(true);
		setDropDown(false);
	}
	useEffect(() => {
		if(!isTablet) {
			setShowBar(false);
		}
	}, [isTablet]);

	const navType = (location.pathname === '/' || location.pathname === '/signIn' || location.pathname === '/signUp') || (!sessionStorage.getItem('user') || !user);
	// ако клиентът е в профила си, типът навбар е различен от този ако не е в профила си.

	const searchHandler = () => {
		if(searchValue.replaceAll(' ', '') !== '') {
			navigate(`/search/${searchValue}`);
		}
	}
	return (
		<div className='navbar container' style={ !navType ? {backgroundColor:'white', paddingBottom: '2rem'} : {}}>
			{
				showBar ? <>
					<div className='small-view'>
						<input 
							onChange={(e) => setSearchValue(e.target.value)}
							type="text" 
							value={searchValue}
							onKeyUp={(e) => {
								if(e.key === 'Enter') {
									searchHandler();
								}
							}}
							className='input searchbar search-full' 
							placeholder={
								lang === 'british' ? 'Search for books, authors or tags' : 'Търси книги, автори или тагове'
							} // <Text> не работи за placeholder
						/>
						
						<button 
							className="btn" 
							onClick={searchHandler}
						>
							<FontAwesomeIcon icon={faSearch}/>
						</button>
					</div>
				</> :
				<Link className="logo" to='/home'>
					{
						themeToggle && navType ? (
							<img src={logoLight} alt="Logo" />
						) : (
							<img src={logo} alt='Logo' />
						)
					}
				</Link>
			}
			{
				!navType ? (
					<div className='search-container'>
						{isTablet ? (
							<></>
						) : (
							<>
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
									placeholder={
										lang === 'british' ? 'Search for books, authors or tags' : 'Търси книги, автори или тагове'
									}
								/>
								<button 
									className="btn" 
									onClick={searchHandler}
								>
									<FontAwesomeIcon icon={faSearch}/>
								</button>
							</>
						)}
						
					</div>
					
				): (<></>)
			}
			<div className="navigation">
				{
					navType ? (
						<>
							<Link className='btn' id='sign1' to='/signIn'><Text>SignIn</Text></Link>
							<Link className='btn' id='sign2' to='/signUp'><Text>SignUp</Text></Link>
						</>
					) : (
						<>
						{
							isTablet && !showBar ? (
								<button 
									className="btn" 
									style={{marginRight: '-1rem'}}
									onClick={showSearchbar}
								>
									<FontAwesomeIcon icon={faSearch}/>
								</button>
							) : (<></>)
						}
						<div className="group">
						{
							!showBar ? 
							(<>
							<div>
								<button 
									onClick={() => setDropDown(!dropDown)} className="btn"
								>
									<Text>Profile</Text>
									<FontAwesomeIcon icon={faCaretDown}/>
								</button>
							</div>
							</>):(<FontAwesomeIcon 
								onClick={() => setShowBar(false)} 
								className='goBack' 
								icon={faXmark}
							/>)
						}
						{
							dropDown ? (
								<DropDown 
									lang={lang} 
									setDropDown={setDropDown}
									setLang={setLang} 
									themeToggle={themeToggle} 
									setThemeToggle={setThemeToggle}
								/>
							) : (<></>)
						}
						</div>
						</>
					)
				}
			</div>
		</div>
	)
}

export default Navbar;