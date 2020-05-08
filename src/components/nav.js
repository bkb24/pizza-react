import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import StoreContext from '../context/store-context'
import { currencies } from '../utils/currency'
import { saveCurrency, logout } from '../services/user'

const Nav = props => {
    const context = useContext(StoreContext)

    const changeCurrency = (currency) => {
        saveCurrency(currency)
            .then(response => {
                context.setUserCurrency(currency)
            })
    }

    const handleLogout = (e) => {
        e.preventDefault()

        logout()
            .then(() => {
                window.location.replace('/')
            })
    }

    return (
        <nav className="navbar navbar-light bg-light mt-4 d-flex">

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
                                    <button className="btn btn-primary" key={i} onClick={() => changeCurrency(c)}>{c}</button>
                                )
                            return ''
                        })
                    }
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/cart">cart ({context.cart.length})</Link>
                </li>
            </ul>

            <div className="flex-grow-1"></div>

            <ul className="nav justify-content-center">
                { !context.user ?
                    <>
                        <li className="nav-item">
                            <a className="nav-link" href="/login">login</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/register">register</a>
                        </li>
                    </>

                    :

                    <li className="nav-item">
                        <a href="/logout" className="nav-link" onClick={handleLogout}>logout</a>
                    </li>
                }
            </ul>

        </nav>
    )
}

export default Nav
