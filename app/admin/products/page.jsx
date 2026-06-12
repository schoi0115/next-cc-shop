"use client";

import { useEffect, useState } from "react";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [featured, setFeatured] = useState([]);

  const loadProducts = async () => {
    const res = await fetch("/api/products/list");
    const data = await res.json();
    setProducts(data);
  };

  const loadFeatured = async () => {
    const res = await fetch("/featured.json");
    const data = await res.json();
    setFeatured(data || []);
  };

  const setAsFeatured = async (image) => {
    await fetch("/api/home/feature", {
      method: "POST",
      body: JSON.stringify({ filename: image }),
    });
    loadFeatured();
  };

  const removeFeatured = async (image) => {
    await fetch("/api/home/unfeature", {
      method: "POST",
      body: JSON.stringify({ filename: image }),
    });
    loadFeatured();
  };

  const deleteProduct = async (image) => {
    await fetch("/api/products/delete", {
      method: "POST",
      body: JSON.stringify({ filename: image }),
    });

    loadProducts();
    loadFeatured();
  };

  useEffect(() => {
    loadProducts();
    loadFeatured();
  }, []);

  return (
    <main style={{ padding: "40px" }}>
      <h1>상품 관리</h1>

      {/* 1. 대표 상품 */}
      <section style={styles.box}>
        <h2>대표 상품</h2>

        <div style={styles.grid}>
          {featured.length === 0 && <p>대표 상품이 없습니다.</p>}

          {products
            .filter((p) => featured.includes(p.images?.[0]))
            .map((p) => (
              <div key={p.id} style={styles.card}>
                <img src={p.images?.[0]} style={styles.image} />
                <h3>{p.name}</h3>
                <p>{p.category.toUpperCase()}</p>

                <button
                  onClick={() => removeFeatured(p.images?.[0])}
                  style={styles.unfeatureBtn}
                >
                  대표 취소
                </button>
              </div>
            ))}
        </div>
      </section>

      {/* 2. 전체 상품 */}
      <section style={styles.box}>
        <h2>전체 상품</h2>

        <div style={styles.grid}>
          {products
            .filter((p) => !featured.includes(p.images?.[0]))
            .map((p) => (
              <div key={p.id} style={styles.card}>
                <img src={p.images?.[0]} style={styles.image} />
                <h3>{p.name}</h3>
                <p>{p.category.toUpperCase()}</p>

                <button
                  onClick={() => setAsFeatured(p.images?.[0])}
                  style={styles.featureBtn}
                >
                  대표 설정
                </button>

                <button
                  onClick={() => deleteProduct(p.images?.[0])}
                  style={styles.deleteBtn}
                >
                  삭제
                </button>
              </div>
            ))}
        </div>
      </section>
    </main>
  );
}

const styles = {
  box: {
    marginBottom: "50px",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    backgroundColor: "#fafafa",
  },
  grid: {
    marginTop: "20px",
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
  },
  card: {
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    textAlign: "center",
    width: "200px",
  },
  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "6px",
  },
  featureBtn: {
    marginTop: "10px",
    padding: "8px 12px",
    backgroundColor: "green",
    color: "#fff",
    borderRadius: "6px",
    cursor: "pointer",
  },
  unfeatureBtn: {
    marginTop: "10px",
    padding: "8px 12px",
    backgroundColor: "gray",
    color: "#fff",
    borderRadius: "6px",
    cursor: "pointer",
  },
  deleteBtn: {
    marginTop: "10px",
    padding: "8px 12px",
    backgroundColor: "red",
    color: "#fff",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
