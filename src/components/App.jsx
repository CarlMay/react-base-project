import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { ProductListContent } from "./content";

import Header from "./header";

const App = () => {
    return (
        <div className={'ui container'}>
            <BrowserRouter>
                <Header />
                <Route path={'/list'} exact component={ProductListContent} />
            </BrowserRouter>
        </div>
    );
};
export default App;
