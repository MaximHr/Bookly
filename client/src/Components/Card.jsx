import React from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faStar } from '@fortawesome/free-solid-svg-icons';
import {Text} from '../Components/Translate';

// компонент, който показва основните характеристики(име, снимка, цена, оценка) на книгата и води до BookDetail страницата.

const Card = (props) => {
	return (
		<div className='book-card' >
			<img src={props.img} alt="Cover" />
			<div>
				<div className='flex'>	
					<h3>{props.title}</h3>
					<p className='price'>{props.price == 0 ? "Free" : props.price + " BGN"}</p>
				</div>
				<div className='flex'>	
					<div>
						<p className="author">{props.author}</p>
						<p className="rating" title={props.rating || 0 + ' out of 5'}>
							{props.rating || 0} 		<FontAwesomeIcon icon={faStar} />
						</p>
						{
							//авторът на книгата може да види колко хора са чели книгата му
							
							props.views ? 
							<>
								<p title={props.views + ' views'} className='views'>
									{props.views} 
									<FontAwesomeIcon icon={faEye}/>		
								</p></> : 
							<></>
						}
					</div>
					<Link className="btn" to={`/book/${props.id}`}><Text>Read</Text>
					</Link>
				</div>
			</div>
		</div>
	)
}

	export default Card;