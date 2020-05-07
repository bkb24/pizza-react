import React, { useContext } from 'react'
import { priceTag } from '../../utils/currency'
import StoreContext from '../../context/store-context'
import { Link } from 'react-router-dom'

const OrderProduct = props => {
    const context = useContext(StoreContext)

    return (
        <div className="products-wrap">
            <div className="product-card" key={props.product.id}>
                <Link to={`/products/${props.product.product.slug}`}>
                    <div className="product-image">
                        <img src={ props.product.product.thumbnail_src} alt={props.product.product.name } />
                    </div>
                </Link>

                <div className="product-image">
                    {props.product.product.name}
                </div>

                <div className="product-price">
                    { priceTag(props.product.price, context.currency, context.rates) }
                </div>

                <div className="product-price">
                    Total: { priceTag(props.product.price * props.product.quantity, context.currency, context.rates) }
                </div>

                <div className="product-price">
                    (x { props.product.quantity })
                </div>
            </div>
        </div>
    )
}

export default OrderProduct
