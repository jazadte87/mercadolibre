import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router } from 'react-router-dom'

import Home from './home'
import List from './list'
import Product from './product'

const routing = (
    <Router>
        <div>
            <Route path="/" component={Home} />
            <Route path="/list/:search" component={List}/>
            <Route path="/product/:id" component={Product} />
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

serviceWorker.unregister();
