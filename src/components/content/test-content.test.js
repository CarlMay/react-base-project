import React from 'react';
import { render } from '@testing-library/react';
// import _ from 'lodash';
// import {multiply, round} from 'lodash';
import App from '../App';

test('renders correct cart total', () => {
    // const { getByText } = render(<App />);
    // const linkElement = getByText(/Search Weather/i);
    // expect(linkElement).toBeInTheDocument();

    const { getByText } = render(<App />);
    expect(getByText.find('div').attr('id')).toEqual('unitPrice');
    expect(getByText.find('div').attr('id')).toEqual('units');
    expect(getByText.find('div').attr('id')).toEqual('totalPrice');
    // const unitPrice = getByText(/unitPrice/i);



    // it('sums numbers', () => {
    //     const totalPrice = _.round(_.multiply(unitPrice, units), 2);
    //     expect(totalPrice).toEqual(199.95);
    // });
});





