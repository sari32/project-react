import React from 'react'

function ProductMiniCart({product}) {
  return (
    <>
     <p>{product.name} * {product.qty}</p>
    </>
  )
}

export default ProductMiniCart
