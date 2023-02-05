import React from 'react';
import denied from '../Images/denied.svg';
import { useNavigate } from 'react-router-dom';

const CancelPage = () => {
    const navigate = useNavigate();
    return (
      <div className='cancel-page'>
          <div>
              <h1>Payment not completed !</h1>
              <p>We were unable to process your online payment. Please resubmit your payment. Thank you.</p>
              <button className="btn" onClick={() => navigate(-1)}>Try Again</button>
          </div>
          <img src={denied} alt="Approved purchase" />
      </div>
    )
}

export default CancelPage;