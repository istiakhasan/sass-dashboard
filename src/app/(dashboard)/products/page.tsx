"use client";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "@mui/material";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", category: "", price: "", stock: "" });
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [editingProduct, setEditingProduct] = useState({ name: "", category: "", price: 0, stock: 0 });
  const [sortConfig, setSortConfig] = useState<{ key: keyof Product; direction: "asc" | "desc" } | null>(null);

  // Dummy data
  useEffect(() => {
    const dummy: Product[] = [
      { id: 1, name: "Laptop", category: "Electronics", price: 1200, stock: 10 },
      { id: 2, name: "Phone", category: "Electronics", price: 800, stock: 25 },
      { id: 3, name: "Shoes", category: "Fashion", price: 100, stock: 50 },
    ];
    setProducts(dummy);
    setFilteredProducts(dummy);
  }, []);

  // Search
  useEffect(() => {
    const filtered = products.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase()) ||
        p.price.toString().includes(search) ||
        p.stock.toString().includes(search)
    );
    setFilteredProducts(filtered);
  }, [search, products]);

  // Sort
  const handleSort = (key: keyof Product) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sorted = [...filteredProducts].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setFilteredProducts(sorted);
  };

  // Create product
  const handleCreate = () => {
    if (!newProduct.name || !newProduct.category || newProduct.price === "" || newProduct.stock === "") return;

    const id = products.length ? products[products.length - 1].id + 1 : 1;
    const newProductData: Product = {
      id,
      name: newProduct.name,
      category: newProduct.category,
      price: Number(newProduct.price),
      stock: Number(newProduct.stock),
    };

    const updatedProducts = [...products, newProductData];
    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
    setNewProduct({ name: "", category: "", price: "", stock: "" });
    setIsModalOpen(false);
  };

  // Update product
  const handleUpdate = (id: number) => {
    const updatedProducts = products.map((p) =>
      p.id === id ? { ...p, ...editingProduct } : p
    );
    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
    setEditingProductId(null);
    setEditingProduct({ name: "", category: "", price: 0, stock: 0 });
  };

  // Delete product
  const handleDelete = (id: number) => {
    const updatedProducts = products.filter((p) => p.id !== id);
    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
  };

const SortArrow = ({ columnKey }: { columnKey: keyof Product }) => {
  if (!sortConfig) return <span className="text-gray-300">▲</span>;

  if (sortConfig.key !== columnKey) return <span className="text-gray-300">▲</span>; 

  return sortConfig.direction === "asc" ? <span>▲</span> : <span>▼</span>;
};

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <input
          style={{ border: "1px solid rgba(0,0,0,.3)" }}
          type="text"
          placeholder="Search products..."
          className="outline-0 p-2 rounded w-[250px] text-[12px]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button sx={{background:"#176e6d"}} size="small" variant="contained" onClick={() => setIsModalOpen(true)}>
          Create Product
        </Button>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto table-responsive">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              {["id", "name", "category", "price", "stock"].map((key) => (
                <th
                  key={key}
                  className="px-4 py-2 text-left cursor-pointer"
                  onClick={() => handleSort(key as keyof Product)}
                >
                  {key.toUpperCase()}
                  <SortArrow columnKey={key as keyof Product} />
                </th>
              ))}
              <th className="px-4 py-2 text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                {editingProductId === p.id ? (
                  <>
                    <td className="px-4 py-2">
                      <input
                        style={{ border: "1px solid rgba(0,0,0,.3)", width: "150px", outline: "none" }}
                        className="p-1 rounded"
                        value={editingProduct.name}
                        onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        style={{ border: "1px solid rgba(0,0,0,.3)", width: "150px", outline: "none" }}
                        className="p-1 rounded"
                        value={editingProduct.category}
                        onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        style={{ border: "1px solid rgba(0,0,0,.3)", width: "100px", outline: "none" }}
                        className="p-1 rounded"
                        value={editingProduct.price}
                        onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        style={{ border: "1px solid rgba(0,0,0,.3)", width: "80px", outline: "none" }}
                        className="p-1 rounded"
                        value={editingProduct.stock}
                        onChange={(e) => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                      />
                    </td>
                    <td className="px-4 py-2 text-end space-x-2">
                      <button className="bg-green-500 text-white px-2 py-1 rounded" onClick={() => handleUpdate(p.id)}>
                        Save
                      </button>
                      <button className="bg-gray-500 text-white px-2 py-1 rounded" onClick={() => setEditingProductId(null)}>
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-4 py-2">{p.name}</td>
                    <td className="px-4 py-2">{p.category}</td>
                    <td className="px-4 py-2">${p.price}</td>
                    <td className="px-4 py-2">{p.stock}</td>
                    <td className="px-4 py-2 text-end space-x-2">
                      <button onClick={() => { setEditingProductId(p.id); setEditingProduct({ ...p }); }}>
                        <i className="ri-edit-fill text-yellow-500 cursor-pointer text-[16px]"></i>
                      </button>
                      <button onClick={() => handleDelete(p.id)}>
                        <i className="ri-delete-bin-5-fill text-red-500 cursor-pointer text-[16px]"></i>
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Modal */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-30 z-50">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h2 className="text-xl font-semibold mb-4">Create Product</h2>
            <input
              type="text"
              placeholder="Product Name"
              className="border p-2 rounded w-full mb-2 text-[12px]"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Category"
              className="border p-2 rounded w-full mb-2 text-[12px]"
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            />
            <input
              type="number"
              placeholder="Price"
              className="border p-2 rounded w-full mb-2 text-[12px]"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            <input
              type="number"
              placeholder="Stock"
              className="border p-2 rounded w-full mb-4 text-[12px]"
              value={newProduct.stock}
              onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
            />
            <div className="flex gap-2 justify-end">
              <Button variant="outlined" className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="contained" size="small" className="text-[12px]" onClick={handleCreate}>
                Create
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProductsPage;
