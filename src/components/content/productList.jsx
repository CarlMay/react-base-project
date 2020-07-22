import React from 'react';
import ProductDetail from '../shared/product-detail';

class ProductItem extends React.Component {
    state = {
        isOpen: false,
    };

    constructor(props) {
        super(props);
        this.handleAccordionOpen = this.handleAccordionOpen.bind(this);
        // this.handleRemoveFromFavorites = this.handleRemoveFromFavorites.bind(this);
    }

    handleAccordionOpen() {
        this.setState({isOpen: !this.state.isOpen});
    }


    render() {

        const {part} = this.props;
        const {"part_description":description, "part_id":id} = part;
        const {isOpen} = this.state;

        console.log('---part', part);
        console.log('---description', description, id);

        const accordionText = (isOpen) ? 'Hide' : 'Show';

        const listStyle = {
            backgroundColor: '#f9f9f9',
            display: 'flex',
            justifyContent: 'space-between',
            borderBottom: 'solid 1px #ccc',
            boxSizing: 'content-box',
            marginTop: 0,
            marginBottom: 0,
        };

        const showReleaseStyle = {
            color: '#397abb',
            textAlign: 'right',
            cursor: 'pointer'
        };

        const showReleaseBlockStyle = {
            textAlign: 'right',
            display: 'block',
        };


        return (
            <div className="ui container">
                <div className="ui container grid" style={listStyle}>
                    <div className="three wide column">{id}</div>
                    <div className="six wide column">{description}</div>
                    <div className="three wide column" style={showReleaseBlockStyle}>
                        <span onClick={this.handleAccordionOpen}
                              style={showReleaseStyle}>
                            {`${accordionText} Releases`}
                        </span>
                    </div>
                </div>
                {isOpen && <ProductDetail partId={id} part={part} />}
            </div>
        );
    }
}

export default ProductItem;