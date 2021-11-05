import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Home from '../src/pages/home/home.js';
import Market from '../src/pages/home/market.js';
import AddressForm from '../src/pages/add/addNewNFT';
import Test from '../src/pages/home/test.js';
import App from '../src/App.js';
import Head from '../src/components/bar/head';
import Me from '../src/pages/self/self';
import Buy from '../src/pages/self/selfbuy';
import Auc from '../src/pages/self/selfauc';
import Made from '../src/pages/self/selfmade';
import Checkout from '../src/pages/add/addNewNFT'
import History from '../src/pages/add/addHistory';

let web3 = require('./utils/InitWeb3');
const BasicRoute = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App}/>
            <Route exact path="/home" component={Home}/>
            <Route exact path="/market" component={Market}/>
            <Route exact path="/test" component={Test}/>
            <Route exact path="/me" component={Me}/>
            <Route exact path="/made" component={Made}/>
            <Route exact path="/myauc" component={Auc}/>
            <Route exact path="/buyin" component={Buy}/>
            <Route exact path="/create" component={Checkout}/>
            <Route exact path='/history/:id' component={History}/>
            {/* 地址栏跳转传参 */}
            {/* <Route exact path="/other/:id" component={Other}/> */}
        </Switch>
    </BrowserRouter>
);

export default BasicRoute;