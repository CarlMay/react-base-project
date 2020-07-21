import React from 'react';
import ProductDetail from '../shared/product-detail';

class ProductItem extends React.Component {
    state = {
        isOpen: false,
    };

    constructor(props) {
        super(props);
        this.handleAccordionOpen = this.handleAccordionOpen.bind(this);
    }

    handleAccordionOpen() {
        // console.log('--=this.props.part.part_id', this.props.part.part_id);
        this.setState({isOpen: !this.state.isOpen});
        // this.props.getProductDetail(this.props.part.part_id);
    };


    render() {

        const {part} = this.props;
        const {"part_description":description, "part_id":id} = part;
        const {isOpen} = this.state;

        // console.log('---part', part);
        // console.log('---description', description, id);

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
                            {`${accordionText} Sales Data`}
                        </span>
                    </div>
                </div>
                {isOpen && <ProductDetail partId={id} part={part}  />}
            </div>
        );
    }
}

export default ProductItem;
