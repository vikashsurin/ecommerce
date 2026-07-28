'use client'

import { useCart, useDeleteCartItem, useUpdateCartItemQuantity } from "@/app/features/cart/queries";
import { Button } from "@workspace/ui/components/button";
import { ButtonGroup } from "@workspace/ui/components/button-group";
import { Field, FieldLabel } from "@workspace/ui/components/field";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CheckoutCartButton } from "../features/checkout/components/checkout-cart-button";

export default function CartPage() {
  const { data: cart, isLoading } = useCart()

  if (isLoading) return <div>Loading...</div>

  return (
    <>
      <div className="m-4">
        {cart && cart?.items?.map((item) => (
          <div key={item.cartItem.id} className="grid grid-cols-12 border  gap-4 p-2">

            <Image
              src={'https://picsum.photos/200'}
              alt={item.productVariant.sku}
              width={150}
              height={150}
              className="col-span-1"
            />

            <div className="col-span-9">
              <p>{item.productVariant.sku}</p>
              <Quantity
                key={item.cartItem.id}
                cartItemId={item.cartItem.id}
                quantity={item.cartItem.quantity}
              />
            </div>

            <div className="col-span-2 justify-self-end">
              <p>
                Price :
                <b className="text-xl font-bold px-2">
                  {item.productVariant.salePrice ?? item.productVariant.price}
                </b>
              </p>
            </div>

          </div>
        ))}

        {cart &&
          <SubTotal cartId={cart.id} total={cart?.total ?? 0} />
        }
      </div>
    </>
  )
}


function Quantity({ cartItemId, quantity }: {
  cartItemId: number;
  quantity: number
}) {

  const { mutate: updateQuantity } = useUpdateCartItemQuantity()
  const { mutate: removeItem } = useDeleteCartItem()

  function handleQuantityChange(newQuantity: number) {
    updateQuantity({ cartItemId, quantity: newQuantity })
  }

  function handleRemove() {
    removeItem(Number(cartItemId))
  }

  return (
    <>
      <Field>
        <FieldLabel>Select Quantity</FieldLabel>
        <ButtonGroup className="mt-4">
          <Button
            size={'icon'}
            variant={'secondary'}
            onClick={
              () => handleQuantityChange(quantity - 1)
            }
          >
            <Minus />
          </Button>

          <Button
            size={'icon'}
            variant={'ghost'}
          >
            <span>{quantity}</span>
          </Button>

          <Button
            size={'icon'}
            variant={'secondary'}
            onClick={
              () => handleQuantityChange(quantity + 1)
            }
          >
            <Plus />
          </Button>

          <div className="ml-2 ">
            <Button
              variant={'ghost'}
              onClick={handleRemove}
            >
              <Trash2 /> Remove
            </Button>
          </div>
        </ButtonGroup>
      </Field>
    </>
  )
}


function SubTotal({ total, cartId }: {
  total: number;
  cartId: number
}) {
  return (
    <div className="py-6 flex flex-col items-end bg-amber-100 px-4">
      <div className="py-2">
        <span className="font-medium">Total :</span>
        <span className="text-4xl font-bold">
          {total}
        </span>
      </div>
      <Link href="/checkout/address">
        <CheckoutCartButton cartId={cartId} />
      </Link>
    </div>
  )
}
