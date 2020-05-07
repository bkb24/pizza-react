import React from 'react'
import OrderProduct from './order-product'
import OrderSummary from './order-summary'

const OrderPlaced = props => {
    let { order } = props

    return (
        <div className="order-wrap border mt-4 mb-4">
            <OrderSummary order={order} />

            <div className="order-products">
                {
                    order.products &&
                        order.products.map((item, i) => {
                            return (
                                <div key={i} className="order-items">
                                    <OrderProduct product={item} />
                                </div>
                            )
                        })
                }
            </div>

            {
                order.shipping_details &&

                <div className="order-shipping-details d-flex">
                    <div className="card mr-4">
                        <div className="card-body">
                            <div><strong style={{ display: 'block', width: '200px' }}>First Name:</strong>{order.shipping_details.first_name}</div>
                            <div><strong style={{ display: 'block', width: '200px' }}>Last Name:</strong>{order.shipping_details.last_name}</div>
                            <div><strong style={{ display: 'block', width: '200px' }}>Phone Name:</strong>{order.shipping_details.phone}</div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-body">
                            <div><strong style={{ display: 'block', width: '200px' }}>Address:</strong>{order.shipping_details.address}</div>
                            <div><strong style={{ display: 'block', width: '200px' }}>City:</strong>{order.shipping_details.city}</div>
                            <div><strong style={{ display: 'block', width: '200px' }}>State:</strong>{order.shipping_details.state}</div>
                        </div>
                    </div>

                    <div className="flex-grow-1"></div>

                    <div className="">
                        {props.children}
                    </div>
                </div>
            }

        </div>
    )
}

export default OrderPlaced
