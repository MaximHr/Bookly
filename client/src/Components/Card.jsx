import React from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Card = (props) => {
	return (
		<div className='book-card'>
			<img src={props.img} alt="Cover" />
			<div>
				<div className='flex'>	
					<h3>{props.title}</h3>
					<p className='price'>{props.price == 0 || props.price == '' ? 'Free': props.price + " BGN"}</p>
				</div>
				<div className='flex'>	
					<div>
						<p className="author">{props.author}</p>
						<p className="rating">{props.rating} <FontAwesomeIcon icon={faStar}/></p>
					</div>
					<Link className="btn" to={`/book/${props.id}`}>Add
					</Link>
				</div>
			</div>
		</div>
	)
}

	export default Card;