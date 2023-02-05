import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import bgFlag from '../Images/bgFlag.svg';
import britishFlag from '../Images/britishFlag.svg';
import {Text} from '../Components/Translate';

const DropDown = ({themeToggle, setThemeToggle, lang, setLang, setDropDown}) => {
    return (
        <div>
            <div className="outside" onClick={(e) => setDropDown(false)}></div>
            <ul className='dropdown' >
                <Link to='/upload'><Text>Publish</Text></Link>
                <Link to='/myBooks'><Text>MyBooks</Text></Link>
                <div className='appearance'>
                    <p><Text>Theme</Text></p>
                    <div 
                        className="toggle-container" 
                        onClick={() => setThemeToggle(!themeToggle)}
                    >
                        <FontAwesomeIcon icon={faSun}/>
                        <div 
                            className={themeToggle ? 'toggle-btn transformed' : 'toggle-btn'} 
                        ></div>
                        <FontAwesomeIcon icon={faMoon}/>
                    </div> 
                </div>
                <div className='appearance'>
                    <p><Text>Lang</Text></p>
                    <div 
                        className="toggle-container" 
                        onClick={() => {
                            lang === 'bulgarian' ? setLang('british') :
                            setLang('bulgarian')
                        }}
                    >
                        <img src={bgFlag} alt="bulgarian flag" />
                        <div 
                            className={lang === 'british' ? 'toggle-btn transformed' : 'toggle-btn'} 
                        ></div>
                        <img src={britishFlag} alt="british flag" />
                    </div> 
                </div>
            </ul>
        </div>
    )
}

export default DropDown