import React, {Component} from 'react';
import ContentContainer from "../ui/content-container";
import {Icon, Label, Menu, Table} from 'semantic-ui-react'

// import SearchBar from '../shared/searchBar';
import _ from 'lodash';
// import {multiply, round} from 'lodash';
import {connect} from "react-redux";
import {getProduct} from "../../actions";
import ProductItem from "./productList";

class ProductListContent extends Component {

    state = {
        // units: 0,
        // totalPrice: 0,
        // title: 'Dove Soap',
        // unitPrice: 39.99,
    };

    // constructor(props) {
    //     super(props);
    //     this.getProductList = this.getProductList.bind(this);
    // }

    componentDidMount() {
        this.props.getProduct();
    }


    // addToCart() {
    //     const {unitPrice, units, title} = this.state;
    //     const currentItemCount = units + 1;
    //     console.log('---addToCart', unitPrice, units, title);
    //     const totalPrice = _.round(_.multiply(unitPrice, currentItemCount), 2);
    //     this.setState({units: currentItemCount});
    //     this.setState({totalPrice: totalPrice});
    //     console.log('---totalPrice', totalPrice);
    //     console.log('---units', units);
    // }

    // const spanStyle = {
    //     'display': 'flex',
    // };


    render() {
        const {productData} = this.props;
        const partsList = productData['part_list'];
        const hasProductData = !!(partsList && partsList.length > 0);
        // const {productDataS} = this.state;
        // const hasFavorites = !!(favoritesArtists && favoritesArtists.length > 0);

        // console.log('---productData', productData);
        // console.log('---productData.length', productData.length);
        console.log('---partsList', partsList);
        console.log('---hasProductData', hasProductData);

        // {productData && productData['part_list'].map((item) => {
        //         // const {"part_id": partID, "part_description": description} = item;
        //
        //         console.log('---item', item);
        //         // console.log('---partID', partID);
        //         // console.log('---description', description);
        //
        //         return(item);
        //
        //         // return (
        //         //     <Table.Row>
        //         //         <Table.Cell>{partID}</Table.Cell>
        //         //         <Table.Cell>{description}</Table.Cell>
        //         //     </Table.Row>
        //         // );
        //     }
        // )}

        const listStyle = {
            backgroundColor: '#f9f9f9',
            display: 'flex',
            justifyContent: 'space-between',
            borderBottom: 'solid 1px #ccc',
            boxSizing: 'content-box',
            marginTop: 0,
            marginBottom: 0,
        };


        return (
            <ContentContainer>
                <h1 className={'ui header'}>B2Wize Product List</h1>

                <div className="ui container">
                    <div className="ui container grid" style={listStyle}>
                        <div className="ui container">
                            <div className="ui container grid" style={listStyle}>
                                <div className="three wide column">Part ID</div>
                                <div className="nine wide column">Part Description</div>
                            </div>
                        </div>

                        {hasProductData && partsList.map((part) => {
                            return (
                                <ProductItem key={part.part_id} part={part}/>
                            );
                        })
                        }

                    </div>
                </div>


            </ContentContainer>
        );

    }
}


const mapStateToProps = (state) => {
    console.log('---state', state);
    // ArtistReleases: state.mindz.ArtistReleases,
    // favoriteReleases: state.mindz.favoriteReleases,

    return {
        productData: state.product.productData,
    };
};

export default connect(
    mapStateToProps,
    {getProduct}
)(ProductListContent);