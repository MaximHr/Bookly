import React, {useEffect} from 'react';
import successImage from '../Images/success.svg';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SuccessPage = ({setUser, user}) => {
    const getUser = async() => {
        try {
            const response = await axios.get(`http://localhost:5000/users/${user.id}`);
            console.log(response);
            setUser(response.data.rows[0]);
            
        }catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getUser();
    }, []);
    return (
        <div className='success-page'>
            <div>
                <h1>Payment successfull</h1>
                <p>Thank you for your purchase !</p>
                <Link to='/home' className="btn">Go back to home</Link>
            </div>
            <img src={successImage} alt="Approved purchase" />
        </div>
    )
}

export default SuccessPage;