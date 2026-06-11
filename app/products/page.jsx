"use client";

import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");

  const loadProducts = async (cat) => {
    const url =
      cat === "all"
        ? "/api/products/list"
        : `/api/products/list?category=${cat}`;

    const res = await fetch(url);
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    loadProducts(category);
  }, [category]);

  return (
    <main style={{ padding: "40px" }}>
      <h1>Products</h1>

      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <button onClick={() => setCategory("all")}>All</button>
        <button onClick={() => setCategory("men")}>Men</button>
        <button onClick={() => setCategory("women")}>Women</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {products.map((p) => (
          <div key={p.id} style={{ border: "1px solid #ddd", padding: "10px" }}>
            <img src={p.image} style={{ width: "100%", borderRadius: "8px" }} />
            <h3 style={{ marginTop: "10px" }}>{p.name}</h3>
            <p>{p.category.toUpperCase()}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
