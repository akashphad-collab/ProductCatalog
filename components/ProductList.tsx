"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteProduct } from "@/store/slices/productsSlice";
import { addToCart } from "@/store/slices/cartSlice";
import { Product } from "@/store/slices/productsSlice";
import ProductForm from "./ProductForm";

export default function ProductList() {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteRequest = (product: Product) => {
    setProductToDelete(product);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (productToDelete) {
      dispatch(deleteProduct(productToDelete.id));
    }
    setDeleteModalOpen(false);
    setProductToDelete(null);
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setProductToDelete(null);
  };

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  const handleAddProduct = () => {
    setEditingId(null);
    setModalOpen(true);
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditingId(null);
  };

  const handleFormSuccess = () => {
    setModalOpen(false);
    setEditingId(null);
  };

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(products.length / pageSize));
    setCurrentPage((prev) => Math.min(prev, totalPages));
  }, [products.length, pageSize]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + pageSize
  );

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Products</h1>

          <button
            onClick={handleAddProduct}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 
            focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Product
          </button>
        </div>

        {/* Search below button */}
        {products.length > 0 && (
          <div className="flex justify-end">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="border px-3 py-2 rounded-lg w-60 text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {/* No products */}
        {products.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" > <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /> </svg>

            <p className="text-gray-500 text-lg mb-4">No products found.</p>

            <button
              onClick={handleAddProduct}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Your First Product
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                {/* HEADER */}
                <thead className="bg-[rgb(136,136,136)]">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wide">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wide">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wide">
                        Quantity
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wide">
                        Category
                      </th>
                      <th className="px-6 py-3 text-right text-sm font-bold text-white uppercase tracking-wide">
                        Actions
                      </th>
                    </tr>
                </thead>


                {/* BODY WITH ZEBRA ROWS */}
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {product.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {product.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {product.quantity}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 inline-flex text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 
                            px-3 py-1 rounded transition-colors"
                          >
                            🛒
                          </button>

                          <button
                            onClick={() => handleEdit(product.id)}
                            className="text-green-600 hover:text-green-900 bg-green-50 hover:bg-green-100 
                            px-3 py-1 rounded transition-colors"
                          >
                            ✏️
                          </button>

                          <button
                            onClick={() => handleDeleteRequest(product)}
                            className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 
                            px-3 py-1 rounded transition-colors"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-6 py-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <label htmlFor="pageSize" className="text-sm text-gray-600">Show</label>
                <select
                  id="pageSize"
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="border rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500"
                >
                  {[5, 10, 20, 30, 40, 50].map((size) => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
                <span className="text-sm text-gray-600">per page</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded-lg text-sm disabled:opacity-50 hover:bg-gray-100"
                  >
                    Previous
                  </button>

                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border rounded-lg text-sm disabled:opacity-50 hover:bg-gray-100"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ADD / EDIT MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
             onClick={handleModalClose}>
          <div
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold">
                {editingId ? "Edit Product" : "Add New Product"}
              </h2>
              <button onClick={handleModalClose} className="text-gray-500 hover:text-gray-700">✖</button>
            </div>

            <div className="p-6">
              <ProductForm productId={editingId || undefined} onSuccess={handleFormSuccess} showTitle={false} />
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
             onClick={handleDeleteCancel}>
          <div
            className="bg-white rounded-lg shadow-xl max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h3 className="text-xl font-semibold">Delete Product</h3>
              <button onClick={handleDeleteCancel} className="text-gray-500 hover:text-gray-700">✖</button>
            </div>

            <div className="px-6 py-5 space-y-4">
              <p className="text-gray-700">
                Are you sure you want to delete{" "}
                <span className="font-semibold">{productToDelete?.name}</span>?
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={handleDeleteCancel}
                  className="px-4 py-2 rounded-lg border hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  onClick={handleDeleteConfirm}
                  className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
