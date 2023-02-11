import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import {Text} from '../Components/Translate';

const Footer = () => {
  return (
    <div className='footer'>
        <p><Text>Made</Text> <FontAwesomeIcon icon={faHeart} /><Text>Maksim</Text></p>
    </div>
  )
}

export default Footer;