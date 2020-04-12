import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

import { Home, Credit, Game } from 'pages';

class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <Route exact path="/" component={Home} />
                <Route exact path="/credit" component={Credit} />
                <Route exact path="/game" component={Game} />
            </BrowserRouter>
        );
    }
}

export default App;