import React , { useState, useEffect, useContext } from 'react'
import { getProducts, deleteProduct as deleteProductApi } from '../../services/admin'
import StoreContext from '../../context/store-context'
import { Link } from 'react-router-dom'
import { priceTag } from '../../utils/currency'
import AdminLayout from '../../components/AdminLayout'

const Products = props => {
    const context = useContext(StoreContext)

    const [products, setProducts] = useState([])

    useEffect(() => {
        getProducts()
            .then(response => {
                setProducts(response.data)
            })
    }, [])

    const deleteProduct = (id) => {
        deleteProductApi(id)
            .then(response => {
                let newProducts = [...products]
                let index = newProducts.findIndex((item, i) => item.id === id)

                if (index > -1) {
                    newProducts.splice(index, 1)
                    setProducts(newProducts)
                }
            })
    }

    return (
        <AdminLayout>
            <div className="d-flex flex-wrap">

            {
                products.length ?

                    products.map((item, i) => {
                        return (
                            <div className="card mr-3 mb-3">
                                <div className="card-body" key={item.id}>
                                    <Link to={`/admin/products/${item.id}`}>
                                        <div className="product-image" style={{ width: '200px' }}>
                                            <img src={item.thumbnail_src} alt={item.name} style={{ display: 'block', width: '100%'}} />
                                        </div>
                                    </Link>

                                    <div className="product-image">
                                        {item.name}
                                    </div>

                                    <div className="product-price">
                                        {priceTag(item.price, context.currency, context.rates)}
                                    </div>

                                    <button className="btn btn-danger" onClick={e => deleteProduct(item.id)}>delete</button>
                                </div>
                            </div>
                        )
                    })

                    :

                    <h4 className="h4">No products</h4>
            }
            </div>
        </AdminLayout>
    )
}

export default Products
