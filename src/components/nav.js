import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import StoreContext from '../context/store-context'
import { currencies } from '../utils/currency'

const Nav = props => {
    const context = useContext(StoreContext)

    return (
        <nav className="navbar navbar-light bg-light mt-4">
            <ul className="nav justify-content-center">
                <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                </li>
                { context.user &&
                <li className="nav-item">
                    <Link className="nav-link" to="/profile">profile</Link>
                </li>
                }
                { (context.isAdmin || context.isManager) &&
                <li className="nav-item">
                    <Link className="nav-link" to="/admin">admin</Link>
                </li>
                }
                <li className="nav-item">
                    {
                        currencies.map((c, i) => {
                            if (c !== context.currency)
                                return (
                                    <button className="btn btn-primary" key={i} onClick={() => context.setUserCurrency(c)}>{c}</button>
                                )
                            return ''
                        })
                    }
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/cart">cart ({context.cart.length})</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Nav
