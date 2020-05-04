import React, {Component} from "react";

class StarButton extends Component {
    state = {
        defaultPrefix: 'Add to ',
        selectedPrefix: 'Remove from ',
    };

    constructor(props) {
        super(props);
        this.toggleSelected = this.toggleSelected.bind(this);
    }

    toggleSelected() {
        const {id, name, removeFromFavorites, addToFavorites, selected} = this.props;

        if (!selected) {
            addToFavorites(id, name);
        } else {
            removeFromFavorites(id, name);
        }
    };

    render() {
        const {selected} = this.props;
        const {defaultPrefix, selectedPrefix} = this.state;
        const title = (selected) ? selectedPrefix : defaultPrefix;

        const selectedClassname = 'star green icon';
        const defaultClassname = 'star outline icon';
        const className = (selected) ? selectedClassname : defaultClassname;

        const favButStyle = {
            cursor: 'pointer'
        };

        return (
            <i aria-hidden="true"
               style={favButStyle}
               title={`${title} favorites`}
               className={className}
               onClick={this.toggleSelected}></i>
        );
    }
}

export default StarButton;
