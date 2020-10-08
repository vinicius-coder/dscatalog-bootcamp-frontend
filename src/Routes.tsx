import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navibar from './core/components/Navbar';
import Admin from './pages/Admin';
import Catalog from './pages/Catalog';
import Home from './pages/Home';

const Routes = () => (
    <BrowserRouter>
        <Navibar />
        <Switch>    
            <Route path="/" exact>
                <Home />
            </Route>
            <Route path="/catalog">
                <Catalog />
            </Route>
            <Route path="/">
                <Admin />
            </Route>
        </Switch>
    </BrowserRouter>
);

export default Routes;