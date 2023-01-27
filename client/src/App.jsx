import React, {useState, useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
//components
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
//pages
import Landing from './Pages/Landing';
import Home from './Pages/Home';
import BookDetail from './Pages/BookDetail';
import Upload from './Pages/Upload';
import SearchPage from './Pages/SearchPage';
import ReadingPage from './Pages/ReadingPage';
import MyBooks from './Pages/MyBooks';

//style
import './styles/style.scss';
import Page404 from './Pages/Page404';

const App = () => {
	const [user, setUser] = useState();
	const [themeToggle, setThemeToggle] = useState(false);

	useEffect(() => {
		if(sessionStorage.getItem('user') !== null) {
			setUser(JSON.parse(sessionStorage.getItem('user')));
		}
		if(localStorage.getItem('theme') == 'false' || localStorage.getItem('theme') == 'true') {
			//запаметява theme-а и за следващи влизания от клиента				
			setThemeToggle(JSON.parse(localStorage.getItem('theme')));
		}
	}, []);

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
		localStorage.setItem('theme', themeToggle);
		
	}, [themeToggle]);


	return (
		<div>
			<Navbar user={user} themeToggle={themeToggle} setThemeToggle={setThemeToggle}/>  
			<Routes>
				<Route path='*' element={<Page404 />}/>
				<Route path='/' element={<Landing />} />

				<Route path='/signIn' element={
					<>
						<Landing />
						<SignIn setUser={setUser}/>
					</>} 
				/>

				<Route path='/signUp' element={
					<>
						<Landing />
						<SignUp setUser={setUser}/>
					</>} 
				/>

				<Route 
					path='/home' 
					element={!user ? <Landing /> : <Home user={user}/>} 
				/>

				<Route 
					path='book/:id' 
					element={!user ? <Landing /> : <BookDetail user={user} setUser={setUser}/>}
				/>

				<Route 
					path='book/:id/read' 
					element={!user ? <Landing /> : <ReadingPage />}
				/>

				<Route 
					path='upload'
					element={!user ? <Landing /> : <Upload user={user}/>}
				/>

				<Route 
					path='search/:name'
					element={!user ? <Landing /> : <SearchPage/>}
				/>
				<Route 
					path='myBooks'
					element={!user ? <Landing /> : <MyBooks user={user}/>}
				/>
			</Routes>
			<Footer />
		</div>
	)
}

export default App;