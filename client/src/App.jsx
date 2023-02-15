import React, {useState, useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
//components
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
//pages
import Landing from './Pages/Landing';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Home from './Pages/Home';
import BookDetail from './Pages/BookDetail';
import Upload from './Pages/Upload';
import SearchPage from './Pages/SearchPage';
import ReadingPage from './Pages/ReadingPage';
import MyBooks from './Pages/MyBooks';
import Page404 from './Pages/Page404';
import StripeAccount from './Pages/StripeAccount';
import CancelPage from './Pages/CancelPage';
import SuccessPage from './Pages/SuccessPage';
//style
import './styles/style.scss';

const App = () => {
	const [user, setUser] = useState();
	const [lang, setLang] = useState('bulgarian')
	const [themeToggle, setThemeToggle] = useState(false);

	useEffect(() => {
		if(sessionStorage.getItem('user') !== 'null' && sessionStorage.getItem('user') !== 'undefined') {
			setUser(JSON.parse(sessionStorage.getItem('user')));
		}
		//взима theme-а и езика от localstorage
		if(localStorage.getItem('theme') === 'false' || localStorage.getItem('theme') === 'true') {
			setThemeToggle(JSON.parse(localStorage.getItem('theme')));
		}
		if(localStorage.getItem('langauge') === 'british') {
			setLang('british');
		} else {
			setLang('bulgarian');
		}
	}, []);

	useEffect(() => {
		if(user != 'undefined' && user != 'null') {
			sessionStorage.setItem('user', JSON.stringify(user));
		}
	}, [user]);

	useEffect(() => {
		localStorage.setItem('langauge', lang);
	}, [lang]);
	useEffect(() => {
		if(themeToggle) {
			document.documentElement.style.setProperty('--theme', 'dark');
			document.documentElement.style.setProperty('--background-color', '#09111f');
			document.documentElement.style.setProperty('--title-color', '#ffcf9f');
			document.documentElement.style.setProperty('--secondary-color', '#d54b00');
			document.documentElement.style.setProperty('--paragraph-color', '#fff9f5');
			document.documentElement.style.setProperty('--plain-color', '#222');
		} else {
			document.documentElement.style.setProperty('--theme', 'light');
			document.documentElement.style.setProperty('--background-color', '#f6eee0');
			document.documentElement.style.setProperty('--title-color', '#003060');
			document.documentElement.style.setProperty('--secondary-color', '#e55b13');
			document.documentElement.style.setProperty('--paragraph-color', '#a47551');
			document.documentElement.style.setProperty('--plain-color', '#fff');
		}

		//запаметява theme-а и за следващи влизания от клиента				
		localStorage.setItem('theme', themeToggle);
		
	}, [themeToggle]);


	return (
		<>
			<Navbar 
				user={user}
				themeToggle={themeToggle} 
				setThemeToggle={setThemeToggle} 
				lang={lang} 
				setLang={setLang}
			/>  
			<Routes>
				<Route path='*' element={<Page404 lang={lang}/>}/>
				<Route path='/' element={<Landing lang={lang} />} />

				<Route path='/signIn' element={
					<>
						<Landing lang={lang} />
						<SignIn setUser={setUser} lang={lang}/>
					</>} 
				/>

				<Route path='/signUp' element={
					<>
						<Landing lang={lang} />
						<SignUp setUser={setUser} lang={lang}/>
					</>} 
				/>

				<Route path='/stripeAuth' element={!user ? <Landing lang={lang} /> : <StripeAccount user={user} setUser={setUser} lang={lang}/>} 
				/>

				<Route 
					path='/home' 
					element={!user ? <Landing lang={lang} /> : <Home user={user} lang={lang} />} 
				/>

				<Route 
					path='book/:id' 
					element={!user ? <Landing lang={lang} /> : <BookDetail user={user} setUser={setUser} lang={lang}/>}
				/>

				<Route 
					path='book/:id/read' 
					element={!user ? <Landing lang={lang} /> : <ReadingPage user={user} lang={lang}/>}
				/>

				<Route 
					path='upload'
					element={!user ? <Landing lang={lang} /> : <Upload  lang={lang} user={user}/>}
				/>

				<Route 
					path='search/:name'
					element={!user ? <Landing lang={lang} /> : <SearchPage  lang={lang}/>}
				/>
				<Route 
					path='myBooks'
					element={!user ? <Landing lang={lang} /> : <MyBooks  lang={lang} user={user}/>}
				/>
				<Route 
					path='cancel'
					element={!user ? <Landing lang={lang} /> : <CancelPage  lang={lang} />}
				/>
				<Route 
					path='success'
					element={!user ? <Landing lang={lang} /> : <SuccessPage user={user} setUser={setUser} lang={lang} />}
				/>
			</Routes>
			<Footer lang={lang} />
		</>
	)
}

export default App;