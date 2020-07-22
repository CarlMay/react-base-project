import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {
    TestContent
} from "./content";

import Header from "./header";

const App = () => {
    return (
        <div className={'ui container'}>
            <BrowserRouter>
                <Header/>
                <Route path={'/'} exact component={TestContent}/>
                <Route path={'/test'} exact component={TestContent}/>
            </BrowserRouter>
        </div>
    );
};
export default App;
