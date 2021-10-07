import React from 'react';

import './custom-input.styles.css'

const CustomInput = ({type, name, placeholder, onChange, className, value}) => {
    return(
        <div>
            <input type = {type} name = {name}  placeholder = {placeholder} onChange = {onChange} className = {className} value = {value} />
        </div>
    )
}

export default CustomInput