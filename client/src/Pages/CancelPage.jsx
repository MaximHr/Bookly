import React from 'react';
import denied from '../Images/denied.svg';
import { useNavigate } from 'react-router-dom';
import Translate from '../Components/Translate';

const CancelPage = ({lang}) => {
    const navigate = useNavigate();
    return (
      <div className='cancel-page'>
          <div>
              <h1>{lang === 'bulgarian' ? Translate.NotCompleted.bulgarian : Translate.NotCompleted.british}</h1>
              <p>{lang === 'bulgarian' ? Translate.Cancelled.bulgarian : Translate.Cancelled.british}</p>
              <button className="btn" onClick={() => navigate(-1)}>{lang === 'bulgarian' ? Translate.TryAgain.bulgarian : Translate.TryAgain.british}</button>
          </div>
          <img src={denied} alt="Approved purchase" />
      </div>
    )
}

export default CancelPage;