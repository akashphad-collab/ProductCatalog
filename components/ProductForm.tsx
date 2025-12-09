"use client";

import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addProduct, updateProduct } from "@/store/slices/productsSlice";
import { Product } from "@/store/slices/productsSlice";

interface ProductFormProps {
  productId?: string;
  onSuccess?: () => void;
  showTitle?: boolean;
}

export default function ProductForm({
  productId,
  onSuccess,
  showTitle = true,
}: ProductFormProps) {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);

  const isEditing = !!productId;
  const product = isEditing ? products.find((p) => p.id === productId) : null;

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    quantity: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    price: "",
    category: "",
    quantity: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price.toString(),
        category: product.category,
        quantity: product.quantity.toString(),
      });
    }
  }, [product]);

  const validate = () => {
    const newErrors = {
      name: "",
      price: "",
      category: "",
      quantity: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.price.trim()) {
      newErrors.price = "Price is required";
    } else {
      const priceNum = parseFloat(formData.price);
      if (isNaN(priceNum) || priceNum <= 0) {
        newErrors.price = "Price must be a positive number";
      }
    }

    if (!formData.quantity.trim()) {
      newErrors.quantity = "Quantity is required";
    } else {
      const qtyNum = parseInt(formData.quantity, 10);
      if (isNaN(qtyNum) || qtyNum <= 0) {
        newErrors.quantity = "Quantity must be a positive integer";
      }
    }

    if (!formData.category.trim()) {
      newErrors.category = "Category is required";
    }

    setErrors(newErrors);
    return !newErrors.name && !newErrors.price && !newErrors.category && !newErrors.quantity;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const productData = {
      name: formData.name.trim(),
      price: parseFloat(formData.price),
      category: formData.category.trim(),
      quantity: parseInt(formData.quantity, 10),
    };

    if (isEditing && product) {
      dispatch(
        updateProduct({
          ...productData,
          id: product.id,
        })
      );
    } else {
      dispatch(addProduct(productData));
    }

    // Reset form
    setFormData({
      name: "",
      price: "",
      category: "",
      quantity: "",
    });
    setErrors({
      name: "",
      price: "",
      category: "",
      quantity: "",
    });

    if (onSuccess) {
      onSuccess();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <div className={showTitle ? "bg-white rounded-lg shadow-md p-6" : ""}>
      {showTitle && (
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {isEditing ? "Edit Product" : "Add New Product"}
        </h2>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.name
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="Enter product name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Price <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              min="0"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.price
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="Enter price"
            />
            {errors.price && (
              <p className="mt-1 text-sm text-red-600">{errors.price}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Quantity <span className="text-red-500">*</span>{/* Keep this in sync with the list and Product type */}
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="1"
              step="1"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.quantity
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="Enter quantity"
            />
            {errors.quantity && (
              <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.category
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            >
              <option value="">Select a category</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Food">Food</option>
              <option value="Books">Books</option>
              <option value="Home & Garden">Home & Garden</option>
              <option value="Sports">Sports</option>
              <option value="Toys">Toys</option>
              <option value="Other">Other</option>
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category}</p>
            )}
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium transition-colors"
          >
            {isEditing ? "Update Product" : "Add Product"}
          </button>
          {isEditing && onSuccess && (
            <button
              type="button"
              onClick={onSuccess}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 font-medium transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

