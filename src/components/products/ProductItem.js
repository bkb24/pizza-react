import React, { useState, useContext } from 'react'
import StoreContext from '../../context/store-context'
import { priceTag } from '../../utils/currency'
import { inCart } from '../../utils/products'
import { Link } from 'react-router-dom'

const ProductItem = props => {
    const [quantity, setQuantity] = useState(props.quantity || 0)

    const context = useContext(StoreContext)

    const quantityChange = (e) => {
        let value = e.target.value

        if (value < 0) {
            value = 0
            e.target.value = 0
        }

        setQuantity(value)
    }

    const changed = () => {
        let item = inCart(props.product, context.cart)

        if (item)
            return item.quantity !== quantity

        return quantity > 0
    }

    return (
        <div className="products-wrap">
            <div className="product-card">
                <Link to={`/products/${props.product.slug}`}>
                    <div className="product-image" style={{ width: '240px', height: '240px' }}>
                        <img style={{ display: 'bock', width: '100%' }} src={props.product.thumbnail_src} alt={props.product.name} />
                    </div>
                </Link>

                <div className="product-image text-center">
                    {props.product.name}
                </div>

                <div className="prices-wrap d-flex flex-wrap">
                    <div className="product-price">
                        {priceTag(props.product.price, context.currency, context.rates)}
                    </div>

                    {
                        quantity ?
                        <div className="product-price">
                            &nbsp;/ total: { priceTag(props.product.price * quantity, context.currency, context.rates) }
                            &nbsp; ( x { quantity })
                        </div>
                        :
                        ''
                    }

                </div>
                {
                    props.product.in_stock ?

                    <div className="products-cta">
                    {
                        inCart(props.product, context.cart) ?
                        <>
                            {
                                props.update ?
                                    <div className="form-group d-flex">
                                        <input className="form-control col-3" type="number" step="1" max="10" min="1" value={quantity}
                                            onChange={e => quantityChange(e)} />

                                        <button className="ml-2 btn btn-success" disabled={!changed() ? 'disabled' : ''}
                                            onClick={() => context.addToCart(props.product, quantity)}>
                                            Update count
                                        </button>
                                    </div>

                                    :

                                    ''
                            }

                            <button className="btn btn-danger" onClick={() => {
                                    context.removeFromCart(props.product)
                                    setQuantity(0)
                                }
                            }>
                                Remove from cart
                            </button>
                        </>

                        :

                        <div className="form-group d-flex">
                            <input className="form-control col-3" type="number" step="1" max="10" min="1" value={quantity}
                                onChange={e => quantityChange(e)} />

                            <button className="ml-2 btn btn-success" onClick={() => context.addToCart(props.product, quantity)}>
                                Add to cart
                            </button>
                        </div>

                    }

                    </div>

                    :

                    <div>Not in stock</div>
                }
            </div>
        </div>
    )
}

export default ProductItem
