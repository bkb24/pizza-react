export const inCart = (product, cart) => {
    let cartItem = cart.filter(item => item.product.id === product.id)
    return cartItem.length > 0 ? cartItem[0] : false
}

export const getQuantity = (context, product) => {
    let cartProduct = inCart(product, context.cart)
    return cartProduct ? cartProduct.quantity : 0
}
