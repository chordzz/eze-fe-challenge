import React, { Component } from 'react';

import { CardList } from '../card-list/card-list.component';
import { SearchBox } from '../search-box/search-box.component';
// import { Card } from '../card/card.component';

import './home.styles.css'

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
    }

    fetchItems = (endpoint) => {
        fetch(endpoint)
            .then(result => result.json())
            .then(result => this.setState({ phoneData: result.data.data, totalPhones: result.data.total, fetching: false, filteredPhonesData: result.data.data }))
    }

    handleChange = (e) => {
        this.setState({ searchFieldText: e.target.value, fetching: true }, () => {
            let filteredPhones = this.state.phoneData.filter((phone) => (phone.name.toLowerCase().includes(this.state.searchFieldText.toLowerCase())))

            this.setState({ filteredPhonesData: filteredPhones, fetching: false})
        });
    };

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
        let endpoint = 'https://eze-mobile-api-staging.herokuapp.com/api/v1/products/price?category=Smartphones&brand=Apple&sort=lowestAsk&hoursInterval=24&limit=20&page=1&slugId='
        this.fetchItems(endpoint)

    }

    render() {

        const {fetching, filteredPhonesData, searchFieldMax, searchFieldMin } = this.state;
        
        return (
            <div className="homepage">
                <h1> Homepage </h1>

                <SearchBox 
                    handleChange = {this.handleChange}
                    placeholder = "Search Phones"
                />

                <input type="number" name = "min-price"  placeholder = "enter minimum price" onChange = {(e) => this.setState({ searchFieldMin: e.target.value})} />

                <input type="number" name = "max-price" placeholder = "enter maximum price" onChange = {(e) => this.setState({ searchFieldMax: e.target.value})} />

                <button onClick = {() => this.handlePriceChange(searchFieldMax, searchFieldMin)}>Search Prices</button>

                {
                    fetching ? <h3>Loading Data...</h3> : <CardList phones = {filteredPhonesData} />
                }
        
            </div>
        )
    }
}

export default Home;