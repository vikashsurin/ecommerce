'use client'

import { Button } from "@workspace/ui/components/button";
import { FieldGroup, FieldLabel, Field } from "@workspace/ui/components/field";
import { Input } from "@workspace/ui/components/input";
import { Select, SelectContent, SelectTrigger, SelectItem, SelectValue } from "@workspace/ui/components/select";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function PaymentPage() {

  const [paymentMethod, setPaymentMethod] = useState("card");



  console.log({ paymentMethod })

  return (

    <div className="m-6">
      <h1>Choose payment method</h1>
      <form action="" className="w-max">
        <div className=" flex flex-col ">
          <label htmlFor="" className="flex gap-2">
            <input
              id="upi"
              type="radio"
              name="paymentMethod"
              value="upi"
              checked={paymentMethod === "upi"}
              onChange={() => setPaymentMethod("upi")}
            />
            <span>
              upi
            </span>
          </label>

          <label htmlFor="" className="flex gap-2">
            <input
              id="card"
              type="radio"
              name="paymentMethod"
              value="card"
              checked={paymentMethod === "card"}
              onChange={() => setPaymentMethod("card")}
            />
            <span>
              credit or debit card
            </span>
          </label>
          {/*{paymentMethod === "card" && <CardDetailForm />}*/}
        </div>

        <Link
          href="/checkout/review">
          <Button className="mt-3">Continue <ArrowRight /></Button>
        </Link>
      </form>
    </div >
  )
}

function CardDetailForm() {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: {
      month: 1,
      year: 2026,
    },
    cvv: "",
  });

  console.log({ cardDetails })
  return (
    <div className="p-4 border w-md mt-3 rounded-xl">
      <h6 className="mb-3">Enter Card Details</h6>
      <div className="flex flex-col gap-4">
        <FieldGroup>
          <Field>
            <FieldLabel>Card Number</FieldLabel>
            <Input
              id="cardNumber"
              type="text"
              placeholder="XXXX-XXXX-XXXX"
              value={cardDetails.cardNumber}
              onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
              className="mt-1" />
          </Field>


          <Field>
            <FieldLabel>Expiry Date</FieldLabel>
            <div className="flex gap-4">
              <Select onValueChange={(value) => setCardDetails({
                ...cardDetails,
                expiryDate: {
                  ...cardDetails.expiryDate,
                  month: Number(value)
                }
              })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Month" />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(12).keys()].map((month) => (
                    <SelectItem
                      key={month}
                      value={month + 1}>
                      {month + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select onValueChange={(value) => setCardDetails({
                ...cardDetails,
                expiryDate: {
                  ...cardDetails.expiryDate,
                  year: Number(value)
                }
              })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(2046 - 2026 + 1).keys()].map((year) => (
                    <SelectItem
                      key={year}
                      value={year + 2026}>
                      {year + 2026}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>


            </div>

          </Field>


          <Field>
            <FieldLabel>CVV</FieldLabel>
            <Input
              type="number"
              placeholder="CVV"
              id="cvv"
              value={cardDetails.cvv}
              onChange={(e) =>
                setCardDetails({ ...cardDetails, cvv: e.target.value })}
              className="mt-1" />
          </Field>
        </FieldGroup>
      </div>
    </div >
  )
}
