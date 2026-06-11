"use client";

import { useEffect, useState } from "react";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]); // 전체 상품 객체
  const [featured, setFeatured] = useState([]); // 대표 상품 이미지 경로 배열

  // 전체 상품 로드
  const loadProducts = async () => {
    const res = await fetch("/api/products/list");
    const data = await res.json();
    setProducts(data); // 상품 객체 배열
  };

  // 대표 상품 로드
  const loadFeatured = async () => {
    const res = await fetch("/featured.json");
    const data = await res.json();
    setFeatured(data || []);
  };

  // 대표 설정
  const setAsFeatured = async (image) => {
    await fetch("/api/home/feature", {
      method: "POST",
      body: JSON.stringify({ filename: image }),
    });
    loadFeatured();
  };

  // 대표 취소
  const removeFeatured = async (image) => {
    await fetch("/api/home/unfeature", {
      method: "POST",
      body: JSON.stringify({ filename: image }),
    });
    loadFeatured();
  };

  // 상품 삭제
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
            .filter((p) => featured.includes(p.image))
            .map((p) => (
              <div key={p.id} style={styles.card}>
                <img src={p.image} style={styles.image} />
                <h3>{p.name}</h3>
                <p>{p.category.toUpperCase()}</p>

                <button
                  onClick={() => removeFeatured(p.image)}
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
            .filter((p) => !featured.includes(p.image)) // 대표 제외
            .map((p) => (
              <div key={p.id} style={styles.card}>
                <img src={p.image} style={styles.image} />
                <h3>{p.name}</h3>
                <p>{p.category.toUpperCase()}</p>

                <button
                  onClick={() => setAsFeatured(p.image)}
                  style={styles.featureBtn}
                >
                  대표 설정
                </button>

                <button
                  onClick={() => deleteProduct(p.image)}
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
