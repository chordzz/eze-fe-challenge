import React, { Component } from 'react';

import { CardList } from '../card-list/card-list.component';
import { SearchBox } from '../search-box/search-box.component';
import CustomInput from '../custom-input/custom-input.component';
import CustomButton from '../custom-button/custom-button.component';
// import { Card } from '../card/card.component';

import './home.styles.css'
// import Search from '../search/search.component';

class Home extends Component {

    constructor() {
        super();

        this.state = {
            phoneData: [],
            totalPhones: null,
            searchFieldText: "",
            searchFieldMax: null,
            searchFieldMin: null,
            fetching: true,
            filteredPhonesData: [],

        }

        this.handleChange = this.handleChange.bind(this)
    }

    fetchItems = (endpoint) => {
        fetch(endpoint)
            .then(result => result.json())
            .then(result => this.setState({ phoneData: result.data.data, totalPhones: result.data.total, fetching: false, filteredPhonesData: result.data.data }))
    }

    handleSearch = (e) => {
        e.preventDefault();
        const {searchFieldText} = this.state;

        let searchQuery = searchFieldText.split(',').filter( element => element !== '' )

        if(searchQuery.length === 1 ){
            this.doSearch(searchQuery[0])
        }else if(searchQuery.length === 2) {
            this.doSearch(searchQuery[0], searchQuery[1])
        }else if(searchQuery.length === 3){
            this.doSearch(searchQuery[0], searchQuery[1], searchQuery[2])
        }

       
    }



    handleChange = (e) => {
        const {searchFieldText, phoneData} = this.state;

        this.setState({searchFieldText: e.target.value})
        
        if(searchFieldText === '') {
            this.setState({filteredPhonesData: phoneData})
        }
        
    };

    doSearch = (name, grade, size) => {

        const { phoneData } = this.state;

        if(name && grade && size){
            console.log("SEarching with all name-grade-size", name, grade, size);

            this.setState({ filteredPhonesData: '',fetching: true }, () => {

                let filteredPhoneByName = this.state.phoneData.filter( phone => phone.name.toLowerCase().includes(name.toLowerCase()))

                let newArr = []
                filteredPhoneByName.forEach( phone => {
                        phone.data.forEach(element => {
                            element.name = phone.name
                            element.imgUrl = phone.imgUrl
                            element._id = element.id
                            if(element.price.grade && element.price.grade.toLowerCase() === grade.toLowerCase()){
                                if(element.price.storageSize.toLowerCase() === size.toLowerCase()){
                                    newArr.push(element)
                                }
                                
                            }
                        })                    
                })
                this.setState({fetching: false, filteredPhonesData: newArr }, () => console.log(this.state))
            })

        } else if (name && grade) {
            console.log("Searching with name-grade", name, grade);

            this.setState({ filteredPhonesData: '',fetching: true }, () => {

                let filteredPhoneByName = this.state.phoneData.filter( phone => phone.name.toLowerCase().includes(name.toLowerCase()))

                let newArr = []
                filteredPhoneByName.forEach( phone => {
                        phone.data.forEach(element => {
                            element.name = phone.name
                            element.imgUrl = phone.imgUrl
                            element._id = element.id
                            if(element.price.grade && element.price.grade.toLowerCase() === grade.toLowerCase()){
                                newArr.push(element)
                            }
                        })                    
                })

                this.setState({fetching: false, filteredPhonesData: newArr }, () => console.log(this.state))

            })
        } else if (grade){
            console.log("Search with grade", grade);

            this.setState({ filteredPhonesData: '',fetching: true }, () => {
                let newArr = []
                phoneData.forEach( phone => {
                        phone.data.forEach(element => {
                            element.name = phone.name
                            element.imgUrl = phone.imgUrl
                            element._id = element.id
                            if(element.price.grade && element.price.grade.toLowerCase() === grade.toLowerCase()){
                                newArr.push(element)
                            }
                        })                    
                })
                this.setState({fetching: false, filteredPhonesData: newArr }, () => console.log(this.state))
            })
        }  
    }

    handlePriceChange = (a, b) => {
        this.searchPhones(a, b)
    };

    searchPhones = (a, b) => {

        let priceRangePhones = [];
        this.state.phoneData.forEach(
            (phone) =>{ 
                phone.data.forEach(( element ) => {
                    if(element.price.amount >= b && element.price.amount <= a){

                        priceRangePhones.push([element, phone.imgUrl, phone.name, phone._id]);
                            
                    }
                })
            }   
        )

        let filteredPhones = priceRangePhones.map((element) => {
            element[0].imgUrl = element[1];
            element[0].name = element[2]
            element[0]._id = element[3]
            return element[0]
        })
        this.setState({ filteredPhonesData: filteredPhones, fetching: false});
    }

    componentDidMount() {
        let endpoint = 'https://eze-mobile-api-staging.herokuapp.com/api/v1/products/price?category=Smartphones&brand=Apple&sort=lowestAsk&hoursInterval=24&limit=3&page=1&slugId='
        this.fetchItems(endpoint)

    }

    render() {

        const {fetching, filteredPhonesData, searchFieldMax, searchFieldMin, searchFieldText } = this.state;
        
        return (
            <div className="homepage">
                <h1> Homepage </h1>

                <SearchBox 
                    handleChange = {this.handleChange}
                    handleSearch = {this.handleSearch}
                    value = {searchFieldText}
                    // onKeydown = {(e) => console.log(e)}
                    // handleChange2 = {this.handleChange2}
                    placeholder = "Search Phones"
                    
                    // values = {this.handleChange2}
                />

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

                {
                    fetching ? <h3>Loading Data...</h3> : <CardList phones = {filteredPhonesData} />
                }
        
            </div>
        )
    }
}

export default Home;