import React, { useContext } from 'react'
import moment from 'moment'
import { priceTag } from '../../utils/currency'
import StoreContext from '../../context/store-context'

const OrderSummary = props => {
    let { order } = props

    const context = useContext(StoreContext)

    return (

        <div className="order-info d-flex text-body">

        {
            order.products &&

            <>
                <div className="mr-3">Status: <strong>{ order.status }</strong></div>
                <div className="mr-3">Products: {
                    order.products.reduce((totalNum, item) => {
                        totalNum += item.quantity
                        return totalNum
                    }, 0)
                }</div>
                <div className="mr-3">Total price: <strong>{
                        priceTag(
                            order.products.reduce((total, item) => {
                                total += item.price * item.quantity
                                return total
                            }, 0),
                            context.currency,
                            context.rates
                        )
                    }
                    </strong>
                </div>

                <div className="flex-grow-1"></div>

                <div className="mr-3">Created: { moment(order.created_at).format('DD-MM-YYYY H:m:s') }</div>
                <div>Updated: { moment(order.updated_at).format('DD-MM-YYYY H:m:s') }</div>
            </>
        }

        </div>
    )
}

export default OrderSummary
