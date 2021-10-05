import React from 'react';

import './card.styles.css';

export const Card = (props) => {
    // console.log(props.phone)

    
        
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
                        <p>{props.phone.price.storageSize}</p>
                        <p>{props.phone.price.grade}</p>
                        <p>{props.phone.price.amount}</p>
                    </div>
                    
                )
                :
                null
            }     
        </div>
    )
}