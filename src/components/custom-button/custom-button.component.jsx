import React from 'react';

import './custom-button.styles.css'

const CustomButton = ({type, onClick, placeholder}) => {
    return(
        <button 
            type = "submit"
            onClick = { onClick }
        >
            {placeholder}
        </button>
    )
}

export default CustomButton;