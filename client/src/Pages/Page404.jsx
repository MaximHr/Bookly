import React from 'react'
import { Link } from 'react-router-dom';
import {Text} from '../Components/Translate';


const Page404 = () => {
  return (
    <div className='not-found'>
        <h1>404</h1>
        <h2><Text>NotFound</Text></h2>
        <Link className='btn' to='/home'><Text>GoHome</Text></Link>
    </div>
  )
}

export default Page404;