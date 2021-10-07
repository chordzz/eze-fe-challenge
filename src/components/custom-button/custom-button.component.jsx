import React from 'react';

import './custom-button.styles.css'

const CustomButton = ({type, onClick, placeholder, className}) => {
    return(
        <button 
            type = "submit"
            onClick = { onClick }
            className ={className}
        >
            {placeholder}
        </button>
    )
}

export default CustomButton;