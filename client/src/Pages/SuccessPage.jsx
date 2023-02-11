import React, {useEffect} from 'react';
import successImage from '../Images/success.svg';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {Text} from '../Components/Translate';


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
                <h1><Text>Success</Text></h1>
                <p><Text>ThankYou</Text></p>
                <Link to='/home' className="btn"><Text>GoHome</Text></Link>
            </div>
            <img src={successImage} alt="Approved purchase" />
        </div>
    )
}

export default SuccessPage;