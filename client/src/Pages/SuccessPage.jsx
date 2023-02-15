import React, {useEffect} from 'react';
import successImage from '../Images/success.svg';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Translate from '../Components/Translate';

const SuccessPage = ({setUser, user, lang}) => {
    const getUser = async() => {
        try {
            const response = await axios.get(`http://188.138.70.154:8000/users/${user.id}`);
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
                <h1>{lang === 'bulgarian' ? Translate.Success.bulgarian : Translate.Success.british}</h1>
                <p>{lang === 'bulgarian' ? Translate.ThankYou.bulgarian : Translate.ThankYou.british}</p>
                <Link to='/home' className="btn">{lang === 'bulgarian' ? Translate.GoHome.bulgarian : Translate.GoHome.british}</Link>
            </div>
            <img src={successImage} alt="Approved purchase" />
        </div>
    )
}

export default SuccessPage;