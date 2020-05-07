import React, { useState, useEffect } from 'react'
import { getOrders } from '../services/orders'
import OrderSummary from '../components/orders/order-summary'
import { Link } from 'react-router-dom'

const Orders = () => {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        getOrders()
            .then(response => {
                setOrders(response.data)
            })
    }, [])

    return (
        <div className="mt-4">
            {
                orders.map(order => {
                    return (
                        <Link key={order.id} to={`/orders/${order.id}`}>
                            <div className="card mb-3">
                                <div className="card-body">
                                    <OrderSummary order={order} />
                                </div>
                            </div>
                        </Link>
                    )
                })
            }
        </div>
    )
}

export default Orders
