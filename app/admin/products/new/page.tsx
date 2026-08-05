import ProductForm from "../../ProductForm";
import { createProduct } from "../../actions";

export default function NewProductPage() {
  return (
    <div>
      <h1 className="font-serif text-3xl font-light mb-8">New product</h1>
      <ProductForm action={createProduct} />
    </div>
  );
}
