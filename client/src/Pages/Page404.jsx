import React from 'react'
import { Link } from 'react-router-dom';

const Page404 = () => {
  return (
    <div className='not-found'>
        <h1>404</h1>
        <h2>Sorry, this page was not found.</h2>
        <Link className='btn' to='/home'>Go to home !</Link>
    </div>
  )
}

export default Page404;