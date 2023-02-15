import React from 'react'
import { Link } from 'react-router-dom';
import Translate from '../Components/Translate';


const Page404 = ({lang}) => {
  return (
    <div className='not-found'>
        <h1>404</h1>
        <h2>{lang === 'bulgarian' ? Translate.NotFound.bulgarian : Translate.NotFound.british}</h2>
        <Link className='btn' to='/home'>{lang === 'bulgarian' ? Translate.GoHome.bulgarian : Translate.GoHome.british}</Link>
    </div>
  )
}

export default Page404;