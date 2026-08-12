import { useProductVariants } from "@/app/features/products/queries";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@workspace/ui/components/table";
import { useParams } from "next/dist/client/components/navigation";
import { useState } from "react";
import { ProductVariantActionMenu } from "./product-variant-action-menu";
import UpdatePricePopover from "./update-price-popover";
import UpdateSalePricePopover from "./update-sale-price-popover";
import UpdateStock from "./update-stock-popover";

export default function ProductVariantsTable() {
  const { productId } = useParams<{ productId: string }>();

  const { data: productVariants, isLoading } = useProductVariants(
    Number(productId),
  );

  const [stockEditId, setStockEditId] = useState<number | null>(null);
  const [priceEditId, setPriceEditId] = useState<number | null>(null);
  const [salePriceEditId, setSalePriceEditId] = useState<number | null>(null);

  if (isLoading) return <div>Loading product variants...</div>;

  return (
    <>
      <section className="mt-6">
        <h2>Product variants</h2>
        <div>
          {productVariants && productVariants.length > 0
            ? (
              <Table className="w-full border-collapse border border-gray-300">
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Attributes</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Sale Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productVariants.map((variant) => (
                    <TableRow key={variant.id}>
                      <TableCell>{variant.id}</TableCell>
                      <TableCell>{variant.sku}</TableCell>
                      <TableCell>
                        {Object.entries(variant.attributes).map(
                          ([key, value]: [string, any]) => (
                            <div key={key} className="my-1">
                              <span className="inline-block w-10">{key}:</span>
                              <span className="inline-block rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-700">
                                {value}
                              </span>
                            </div>
                          ),
                        )}
                      </TableCell>

                      {/*price*/}
                      <TableCell
                        onMouseOver={() => {
                          setPriceEditId(variant.id);
                        }}
                        onMouseOut={() => {
                          setPriceEditId(null);
                        }}
                      >
                        <div className="relative  flex items-center gap-2 w-14">
                          <span>
                            {variant.price}
                          </span>
                          {priceEditId === variant.id
                            && (
                              <UpdatePricePopover
                                productId={Number(productId)}
                                variantId={variant.id}
                                price={variant.price}
                              />
                            )}
                        </div>
                      </TableCell>

                      {/*sale price*/}
                      <TableCell
                        className=""
                        onMouseOver={() => {
                          setSalePriceEditId(variant.id);
                        }}
                        onMouseOut={() => {
                          setSalePriceEditId(null);
                        }}
                      >
                        <div className="relative flex items-center gap-2 w-14">
                          <span>{variant.salePrice}</span>
                          {salePriceEditId === variant.id
                            && (
                              <UpdateSalePricePopover
                                productId={Number(productId)}
                                variantId={variant.id}
                                price={variant.price}
                                salePrice={variant.salePrice}
                              />
                            )}
                        </div>
                      </TableCell>

                      {/*stock*/}
                      <TableCell
                        onMouseOver={() => {
                          setStockEditId(variant.id);
                        }}
                        onMouseOut={() => {
                          setStockEditId(null);
                        }}
                      >
                        <div className="relative  flex items-center gap-2 w-14">
                          <span>{variant.stock}</span>
                          {stockEditId === variant.id
                            && (
                              <UpdateStock
                                productId={Number(productId)}
                                variantId={variant.id}
                                stockValue={variant.stock}
                              />
                            )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <ProductVariantActionMenu
                          productId={Number(productId)}
                          variant={variant}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )
            : <p>No variants found for this product.</p>}
        </div>
      </section>
    </>
  );
}
