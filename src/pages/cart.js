import React, { useState, useContext } from 'react'
import StoreContext from '../context/store-context'
import ProductItem from '../components/products/ProductItem'
import { priceTag } from '../utils/currency'
import { placeOrder } from '../services/orders'
import ShippingDetailsForm from '../components/ShippingDetailsForm'

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

    return (
        <div className="cart mt-4">
            {
                showShipping ?

                <div>
                    {
                        order ?

                        <>
                            <h3>Order placed</h3>
                            {/* Order component */}
                        </>

                        :

                        <>
                            <h3>Place order</h3>
                            <ShippingDetailsForm order={orderNow} />
                        </>
                    }
                </div>

                :

                (
                    context.cart.length ?

                    <div className="">
                        <div className="d-flex">
                        {
                            context.cart.map((item, i) => {
                                return (
                                    <div className="card mr-4">
                                        <div className="card-body">
                                            <ProductItem key={i} product={item.product} quantity={item.quantity} update={true} />
                                        </div>
                                    </div>
                                )
                            })
                        }
                        </div>

                        <div className="cart-total h3 text-center m-4">{totalPriceTag}</div>

                        { !showShipping &&
                            <div className="text-center">
                                <button className="btn btn-primary"
                                    onClick={e => setShowShipping(true)}>Go checkout</button>
                            </div>
                        }
                    </div>

                    :

                    <div>No items in the cart</div>
                )
            }

        </div>
    )

}

export default Cart
