import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getUserOrders } from '../../services/admin'
import OrderSummary from '../../components/orders/order-summary'
import AdminLayout from '../../components/AdminLayout'
import { Link } from 'react-router-dom'

const AdminUserOrders = () => {
    const [orders, setOrders] = useState([])

    const { userId } = useParams()

    useEffect(() => {
        getUserOrders(userId)
            .then(response => {
                setOrders(response.data)
            })
    }, [userId])

    return (
        <AdminLayout className="mt-4">
            {
                orders.length ?
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

export default AdminUserOrders
