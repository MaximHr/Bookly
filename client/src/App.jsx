import React, {useState} from 'react';
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
//style
import './styles/style.scss';


const App = () => {

	// const [user, setUser] = useState({
	// 	name: 'Ivan',
	// 	email: 'ivan@abv.bg',
	// 	password: 'ivan1234,
	// 	rated_books: null
	// });

	const [user, setUser] = useState();

	return (
		<div>
			<Navbar user={user}/>  
			<Routes>
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
					element={!user ? <Landing /> : <Home />} 
				/>
				<Route 
					path='book/:id' 
					element={!user ? <Landing /> : <BookDetail />}
				/>
				<Route 
					path='upload'
					element={!user ? <Landing /> : <Upload user={user}/>}
				/>

			</Routes>
			<Footer />
		</div>
	)
}

export default App;