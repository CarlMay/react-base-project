import React, {Component} from 'react';
import ContentContainer from "../ui/content-container";
// import SearchBar from '../shared/searchBar';
import _ from 'lodash';
// import {multiply, round} from 'lodash';
import {connect} from "react-redux";
import {searchWeather} from "../../actions";

class StreamShowFavorites extends Component {

    state = {
        units: 0,
        totalPrice: 0,
        title: 'Dove Soap',
        unitPrice: 39.99,
    };

    constructor(props) {
        super(props);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
    }

    onSearchSubmit(formValues) {
        console.log('---onSearchSubmit::formValues', formValues);
        this.props.searchWeather(formValues);
    }

    addToCart() {
        const {unitPrice, units, title} = this.state;
        const currentItemCount = units + 1;
        console.log('---addToCart', unitPrice, units, title);
        const totalPrice = _.round(_.multiply(unitPrice, currentItemCount), 2);
        this.setState({units: currentItemCount});
        this.setState({totalPrice: totalPrice});
        console.log('---totalPrice', totalPrice);
        console.log('---units', units);
    }

    // const spanStyle = {
    //     'display': 'flex',
    // };


    render() {
        // const {favoritesArtists, removeFromLastFmFavorites} = this.props;
        // const hasFavorites = !!(favoritesArtists && favoritesArtists.length > 0);

        const { totalPrice, unitPrice, title, units } = this.state;

        return (
            <ContentContainer>
                <h1 className={'ui header'}>Search Weather</h1>

                <div className={'item'}>
                    <div className={'title'}>{title}</div>
                    <div data-test={'item-price'} id="unitPrice" className={'price'}>{unitPrice}</div>
                    <div id="units" className={'units'}>{units}</div>
                    <div className={'add-to-cart'}
                         onClick={e => this.addToCart()}>Add to Cart
                    </div>
                    {
                        totalPrice && (totalPrice > 0) &&
                        <div id="totalPrice" className={'total-price'}>{totalPrice}</div>
                    }
                </div>
            </ContentContainer>
        );

    }
}


const mapStateToProps = (state) => {
    return {
        // favoritesArtists: state.lastFm.favoritesArtists,
    };
};

export default connect(
    mapStateToProps,
    {searchWeather}
)(StreamShowFavorites);