import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getOrders, cancelOrder } from '../services/orders'
import OrderPlaced from '../components/orders/order-placed'

const Order = () => {
    const [order, setOrder] = useState([])

    let { id } = useParams()

    useEffect(() => {
        getOrders(id)
            .then(response => {
                setOrder(response.data)
            })
    }, [id])

    const cancelTheOrder = () => {
        cancelOrder(order.id)
            .then(response => {
                setOrder({ ...order, status: response.data.status })
            })
    }

    return (
        <div className="mt-4">
            <OrderPlaced order={order}>
                { order.status === 'placed' && <button onClick={cancelTheOrder} className="btn btn-danger">cancel</button> }
            </OrderPlaced>
        </div>
    )
}

export default Order
