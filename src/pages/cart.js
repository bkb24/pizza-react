import React, { useState, useContext } from 'react'
import StoreContext from '../context/store-context'
import ProductItem from '../components/products/ProductItem'
import { priceTag } from '../utils/currency'
import { placeOrder } from '../services/orders'
import { flushCart } from '../services/cart'
import ShippingDetailsForm from '../components/ShippingDetailsForm'
import OrderPlaced from '../components/orders/OrderPlaced'

const Cart = props => {
    const [order, setOrder] = useState(false)
    const [showShipping, setShowShipping] = useState(false)

    const context = useContext(StoreContext)

    const totalPrice = context.cart.reduce((total, item) => {
        total += item.product.price * item.quantity
        return total
    }, 0.00)

    const totalPriceTag = priceTag(totalPrice, context.currency, context.rates)

    const orderNow = (data) => {
        placeOrder(data)
            .then(response => {
                context.clearCart()
                setOrder(response.data)
            })
    }

    const clearAll = () => {
        flushCart()
            .then(response => {
                context.clearCart()
            })
    }

    return (
        <div className="cart mt-4 mb-4">
            {
                order &&

                <div>
                    <h3>Order placed</h3>

                    <OrderPlaced order={order} />
                </div>

            }

            {
                (
                    context.cart.length ?

                    <div className="">

                        <div className="mb-3 text-right pr-4">
                            <button className="btn btn-danger" onClick={clearAll}>Clear All</button>
                        </div>

                        <div className="">
                        {
                            context.cart.map((item, i) => {
                                return (
                                    <div key={i} className="cart-product card mr-4">
                                        <div className="card-body">
                                            <ProductItem product={item.product} quantity={item.quantity} update={true} />
                                        </div>
                                    </div>
                                )
                            })
                        }
                        </div>

                        <div className="cart-total h3 text-right m-4 pr-2">Total: {totalPriceTag}</div>

                        { !showShipping &&
                            <div className="text-right pr-4">
                                <button className="btn btn-primary"
                                    onClick={e => setShowShipping(true)}>Go checkout</button>
                            </div>
                        }

                        {
                            showShipping &&

                            <div>
                                <h3>Place order</h3>
                                <ShippingDetailsForm order={orderNow} />
                            </div>
                        }

                    </div>

                    :

                    <div>
                        { !order && <div>No items in the cart</div> }
                    </div>
                )
            }

        </div>
    )

}

export default Cart
