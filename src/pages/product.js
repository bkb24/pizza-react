import React, { useState, useEffect, useContext } from 'react'
import { useParams } from "react-router-dom"
import { getProducts } from '../services/products'
import ProductItem from '../components/products/ProductItem'
import { getQuantity } from '../utils/products'
import StoreContext from '../context/store-context'

const Products = props => {
    const [product, setProduct] = useState({})
    const context = useContext(StoreContext)

    let { id } = useParams();

    useEffect(() => {
        getProducts(id)
            .then(response => {
                setProduct(response.data)
            })
    }, [id]);

    return (
        <div className="d-flex mt-4">
            <div className="card">
                <div className="card-body">
                    { product &&
                        <ProductItem product={product} quantity={getQuantity(context, product)} />
                    }
                </div>
            </div>
        </div>
    )
}

export default Products
