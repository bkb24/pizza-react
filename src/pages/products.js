import React, { useEffect, useState } from 'react'
import { getProducts } from '../services/products'
import CategoryProductsList from '../components/products/CategoryProductsList'

const Products = () => {
    const [categories, setCategories] = useState({})

    useEffect(() => {
        getProducts()
            .then(response => {
                setCategories(response.data)
            })
    }, []);

    return (
        <div className="mb-4">
        {
            Object.keys(categories).map((item, i) => {
                if (categories[item].products.length)
                    return <CategoryProductsList key={i} category={categories[item]} />
                return ''
            })
        }
        </div>
    )

}

export default Products
