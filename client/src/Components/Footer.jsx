import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Translate from '../Components/Translate'

const Footer = ({lang}) => {
  return (
    <div className='footer'>
        <p>{lang === 'bulgarian' ? Translate.Made.bulgarian : Translate.Made.british} <FontAwesomeIcon icon={faHeart} />{lang === 'bulgarian' ? Translate.Maksim.bulgarian : Translate.Maksim.british}</p>
    </div>
  )
}

export default Footer;