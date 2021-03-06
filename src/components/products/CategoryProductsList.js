import React, { useContext } from 'react'
import StoreContext from '../../context/store-context'
import ProductItem from './ProductItem'
import { getQuantity } from '../../utils/products'

const CategoryProductsList = (props) => {
    const context = useContext(StoreContext)

    return (
        <section className="mt-4">
            <h3 className="mb-3 text-center">{ props.category.name }</h3>

            <div className="product-wrap d-flex flex-wrap justify-content-center">
            {
                props.category.products.map((item, i) => {
                    return (
                        <div key={item.id} className="card mr-3 mb-3">
                            <div className="card-body">
                                <ProductItem product={item} quantity={getQuantity(context, item)} />
                            </div>
                        </div>
                    )
                })
            }
            </div>

        </section>
    )
}

export default CategoryProductsList
