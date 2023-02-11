import React, {useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import {Text} from '../Components/Translate';

// stripe акаунт за продавач
const StripeAccount = ({ setUser, user }) => {
    const [loading, setLoading] = useState(false);
	const stripeOnBoarding = async(e) => {
        setLoading(true);
		e.preventDefault();
		try {
			const response = await axios.post('/stripe/account', {email: user.email, id: user.id});
            setUser(response.data);
			if(response.status === 200) {
				window.location.href = response.data.url;
			}
		}catch(err) {
            toast.error("Sorry, there was an error. Try again later", {
				autoClose: 2500,
				position: 'top-center'
			});
            setLoading(false);
		}
	}
    return (
        <div className='stripe-account'>
            <ToastContainer />
            <h1><Text>LastStep</Text></h1>
            <p className='stripe-info'>
                <Text>stripeAuthInfo</Text> 
                <a rel="noreferrer" target='_blank' href="https://stripe.com/en-bg/connect-account/legal/recipient"><Text>Conditions</Text></a>.
            </p>
           
            <div className="btn-container">	
                <button className="btn" onClick={(e) => stripeOnBoarding(e)}>
                    {loading ? <FontAwesomeIcon title='Loading...' icon={faSpinner} className='spinner'/> : <></>} <Text>CreateStripeAcc</Text>
                </button>
                <Link className="btn" to='/home'>
                    <Text>Skip</Text>
                    <FontAwesomeIcon icon={faArrowRight}/>
                </Link>
            </div>
        </div>
    )
}

export default StripeAccount;