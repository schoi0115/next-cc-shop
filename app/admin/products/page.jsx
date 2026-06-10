"use client";

import { useEffect, useState } from "react";

export default function AdminProductsPage() {
  const [allImages, setAllImages] = useState([]);
  const [featured, setFeatured] = useState([]);

  const loadAllImages = async () => {
    const res = await fetch("/api/products/list");
    const data = await res.json();
    setAllImages(data.files);
  };

  const loadFeatured = async () => {
    const res = await fetch("/featured.json");
    const data = await res.json();
    setFeatured(data);
  };

  const setAsFeatured = async (filename) => {
    await fetch("/api/home/feature", {
      method: "POST",
      body: JSON.stringify({ filename }),
    });
    loadFeatured();
  };

  const removeFeatured = async (filename) => {
    await fetch("/api/home/unfeature", {
      method: "POST",
      body: JSON.stringify({ filename }),
    });
    loadFeatured();
  };

  const deleteImage = async (filename) => {
    await fetch("/api/products/delete", {
      method: "POST",
      body: JSON.stringify({ filename }),
    });

    loadAllImages();
    loadFeatured();
  };

  useEffect(() => {
    loadAllImages();
    loadFeatured();
  }, []);

  return (
    <main style={{ padding: "40px" }}>
      <h1>상품 관리</h1>

      {/* 1번 박스: 대표 상품 */}
      <section style={styles.box}>
        <h2>대표 상품</h2>

        <div style={styles.grid}>
          {featured.length === 0 && <p>대표 상품이 없습니다.</p>}

          {featured.map((img) => (
            <div key={img} style={styles.card}>
              <img src={`/images/${img}`} style={styles.image} />

              <button
                onClick={() => removeFeatured(img)}
                style={styles.unfeatureBtn}
              >
                대표 취소
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 2번 박스: 전체 상품 */}
      <section style={styles.box}>
        <h2>전체 상품</h2>

        <div style={styles.grid}>
          {allImages
            .filter((img) => !featured.includes(img)) // ⭐ 대표 상품 제외
            .map((img) => (
              <div key={img} style={styles.card}>
                <img src={`/images/${img}`} style={styles.image} />

                <button
                  onClick={() => setAsFeatured(img)}
                  style={styles.featureBtn}
                >
                  대표 설정
                </button>

                <button
                  onClick={() => deleteImage(img)}
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
