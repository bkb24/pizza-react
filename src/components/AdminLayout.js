import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import StoreContext from '../context/store-context'

const AdminLayout = props => {
    const context = useContext(StoreContext)

    return (
        <div className="d-flex">
            <nav className="d-inline-block mt-3">
                <ul className="list-group nav flex-column justify-content-center">
                    <li className="list-group-item nav-item">
                        <Link className="nav-link" to="/admin/orders">orders</Link>
                    </li>
                    <li className="list-group-item nav-item">
                        <Link className="nav-link" to="/admin/products">products</Link>
                    </li>
                    <li className="list-group-item nav-item">
                        <Link className="nav-link" to="/admin/products/create">add new product</Link>
                    </li>

                    { context.isAdmin &&
                    <li className="list-group-item nav-item">
                        <Link className="nav-link" to="/admin/users">users</Link>
                    </li>
                    }
                </ul>
            </nav>

            <div className="p-4">
                {props.children}
            </div>
        </div>
    )
}

export default AdminLayout
