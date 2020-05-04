import React, {Component} from 'react';
import ContentContainer from "../ui/content-container";
// import ArtistList from './components/mindz/artistList';
import {connect} from "react-redux";
import {searchWeather} from "../../actions";

class StreamShowFavorites  extends Component {

    render(){
        // const {favoritesArtists, removeFromLastFmFavorites} = this.props;
        // const hasFavorites = !!(favoritesArtists && favoritesArtists.length > 0);

        return (
            <ContentContainer>
                <h1 className={'ui header'}>Test Heading</h1>
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