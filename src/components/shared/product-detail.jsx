import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    searchReleases,
    addToMindzFavorites,
    removeFromMindzFavorites,
} from '../../actions';
// import StarButton from '../ui/star-button';

class ProductDetails extends Component {

    static defaultProps = {
        label: 'default',
    };

    componentDidMount() {
        // this.props.searchReleases(this.props.artistId);
    }

    // handleAddToFavorites(releaseId, artistId) {
    //     const release = {
    //         'releaseId': releaseId,
    //         'artistId': artistId,
    //     };
    //     this.props.addToMindzFavorites(release);
    // };

    // handleRemoveFromFavorites(releaseId, artistId) {
    //     const release = {
    //         'releaseId': releaseId,
    //         'artistId': artistId,
    //     };
    //     this.props.removeFromMindzFavorites(release);
    // };

    // findLabelHelper = (labelInfo) => {
    //     if (!labelInfo || !labelInfo.length) return '';
    //     return labelInfo.reduce((acc, current) => {
    //         if (!!acc) return acc;
    //         if (current.label && current.label.name) return current.label.name;
    //         return acc;
    //     }, null);
    // };


    renderDetails() {
        const {part} =this.props;

        console.log('---part', part);


        const loaderStyle = {
            marginBottom: '1rem',
        };

        if (!part || part.length === 0) {
            return (
                <div className="ui centered active inline loader" style={loaderStyle}></div>
            )
        }


        return (
            <div>part</div>

            // releases.map((release) => {
            //     const {id, title, date, "label-info": labelInfo, "track-count": tracks} = release;
            //     const label = this.findLabelHelper(labelInfo);
            //
            //     const isSelected = !!(favoriteReleases.find((e) => {
            //         return e.releaseId === id;
            //     }));
            //
            //
            //     const rowStyle = {
            //         marginBottom: 0,
            //         marginTop: 0,
            //     };
            //
            //     return (
            //         <div className="row" key={id}>
            //             <div className="one wide column" style={rowStyle}>
            //                 <StarButton
            //                     addToFavorites={this.handleAddToFavorites}
            //                     removeFromFavorites={this.handleRemoveFromFavorites}
            //                     id={id}
            //                     name={this.props.artistId}
            //                     selected={isSelected}
            //                 />
            //             </div>
            //             <div className="two wide column" style={rowStyle}>{date}</div>
            //             <div className="three wide column" style={rowStyle}>{title}</div>
            //             <div className="three wide column" style={rowStyle}>{label}</div>
            //             <div className="three wide column" style={rowStyle}>{tracks}</div>
            //         </div>
            //     );
            // })
        );
    }


    render() {
        const rowStyle = {
            marginBottom: 0,
            marginTop: 0,
        };

        const listStyle = {
            paddingBottom: '10px',
        };

        return (
            <div className="ui container five column grid vertically divided" style={listStyle}>
                <div className="row">
                    <div className="one wide column" style={rowStyle}></div>
                    <div className="two wide column" style={rowStyle}>Year</div>
                    <div className="three wide column" style={rowStyle}>Title</div>
                    <div className="three wide column" style={rowStyle}>Release label</div>
                    <div className="three wide column" style={rowStyle}>Number of tracks</div>
                </div>
                {this.renderDetails()}
            </div>

        );
    }
}


// const mapStateToProps = (state) => {
//     return {
//         ArtistReleases: state.mindz.ArtistReleases,
//         favoriteReleases: state.mindz.favoriteReleases,
//     };
// };


export default connect(
    // mapStateToProps,
    // {
    //     // searchReleases,
    //     // addToMindzFavorites,
    //     // removeFromMindzFavorites,
    // }
)(ProductDetails);
