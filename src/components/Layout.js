import React, { useContext } from 'react'
import Nav from './nav'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import Products from '../pages/products'
import Product from '../pages/product'
import Cart from '../pages/cart'
import Profile from '../pages/profile'
import Order from '../pages/order'
import Orders from '../pages/orders'

import Admin from '../pages/admin'
import AdminProducts from '../pages/admin/products'
import ProductAdmin from '../pages/admin/product-admin'
import ProductAdminCreate from '../pages/admin/product-admin-create'
import Users from '../pages/admin/users'
import User from '../pages/admin/user'

import StoreContext from '../context/store-context'
import AdminUserOrders from '../pages/admin/admin-user-orders'
import AdminOrder from '../pages/admin/admin-order'
import AdminOrders from '../pages/admin/admin-orders'

const Layout = props => {
    const context = useContext(StoreContext)

    return (
        <div className="container">
            <Router>
                <Nav />

                { context.loaded &&
                    <Switch>
                        <Route path="/" exact>
                            <Products />
                        </Route>

                        <Route path="/cart" exact>
                            <Cart />
                        </Route>

                        <Route path="/orders" exact>
                            <Orders />
                        </Route>

                        <Route path="/orders/:id" exact>
                            <Order />
                        </Route>

                        { context.user &&
                            <Route path="/profile" exact>
                                <Profile />
                            </Route>
                        }

                        { (context.isAdmin || context.isManager) &&
                            <Route path="/admin" exact>
                                <Admin />
                            </Route>
                        }

                        { (context.isAdmin || context.isManager) &&
                            <Route path="/admin/products" exact>
                                <AdminProducts />
                            </Route>
                        }

                        { (context.isAdmin || context.isManager) &&
                            <Route path="/admin/products/create" exact component={ProductAdminCreate} />
                        }

                        { (context.isAdmin || context.isManager) &&
                            <Route path="/admin/products/:id" exact component={ProductAdmin} />
                        }

                        { (context.isAdmin || context.isManager) &&
                            <Route path="/admin/orders" exact>
                                <AdminOrders />
                            </Route>
                        }

                        { (context.isAdmin || context.isManager) &&

                            <Route path="/admin/orders/:id" exact>
                                <AdminOrder />
                            </Route>
                        }

                        { context.isAdmin &&
                            <Route path="/admin/users" exact>
                                <Users />
                            </Route>
                        }

                        { context.isAdmin &&
                            <Route path="/admin/users/:id" exact>
                                <User />
                            </Route>
                        }

                        { context.isAdmin &&
                            <Route path="/admin/users/:userId/orders" exact>
                                <AdminUserOrders />
                            </Route>
                        }

                        <Route path="/products/:id" exact>
                            <Product />
                        </Route>

                    </Switch>
                }

            </Router>
        </div>
    )

}

export default Layout
