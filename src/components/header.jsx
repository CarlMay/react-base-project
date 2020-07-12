import React from 'react';
import {Link} from 'react-router-dom';
import {Image} from 'semantic-ui-react';

const Header = () => {

    const iconStyle = {
        width: 'auto',
        height: 'auto',
        marginRight: '0.25rem'
    };

    const navStyle = {
        backgroundColor: '#222',
    };

    const linkStyle = {
        color: '#999',
        cursor: 'pointer !important',
        marginRight: '1rem',
    };

    return (
        <div className={'ui secondary pointing menu'} style={navStyle}>
            <div className={'left menu'}>
                <Link to={'/test'} className={'item'} style={linkStyle}>
                    <Image src='/images/favs.png' size='mini' style={iconStyle}/>
                    <span>Test Link</span>
                </Link>
                <Link to={'/list'} className={'item'} style={linkStyle}>
                    <Image src='/images/favs.png' size='mini' style={iconStyle}/>
                    <span>List</span>
                </Link>
            </div>
        </div>
    );
};

export default Header;