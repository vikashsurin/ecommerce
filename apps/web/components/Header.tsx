import Cart from "@/components/Cart"

export default function Header() {
  return (
    <header className="flex p-4 bg-amber-100 justify-between">
      <div>Brand</div>
      <Cart />
    </header>
  )
}
