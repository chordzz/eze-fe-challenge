import React from 'react';

import './search.styles.css'

import { SearchBox } from '../search-box/search-box.component';
import CustomInput from '../custom-input/custom-input.component';

const Search = ({ handleChange, handleSearch, value }) => {
    return(
        <div>
            <div>
                <SearchBox 
                    handleChange = {this.handleChange}
                    handleSearch = {this.handleSearch}
                    value = {searchFieldText}
                    // onKeydown = {(e) => console.log(e)}
                    // handleChange2 = {this.handleChange2}
                    placeholder = "Search Phones"
                    
                    // values = {this.handleChange2}
                />
            </div>
            <div>
                <CustomInput 
                    type = "number"
                    name = "min-price"
                    className = "text-input"
                    placeholder = "Enter minimum price"
                    onChange = {(e) => this.setState({ searchFieldMin: e.target.value })}
                />

                <CustomInput 
                    type = "number"
                    name = "max-price"
                    placeholder = "Enter maximum price"
                    className = "text-input"
                    onChange = {(e) => this.setState({ searchFieldMax: e.target.value })}
                />

                <CustomButton 
                    type = "submit"
                    onClick = {() => 
                        {
                            this.handlePriceChange(searchFieldMax, searchFieldMin)
                        }
                    }
                    placeholder = "Search by Prices"
                />


            </div>
        </div>
    )
}


export default Search