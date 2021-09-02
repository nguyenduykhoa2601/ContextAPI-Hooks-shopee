import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import Cart from './cart/Cart';

import Login from './auth/login/Login';
import Notfound from './utils/notfound/Notfound';
import Register from './auth/register/Register';
import { GlobalState } from '../../GlobalState';
import Products from './products/Products';
import DetailProduct from './detailProduct/DetailProduct';
import CreateCategory from './createCategory/CreateCategory';
import CreateProduct from './createProduct/CreateProduct';

import OrderForm from './cart/OrderForm/OrderForm';
import History from './history/History';
import Static from './static/Static';
function MainPages() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin
    const [cart] = state.userAPI.cart

    return (
        <Switch>
            <Route path="/" exact component={Products} />
            <Route path="/detail/:id" exact component={DetailProduct} />

            <Route path="/login" exact component={isLogged ? Notfound : Login} />
            <Route path="/register" exact component={isLogged ? Notfound : Register} />
            <Route path="/create_category" exact component={ isAdmin ? CreateCategory : Notfound} />
            
            <Route path="/create_product" exact component={isAdmin ? CreateProduct : Notfound} />
            <Route path="/edit_product/:id" exact component={isAdmin ? CreateProduct : Notfound} />
            
            <Route path="/history" exact component={isLogged ? History : Notfound} />
            <Route path="/history/:id" exact component={isLogged ? Notfound : Notfound} /> 
            <Route path="/order" exact component = {isLogged && cart.length!==0 ? OrderForm: Notfound} />
            <Route path="/static" exact component={isAdmin ? Static : Notfound} />
            <Route path="/cart" exact component={Cart} />

            <Route path="*" exact component={Notfound} />
        </Switch>
    )

}

export default MainPages;
