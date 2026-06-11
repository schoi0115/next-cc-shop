"use client";

import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [category, setCategory] = useState("men");
  const [name, setName] = useState(""); // 상품 이름

  const upload = async () => {
    if (!file || !name) {
      alert("상품 이름과 이미지를 입력하세요");
      return;
    }

    const form = new FormData();
    form.append("file", file);
    form.append("category", category);
    form.append("name", name);

    const res = await fetch("/api/products/upload", {
      method: "POST",
      body: form,
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <main style={{ padding: "40px" }}>
      <h1>상품 업로드</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "400px" }}>
        <input
          type="text"
          placeholder="상품 이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: "10px", border: "1px solid #ccc" }}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            setFile(e.target.files[0]);
            setPreview(URL.createObjectURL(e.target.files[0]));
          }}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="men">Men</option>
          <option value="women">Women</option>
        </select>

        {preview && <img src={preview} style={{ width: "300px", borderRadius: "8px" }} />}

        <button onClick={upload} style={{ padding: "12px", background: "#333", color: "#fff" }}>
          업로드
        </button>
      </div>
    </main>
  );
}
