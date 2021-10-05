import React from 'react';

import {Card} from '../card/card.component';

import './card-list.styles.css';

export const CardList = props => {
    // console.log(props.phones)
    return (
    <div className = 'card-list'>
        {
            props.phones.map(phone => (
                <Card key={phone._id} phone={phone} />
                // console.log(phone)
            ))
        }
    </div>)
}