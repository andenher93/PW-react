import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, browserHistory } from "react-router";

import Layout from "./components/Layout";
import Home from "./components/pages/Home";
import Projekter from "./components/pages/Projekter";
import Projekt from "./components/pages/Projekt";

import NotFound from './components/pages/NotFound';

const app = document.getElementById('app');

export default class App extends React.Component {
    render() {
        return (
            <Router history={ browserHistory  }>
                <Route path="/" component={ Layout }>
                    <IndexRoute component={ Home } />
                    <Route path="projekter">
                        <IndexRoute component={ Projekter } />
                        <Route path=":projekt" component={ Projekt } />
                    </Route>
                </Route>
                <Route path="*" component={ NotFound } />
            </Router>
        )
    }
}

ReactDOM.render(<App />, app);