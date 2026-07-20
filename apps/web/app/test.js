

const data = [
  {
    "cartItem": {
      "id": 10,
      "cartId": 2,
      "productVariantId": 22,
      "quantity": 10,
      "createdAt": "2026-07-20T08:51:53.629Z",
      "updatedAt": "2026-07-20T08:51:53.629Z"
    },
    "productVariant": {
      "id": 22,
      "productId": 85,
      "sku": "WINTERHOODIE-BLUE-MD-E9E2",
      "attributes": {
        "color": "Blue",
        "size": "MD"
      },
      "price": 105,
      "salePrice": null,
      "stock": 60,
      "createdAt": "2026-07-16T06:25:29.669Z",
      "updatedAt": "2026-07-16T06:25:29.669Z"
    }
  },
  {
    "cartItem": {
      "id": 13,
      "cartId": 2,
      "productVariantId": 23,
      "quantity": 10,
      "createdAt": "2026-07-20T08:56:42.793Z",
      "updatedAt": "2026-07-20T08:56:42.793Z"
    },
    "productVariant": {
      "id": 23,
      "productId": 85,
      "sku": "WINTERHOODIE-PURPLE-MD-9832",
      "attributes": {
        "color": "Purple",
        "size": "MD"
      },
      "price": 101,
      "salePrice": 82,
      "stock": 0,
      "createdAt": "2026-07-16T06:44:04.605Z",
      "updatedAt": "2026-07-16T06:44:04.605Z"
    }
  }
]


const result = data.reduce((acc, item) => {
  const price = item.productVariant.salePrice ?? item.productVariant.price
  const qty = item.cartItem.quantity;

  return acc + (price * qty)
}, 0)

console.log(result)
