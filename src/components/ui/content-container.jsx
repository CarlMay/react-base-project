import React from 'react';

const ContentContainer = (props) => {

    const contentStyle = {
        padding: '1rem 2rem',
    };

    return (
        <div className="ui container" style={contentStyle}>
            {props.children}
        </div>
    );
};

export default ContentContainer;