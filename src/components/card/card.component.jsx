import React from 'react';

import './card.styles.css';

export const Card = (props) => {

    
        
    return(        
        <div className='card-container'>
            <img 
                alt='phone' 
                src={props.phone.imgUrl}
            />
            <h2>{ props.phone.name }</h2>
            {/* <p>{ props.phone.email }</p>    */}
            {
                props.phone.price ?
                (   
                    <div className="others">
                        <p>Storage Size: {props.phone.price.storageSize}</p>
                        <p>Grade: {props.phone.price.grade}</p>
                        <p>Price: {props.phone.price.amount}</p>
                    </div>
                    
                )
                :
                null
            }     
        </div>
    )
}