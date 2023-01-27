import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <div className='footer'>
        <p>Made with <FontAwesomeIcon icon={faHeart} /> by Maksim Hristov</p>
    </div>
  )
}

export default Footer;