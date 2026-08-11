import { IconTrash } from "@tabler/icons-react";

export function DeleteVariantImgButton() {
  return (
    <button className="absolute top-2 right-2 bg-gray-100 p-1 rounded">
      <IconTrash size={12} />
    </button>
  );
}
