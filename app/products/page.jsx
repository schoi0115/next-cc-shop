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
      <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "20px" }}>
        Products
      </h1>

      {/* 카테고리 필터 */}
      <div style={{ display: "flex", gap: "15px", marginBottom: "30px" }}>
        <button style={styles.filterBtn} onClick={() => setCategory("all")}>
          All
        </button>
        <button style={styles.filterBtn} onClick={() => setCategory("men")}>
          Men
        </button>
        <button style={styles.filterBtn} onClick={() => setCategory("women")}>
          Women
        </button>
      </div>

      {/* 상품 목록 */}
      <div style={styles.grid}>
        {products.map((p) => (
          <div key={p.id} style={styles.card}>
            {/* 대표 이미지 */}
            <img
              src={p.images?.[0] || "/no-image.png"}
              style={styles.image}
            />

            <h3 style={styles.name}>{p.name}</h3>
            <p style={styles.category}>{p.category.toUpperCase()}</p>

            {/* 가격 */}
            <p style={styles.price}>{p.price?.toLocaleString()}원</p>

            {/* 색상 */}
            <p style={styles.info}>
              <strong>색상:</strong> {p.colors?.join(", ")}
            </p>

            {/* 사이즈 */}
            <p style={styles.info}>
              <strong>사이즈:</strong> {p.sizes?.join(", ")}
            </p>

            {/* 설명 */}
            <p style={styles.desc}>{p.description}</p>

            {/* 태그 */}
            {p.tags?.length > 0 && (
              <div style={styles.tagBox}>
                {p.tags.map((t) => (
                  <span key={t} style={styles.tag}>
                    #{t}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}

const styles = {
  filterBtn: {
    padding: "8px 16px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    cursor: "pointer",
    background: "#f7f7f7",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "25px",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "15px",
    background: "#fff1f1",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  },
  image: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  name: {
    marginTop: "12px",
    fontSize: "18px",
    fontWeight: "bold",
  },
  category: {
    fontSize: "14px",
    color: "#777",
  },
  price: {
    marginTop: "8px",
    fontWeight: "bold",
    fontSize: "16px",
  },
  info: {
    marginTop: "6px",
    fontSize: "14px",
  },
  desc: {
    marginTop: "10px",
    fontSize: "14px",
    color: "#555",
  },
  tagBox: {
    marginTop: "10px",
  },
  tag: {
    marginRight: "6px",
    color: "#0070f3",
    fontSize: "13px",
  },
};
