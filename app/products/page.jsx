"use client";

import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [images, setImages] = useState([]);

  const loadImages = async () => {
    const res = await fetch("/api/products/list");
    const data = await res.json();
    setImages(data.files);
  };

  useEffect(() => {
    loadImages();
  }, []);

  return (
    <main style={{ padding: "40px" }}>
      <h1>상품 목록</h1>

      <div style={styles.grid}>
        {images.length === 0 && <p>등록된 상품이 없습니다.</p>}

        {images.map((img) => (
          <div key={img} style={styles.card}>
            <img
              src={`/images/${img}`}
              alt={img}
              style={styles.image}
            />
            <p style={styles.title}>{img}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

const styles = {
  grid: {
    marginTop: "30px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
  },
  card: {
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    textAlign: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: "250px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  title: {
    marginTop: "10px",
    fontSize: "16px",
    fontWeight: "bold",
  },
};
