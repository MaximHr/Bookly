import React from 'react';
import denied from '../Images/denied.svg';
import { useNavigate } from 'react-router-dom';
import {Text} from '../Components/Translate';

const CancelPage = () => {
    const navigate = useNavigate();
    return (
      <div className='cancel-page'>
          <div>
              <h1><Text>NotCompleted</Text></h1>
              <p><Text>Cancelled</Text></p>
              <button className="btn" onClick={() => navigate(-1)}><Text>TryAgain</Text></button>
          </div>
          <img src={denied} alt="Approved purchase" />
      </div>
    )
}

export default CancelPage;