import React, { useState, useEffect } from 'react'
import { getOrders } from '../../services/admin'
import OrderSummary from '../../components/orders/OrderSummary'
import AdminLayout from '../../components/AdminLayout'
import { Link } from 'react-router-dom'

const AdminOrders = () => {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        getOrders()
            .then(response => {
                setOrders(response.data)
            })
    }, [])

    return (
        <AdminLayout className="mt-4">
            {
                orders ?

                    orders.map(order => {
                        return (
                            <Link key={order.id} to={`/admin/orders/${order.id}`}>
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <OrderSummary order={order} />
                                    </div>
                                </div>
                            </Link>
                        )
                    })

                    :

                    <h4>No item found</h4>
            }
        </AdminLayout>
    )
}

export default AdminOrders
