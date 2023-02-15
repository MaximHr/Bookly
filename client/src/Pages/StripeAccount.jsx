import React, {useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import Translate from '../Components/Translate';

// stripe акаунт за продавач
const StripeAccount = ({ setUser, user, lang }) => {
    const [loading, setLoading] = useState(false);
	const stripeOnBoarding = async(e) => {
        setLoading(true);
		e.preventDefault();
		try {
			const response = await axios.post('http://188.138.70.154:8000/stripe/account', {email: user.email, id: user.id});
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
            <h1>{lang === 'bulgarian' ? Translate.LastStep.bulgarian : Translate.LastStep.british}</h1>
            <p className='stripe-info'>
            {lang === 'bulgarian' ? Translate.stripeAuthInfo.bulgarian : Translate.stripeAuthInfo.british} 
                <a rel="noreferrer" target='_blank' href="https://stripe.com/en-bg/connect-account/legal/recipient">{lang === 'bulgarian' ? Translate.Conditions.bulgarian : Translate.Conditions.british}</a>.
            </p>
           
            <div className="btn-container">	
                <button className="btn" onClick={(e) => stripeOnBoarding(e)}>
                    {loading ? <FontAwesomeIcon title='Loading...' icon={faSpinner} className='spinner'/> : <></>} {lang === 'bulgarian' ? Translate.CreateStripeAcc.bulgarian : Translate.CreateStripeAcc.british}
                </button>
                <Link className="btn" to='/home'>
                {lang === 'bulgarian' ? Translate.Skip.bulgarian : Translate.Skip.british}
                    <FontAwesomeIcon icon={faArrowRight}/>
                </Link>
            </div>
        </div>
    )
}

export default StripeAccount;