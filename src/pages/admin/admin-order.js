import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getOrders, cancelOrder, confirmOrder } from '../../services/admin'
import OrderPlaced from '../../components/orders/order-placed'
import AdminLayout from '../../components/AdminLayout'

const OrderAdmin = () => {
    const [order, setOrder] = useState([])

    let { id } = useParams()

    useEffect(() => {
        getOrders(id)
            .then(response => {
                setOrder(response.data)
            })
    }, [id])

    const confirmTheOrder = () => {
        confirmOrder(order.id).then(changeOrderState)
    }

    const cancelTheOrder = () => {
        cancelOrder(order.id).then(changeOrderState)
    }

    const changeOrderState = (response) => {
        setOrder({ ...order, status: response.data.status })
    }

    return (
        <AdminLayout>
            <OrderPlaced order={order}>
                { order.status === 'placed' &&
                    <>
                        <button onClick={confirmTheOrder} className="btn btn-primary mr-2">confirm</button>
                        <button onClick={cancelTheOrder} className="btn btn-danger">cancel</button>
                    </>
                }
            </OrderPlaced>
        </AdminLayout>
    )
}

export default OrderAdmin
