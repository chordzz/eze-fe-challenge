import React from 'react';
import CustomButton from '../custom-button/custom-button.component';

import CustomInput from '../custom-input/custom-input.component';

import './search-box.styles.css';


export const SearchBox = ({ placeholder, handleChange, value, handleSearch }) => {
    // let query = ' ';
    return(
        <form onSubmit = {handleSearch} >
            <CustomInput
                className = 'search'
                type= 'search' 
                placeholder= {placeholder}
                onChange = {handleChange}
                // onChange = {handleChange2}
                // onKeyDown = {(e) => {
                //     e.preventDefault()
                //     if(e.key === "Enter"){
                //         console.log("Enter Pressed");
                //         // console.log(handleChange2);
                //         // handleChange(query)                    
                //     }
                // }} 
                value = {value}
            />

            <CustomButton 
                type="submit"
                placeholder = "Search Phones" 
            />
        </form>
        

    )
}

