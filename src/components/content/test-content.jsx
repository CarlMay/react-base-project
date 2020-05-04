import React, {Component} from 'react';
import ContentContainer from "../ui/content-container";
import SearchBar from '../shared/searchBar';
import {connect} from "react-redux";
import {searchWeather} from "../../actions";

class StreamShowFavorites  extends Component {

    constructor(props) {
        super(props);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
    }

    onSearchSubmit(formValues){
        console.log('---onSearchSubmit::formValues', formValues);
        this.props.searchWeather(formValues);
    }


    render(){
        // const {favoritesArtists, removeFromLastFmFavorites} = this.props;
        // const hasFavorites = !!(favoritesArtists && favoritesArtists.length > 0);

        return (
            <ContentContainer>
                <h1 className={'ui header'}>Search Weather</h1>
                <SearchBar onSubmit={this.onSearchSubmit}/>
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